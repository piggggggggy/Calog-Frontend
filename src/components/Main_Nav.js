import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import theme from '../shared/theme';

// elements & components
import { Text, Button } from '../elements';

// icons
import { BsFillPlusSquareFill } from 'react-icons/bs';
import { IoTrashBinSharp } from 'react-icons/io5';


// modules
import { GetCustomList } from '../redux/modules/DietCustom';
import { addCartCustomRx } from '../redux/modules/cart';

const Main_Nav = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
  dispatch(GetCustomList());
  },[]);

  const custom_list = useSelector((state)=>state.custom.custom);

  return (
    <React.Fragment>
			{/* 나의 식단 커스텀 */}
			<PostContainer >
      {custom_list.length>0? custom_list.map((custom, idx) => {
        const addCartCustom = () => {
          const data = custom.foodList;
          dispatch(addCartCustomRx(data));
        };

      return (
        <Post key={idx}>
          <TitleBox>
            <Text 
              bold 
              width="100%" 
							size="15px" m_size="15px" 
							lineheight="20px" m_lineheight="20px"
							overflow="hidden" ws="nowrap" to
							margin="0" padding="0"
							>
								{custom.name}
            </Text>
            <CartBox onClick={addCartCustom}>
                <IoTrashBinSharp  color="#F19F13" size="24px"/>
            </CartBox>
          </TitleBox>
                                    
          <ListBox>
            {custom.foodList.map((food, idx) => {
                // console.log(food.name);
                if (custom.foodList.length <= 3){
                    return <List key={idx}>{food.name}</List>
                } else {
                    if (idx < 3) {
                        return <List key={idx}>{food.name}</List>
                    }
                }
            })}
          {custom.foodList.length <= 3 ? <></> : <List> . . . . .</List> }
          </ListBox>

        </Post>
      );
      })

    :
    <></>
	}


    </PostContainer>
  </React.Fragment>
    )
}

export default Main_Nav;

const Post = styled.div`
    width: 47.5%;
    height: 18vh;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.12);
    border-radius: 16px;
    padding: 1.7vh 4.5%;

    @media ${theme.device.mobileHH} {
        max-height: 168px;
    }
`;
const PostContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    padding: 0 6%;
    max-height: 40vh;
    padding-bottom: 10vh;
    column-gap: 5%;
    row-gap: 1.7vh;
    margin: auto;
    overflow: scroll;

    &::-webkit-scrollbar {
      display: none;
    }

    @media only screen and (max-height: 720px) {
        max-height: 35vh;
    } 
    @media only screen and (max-height: 600px) {
        max-height: 30vh;
    } 
`;

const CartBox = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;

`;

const TitleBox = styled.div`
    position: relative;
    height: 2.7vh;
    margin-bottom: 1.3vh;
`;
const ListBox = styled.div`
    height: 10.6vh;
    display: flex;
    flex-direction: column;
    column-gap: 0.6vh;
    overflow: scroll;

    &::-webkit-scrollbar {
    display: none;
    }
`;
const List = styled.div`
    width: 100%;
    font-size: 13px;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;