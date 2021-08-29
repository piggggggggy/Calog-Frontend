import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Text, Button } from '../elements';
import { BsFillPlusSquareFill } from 'react-icons/bs';
import { GetCustomList } from '../redux/modules/DietCustom';

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
                        custom_list.map((i, idx) => {
                            console.log(i.foodList);
                            return (
                                <Post key={idx}>
                                    <TitleBox>
                                        <Text bold width="75%"size="15px" margin="auto 0 auto 11%">{i.name}</Text>
                                        <CartBox>
                                            <BsFillPlusSquareFill  color="#F19F13" size="24px"/>
                                        </CartBox>
                                    </TitleBox>
                                    
                                    {i.foodList.length>0?
                                    i.foodList.map((i, idx) => {
                                        console.log(i.name);
                                        return (
                                            <ListBox key={idx}>
                                                <List>{i.name}</List>
                                            </ListBox>
                                        )
                                    })
                                    :
                                    <></>
                                    }
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
    width: 43%;
    height: 30vh;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.12);
    border-radius: 16px;
    margin: 3%;
`;
const PostContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    margin-left: 1.6vw;
    margin-top: 1vw;
`;

const CartBox = styled.div`
  cursor: pointer;

`;

const TitleBox = styled.div`
    display: flex;
    padding: 5% 10% 1% 0%;
`;
const ListBox = styled.div`
    display: flex;
    flex-direction: column;
`;
const List = styled.div`
    margin: 1% auto 3% 10%;
    font-size: 13px;
`;