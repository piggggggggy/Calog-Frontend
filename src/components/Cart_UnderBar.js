import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../redux/configStore';
import theme from '../shared/theme';

// modules
import { addCartRx, cartOut } from '../redux/modules/cart';
import { removeDeleted } from '../redux/modules/user';

// elements & components
import { Grid, Text } from '../elements';

// icons
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { BiPlusCircle } from 'react-icons/bi';


/** 
 * @param {*} props
 * @returns 장바구니 내역 및 버튼
 * @역할 장바구니를 보여주는 언더바
 * @담당자 : 박용태
*/

const UnderBar = (props) => {

  const dispatch = useDispatch();
  
  // props 기록으로 보내주기 위해!
  const type = props.type;

  // 로그인체크
  const is_login = useSelector((state) => state.user.is_login);





  // 최근 삭제목록 
  const _recentDeleted_list = props.recentDeleted_list;
  
  const recentDeleted_list = _recentDeleted_list.length === 0 ? [] : _recentDeleted_list[0];
  // const recentDeleted_list = []




  // 열고 닫는 
  const [barOnOff, barSet] = useState(false);

  const toggleCart = () => {
    if (barOnOff === false) {
      barSet(true);
    }else{
      barSet(false);
    }
  };

  // 장바구니 담기 & 장바구니에서 삭제
  const addCart = (data) => {
    dispatch(addCartRx(data));
    dispatch(removeDeleted({...data, list: recentDeleted_list}));
  };
  
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
          <RecentDeleteText>
            <Text size="15px" bold padding="0" margin="0">최근 삭제 목록</Text>
          </RecentDeleteText>
          
          <Grid padding="0 5% 3% 5%" display="flex" fw="wrap">
            {recentDeleted_list.map((recentDeleted, idx) => {
              // 브랜드명 분리
              const NameNBrand = recentDeleted.name.indexOf('[') === 0 ? recentDeleted.name.split(':') : false;
              // const brand = cart.name.indexOf('[') === 0 ? NameNBrand[0] : '';
              const name = recentDeleted.name.indexOf('[') === 0 ? NameNBrand[1] : recentDeleted.name;

              const data = {
                foodId: recentDeleted.foodId,
                name: recentDeleted.name,
                kcal: Math.round(recentDeleted.kcal * 10)/10,
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
                    {name}
                  </RecentDeletedText>
                </RecentDeletedButton>
              )
            })}
          </Grid>
          
          {/* 기록하러가기 버튼 */}
          {/* <RecordBox>
            <div onClick={()=>{write()}}>
              <Text size="17px" m_size="15px" bold padding="0" margin="0">기록하러가기</Text>
            </div>
          </RecordBox> */}

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
  z-index: 70;
  transition: 1s ease;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

`;

const RecentDeleteText = styled.div`
  width: 100%;
  padding: 0 7% 3% 7%;

  @media only screen and (max-height: 700px) {
    padding: 0 7% 1% 7%;
  }

  @media only screen and (max-height: 600px) {
    padding: 0 7%;
  }
`;

const RecentDeletedButton = styled.div`
  height: 4vh;
  padding: calc((4vh - 17px)/2) 2.8% calc((4vh - 17px)/2) 1.9%;
  background: #E4E4E4;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 1%;
  cursor: pointer;

  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const RecentDeletedText = styled.div`
  line-height: 18px;
  font-size: 13px;
  color: #2A2A2A;
  margin-left: 6px;

  @media only screen and (max-height: 750px) {
    line-height: 15px;
  }

  @media ${theme.device.mobileS} {
    margin-left: 3px;
  }
`;

export default UnderBar;