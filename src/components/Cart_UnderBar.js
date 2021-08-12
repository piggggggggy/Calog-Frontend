import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../redux/configStore';
import theme from '../shared/theme';
// modules
import { deleteCartRx, addCartRx, cartOut } from '../redux/modules/cart';
// elements & components
import { Grid, Text } from '../elements';
// icons
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { TiDeleteOutline } from 'react-icons/ti';
import { BiPlusCircle } from 'react-icons/bi';


/** 
 * @param {*} props
 * @returns 장바구니 내역 및 버튼
 * @역할 장바구니를 보여주는 언더바
 * @담당자 : 박용태
*/

const UnderBar = (props) => {

  const dispatch = useDispatch();
  const recentDeleted_list = useSelector((state) => state.cart.cart);
  const [barOnOff, barSet] = useState(false);
  const type = props.type;
  const is_login = useSelector((state) => state.user.is_login);
  const recentDeleted_list2 = useSelector((state) => state.user);
  console.log(recentDeleted_list2);

  // 열고 닫는 
  const toggleCart = () => {
    if (barOnOff === false) {
      barSet(true);
    }else{
      barSet(false);
    }
  };

  // 장바구니 담기!
  const addCart = (data) => {
    dispatch(addCartRx(data));
  };
  

  // 기록하기
  const write = () => {
    if(is_login) {
      dispatch(cartOut(type));
      history.push('/record');
    } else {
      let result = window.confirm('로그인이 필요해요! 로그인 페이지로 이동할까요?')
      result ? history.push('/signsocial') : history.goBack('/');
    }
  };


  if ( recentDeleted_list.length === 0 ) {
    return <></>;
  }
  return (
    <React.Fragment>
      <RecentDeletedContainer 
      style={{ transform: `translate(0, ${barOnOff ? '0%' : 'calc(100% - 13vh)'})` }}
        >

          {/* 언더바 버튼 */}
          <Grid _onClick={toggleCart} display="flex" jc="center" align-items="center" height="2.3vh" width="20px" margin="1.2vh auto" m_margin="1.2vh auto" cursor>
            {barOnOff ? 
            <IoIosArrowDown size="20px" color="#757575"/>
            : <IoIosArrowUp size="20px" color="#757575"/> }
          </Grid>
          
          
          {/* 최근 삭제 목록 */}
          <Grid padding="0 7% 3% 7%;">
            <Text size="15px" bold padding="0" margin="0">최근 삭제 목록</Text>
          </Grid>
          
          <Grid padding="0 5% 3% 5%" display="flex" fw="wrap">
            {recentDeleted_list.map((recentDeleted, idx) => {
              const data = {
                foodId: recentDeleted.foodId,
                name: recentDeleted.name,
                forOne: recentDeleted.forOne,
                grams: recentDeleted.grams,
                kcal: recentDeleted.kcal,
                amount: 1,
              };
              return (
                <RecentDeletedButton 
                  key={idx}
                  onClick={()=>{addCart(data)}}
                >
                  <div>
                    <BiPlusCircle size="17px" color="#404040"/>
                  </div>
                  <RecentDeletedText>
                    {recentDeleted.name}
                  </RecentDeletedText>
                </RecentDeletedButton>
              )
            })}
          </Grid>
          
          {/* 기록하러가기 버튼 */}
          <RecordBox>
            <div onClick={()=>{write()}}>
              <Text size="17px" m_size="15px" bold padding="0" margin="0">기록하러가기</Text>
            </div>
          </RecordBox>

        </RecentDeletedContainer>
    </React.Fragment>
  );
}

UnderBar.defaultProps = {

}

const RecentDeletedContainer = styled.div`
  max-width: 420px;
  width: 100%;
  min-height: 12.5%;
  position: fixed;
  bottom: 9%;
  border: none;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  box-shadow: 0px -5px 22px -8px rgba(0, 0, 0, 0.14);
  background: #fff;
  z-index: 300;
  transition: 1s ease;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const RecordBox = styled.div`
  width: 100%;
  padding: 3.8vh 20px 2.8vh 20px;

  & > div {
    width: 100%;
    height: 6.25vh;
    background: #FFE899;
    border: none;
    border-radius: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }
`;

const RecentDeletedButton = styled.div`
  height: 4vh;
  padding: 5px 1.9% 5px 2.8%;
  background: #E4E4E4;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 1%;
  cursor: pointer;
`;

const RecentDeletedText = styled.div`
  line-height: 18px;
  font-size: 13px;
  color: #2A2A2A;
  margin-left: 6px;


  @media ${theme.device.mobileS} {
    margin-left: 3px;
  }
`;

export default UnderBar;