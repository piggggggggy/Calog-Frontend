import React, { useState } from 'react';
import styled from 'styled-components';
import { Text, Button } from '../elements';
import { BsFillPlusSquareFill } from 'react-icons/bs';


const Main_Nav = () => {

    return (
        <React.Fragment>
            {/* 나의 식단 커스텀 */}
                <PostContainer >
                <Post>
                    <TitleBox>
                        <Text width="75%"size="15px" margin="auto 0 auto 11%">Title</Text>
                        <CartBox>
                            <BsFillPlusSquareFill  color="#F19F13" size="24px"/>
                        </CartBox>
                    </TitleBox>
                    <ListBox>
                        <List>[굽네치킨]볼케이노</List>
                        <List>목록2</List>
                        <List>목록3</List>
                        <List>목록4</List>
                        <List>목록5</List>
                        <List>목록6</List>
                        <List>목록7</List>
                    </ListBox>
                </Post>
                <Post>
                    <TitleBox>
                        <Text width="75%"size="15px" margin="auto 0 auto 11%">Title</Text>
                        <CartBox>
                            <BsFillPlusSquareFill  color="#F19F13" size="24px"/>
                        </CartBox>
                    </TitleBox>
                    <ListBox>
                        <List>[굽네치킨]볼케이노</List>
                        <List>목록2</List>
                        <List>목록3</List>
                        <List>목록4</List>
                        <List>목록5</List>
                        <List>목록6</List>
                        <List>목록7</List>
                    </ListBox>
                </Post>
                <Post>
                    <TitleBox>
                        <Text width="75%"size="15px" margin="auto 0 auto 11%">Title</Text>
                        <CartBox>
                            <BsFillPlusSquareFill  color="#F19F13" size="24px"/>
                        </CartBox>
                    </TitleBox>
                    <ListBox>
                        <List>[굽네치킨]볼케이노</List>
                        <List>목록2</List>
                        <List>목록3</List>
                        <List>목록4</List>
                        <List>목록5</List>
                        <List>목록6</List>
                        <List>목록7</List>
                    </ListBox>
                </Post>

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