import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import theme from '../shared/theme';

// elements & components
import { Text, Button } from '../elements';

// icons
import { BsFillPlusSquareFill } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';

// modules
import { GetCustomList } from '../redux/modules/DietCustom';
import { addCartCustomRx } from '../redux/modules/cart';
import { DeleteCustomDB } from '../redux/modules/DietCustom';

// toast message
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Main_Nav = () => {
    const dispatch = useDispatch();

    // 커스텀 리스트 불러오기
    useEffect(()=>{
    dispatch(GetCustomList());
    },[]);

    const custom_list = useSelector((state)=>state.custom.custom);


    // 브랜드명 분리

    
    return (
        <React.Fragment>
            <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            />
            {/* 나의 식단 커스텀 */}
                <PostContainer >
                    {custom_list.length>0?
                        custom_list.map((custom, idx) => {
                            console.log(custom)

                            const addCartCustom = () => {
                                const data = custom.foodList;
                                dispatch(addCartCustomRx(data));
                                toast('음식담기에 추가되었어요!', {
                                    position: "top-center",
                                    autoClose: 1000,
                                    hideProgressBar: true,
                                    closeOnClick: false,
                                    pauseOnHover: false,
                                    draggable: true,
                                    progress: undefined,
                                    });
                            };

                            const deleteCustom = (e) => {
                                if (window.confirm(`${custom.name} 식단을 삭제하시겠어요?`)) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    const mealId = custom.mealId;
                                    dispatch(DeleteCustomDB(mealId))
                                }
                            };
                        

                            return (
                                <Post key={idx} onClick={addCartCustom}>
                                    <TitleBox>
                                        <Text 
                                        bold 
                                        width="100%" 
                                        lineheight="20px" m_lineheight="20px"
                                        size="15px" m_size="15px" 
                                        margin="0" padding="0"
                                        overflow="hidden" ws="nowrap" to
                                        // color="#F19F13"
                                        >
                                            {custom.name}
                                        </Text>
                                        <CartBox onClick={deleteCustom}>
                                            <FaTrashAlt  color="#BABABA" size="20px"/>
                                        </CartBox>
                                    </TitleBox>
                                    
                                    <ListBox>
                                    {custom.foodList.map((food, idx) => {
                                        const NameNBrand = food.name.indexOf('[') === 0 ? food.name.split(':') : false;
                                        const name = food.name.indexOf('[') === 0 ? NameNBrand[1] : food.name;
                                        // console.log(food.name);
                                        if (custom.foodList.length <= 3){
                                            return <List key={idx}>{name}</List>
                                        } else {
                                            if (idx < 3) {
                                                return <List key={idx}>{name}</List>
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
    cursor: pointer;

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
    cursor: pointer;
`;

const ListBox = styled.div`
    height: 10.6vh;
    display: flex;
    flex-direction: column;
    column-gap: 0.6vh;
    overflow: scroll;
    cursor: pointer;


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