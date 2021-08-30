import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

// elements & components
import { Text, Button } from '../elements';

// icons
import { BsFillPlusSquareFill } from 'react-icons/bs';

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
                    {custom_list.length>0?
                        custom_list.map((custom, idx) => {
                            // console.log(custom.foodList);

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
                                        lineheight="20px" m_lineheight="20px"
                                        size="15px" m_size="15px" 
                                        margin="0" padding="0"
                                        overflow="hidden" ws="nowrap" to
                                        >
                                            {custom.name}
                                        </Text>
                                        <CartBox onClick={addCartCustom}>
                                            <BsFillPlusSquareFill  color="#F19F13" size="24px"/>
                                        </CartBox>
                                    </TitleBox>
                                    
                                    <ListBox>
                                    {custom.foodList.map((food, idx) => {
                                        // console.log(food.name);
                                        return (
                                            <List>{food.name}</List>
                                        )
                                    })}
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
    width: 42%;
    height: 18vh;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.12);
    border-radius: 16px;
    padding: 1.7vh 4.5%;

`;
const PostContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    column-gap: 3.8%;
    row-gap: 1.7vh;
    margin: auto;
    /* margin-left: 1.6vw; */
    /* margin-top: 1vw; */
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
    overflow-y: hidden;
`;
const List = styled.div`
    width: 100%;
    font-size: 13px;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;