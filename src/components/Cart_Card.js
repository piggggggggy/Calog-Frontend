import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

// elements & components
import { Grid, Text } from '../elements';

// icons
import { IoIosArrowDropleft,IoIosArrowDropright } from 'react-icons/io';
import { TiDeleteOutline } from 'react-icons/ti';

// modules
import { setUpAmount, setDownAmount, deleteCartRx } from '../redux/modules/cart';
import { forDel, editUpAmount, editDownAmount } from '../redux/modules/food';
import { history } from '../redux/configStore';

// theme
import theme from '../shared/theme'

/** 
 * @param {*} props
 * @returns 푸드카드
 * @역할 검색결과, 즐겨찾기에 사용되는 푸드 카드
 * @담당자 : 박용태
*/

const Card = (props) => {

  const dispatch = useDispatch();

  // 식단 편집에서 넘어옴 체크
  const editChk = history.location.pathname.includes('calendarEdit')
  
  // 갯수 카운팅하기!
  const [count, setCount] = useState(props.amount);
  const upCount = () => {
    if (count >= 0.5){
      setCount(count + 0.5);
      !editChk ? dispatch(setUpAmount(props.foodId)) : dispatch(editUpAmount(props.foodId));
    } else {
      setCount(Number((count + 0.1).toFixed(1)));
      !editChk ?  dispatch(setUpAmount(props.foodId)) : dispatch(editUpAmount(props.foodId));
    }

  };

  const downCount = () => {
    if(count > 0.5){
      setCount(count - 0.5);
      !editChk ?  dispatch(setDownAmount(props.foodId)) : dispatch(editDownAmount(props.foodId));
    } else if (count > 0.1) {
      setCount(Number((count - 0.1).toFixed(1)));
      !editChk ?  dispatch(setDownAmount(props.foodId)) : dispatch(editDownAmount(props.foodId));
    }
  };

  // 삭제 애니메이션
  const [del, setDel] = useState(false);
  const openDelete = () => {
    setDel(true);
  };

  const closeDelete = () => {
    if (del) {
      setDel(false);
    }
  }

  // 식단 편집에서 넘어온 경우 리스트에서 삭제
  const deleteCart = () => {
    !editChk? dispatch(deleteCartRx(props.foodId)) : dispatch(forDel(props.foodId))
  }

  // 브랜드명 분리
  const NameNBrand = props.name.indexOf('[') === 0 ? props.name.split(':') : false;
  const brand = props.name.indexOf('[') === 0 ? NameNBrand[0] : '';
  const name = props.name.indexOf('[') === 0 ? NameNBrand[1] : props.name;

  return (
    <React.Fragment>

      <CardContainer onClick={closeDelete}>
        <FoodCard
          style={{ transform: `translate( ${del ? '-28%' : '0'}, 0)` }}
          >
          
          <Grid>
            {/* 이름 */}
            <NameBox>{brand}</NameBox>
            <NameBox>{name}</NameBox>
          
            {/* kcal */}
            <Text lineheight="28px" m_lineheight="25px" size="22px" m_size="20px" bold color="#2A2A2A" margin="0.9vh 0 0 0" padding="0">
              {Math.round(props.kcal * 10)/10} kcal
              <ForOne> / {props.forOne + props.measurement}</ForOne>
            </Text>

          </Grid>
          
          {/* 카운트 */}
          <CountBox>
            <div onClick={downCount}><IoIosArrowDropleft color="gray" size="18px"/></div>
            <Text lineheight="28px" m_lineheight="25px" size="22px" m_size="20px" bold color="#000000" margin="0" padding="0">{count}</Text>
            <div onClick={upCount}><IoIosArrowDropright color="gray" size="18px"/></div>
          </CountBox>

          {/* 삭제버튼 */}
          <DeleteBtn onClick={!editChk ? openDelete : deleteCart}>
            <TiDeleteOutline size="21px" color="#BABABA"/>
          </DeleteBtn>

        </FoodCard>

        {/* 식단 편집에서 넘어오는 경우 삭제 슬라이더 없앰 */}
        {!editChk && (
          <DeleteBar 
            style={del? {opacity: "1"} : {opacity: "0"}}
            onClick={deleteCart}
            >
            <div>
              <svg width="2.2vh" height="2.2vh" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.3337 2.54675L17.4537 0.666748L10.0003 8.12008L2.54699 0.666748L0.666992 2.54675L8.12033 10.0001L0.666992 17.4534L2.54699 19.3334L10.0003 11.8801L17.4537 19.3334L19.3337 17.4534L11.8803 10.0001L19.3337 2.54675Z" fill="#5F5F5F"/>
              </svg>  
            </div>
          </DeleteBar>
        )}
      </CardContainer>
      
    </React.Fragment>
  );
}

Card.defaultProps = {

}

const CardContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 2vh;
`;

const DeleteBar = styled.div`
  position: absolute;
  right: 0;
  top: calc(36px - 0.65vh);
  width: 27.3%;
  border: none;
  height: 6.6vh;
  border-top-left-radius: 44px;
  border-bottom-left-radius: 44px;
  background: #FFE899;
  display: flex;
  align-items: center;
  opacity: 0;
  transition: 1s ease;
  z-index: 3;
  cursor: pointer;

  @media ${theme.device.mobileM} {
    top: calc(32.5px - 0.65vh);
  }

  & > div {
    position: relative;
    left: 21%;
    width: 27%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const FoodCard = styled.div`
  position: relative;
  max-width: 88%;
  min-width: 88%;
  margin: auto;
  top: 0px;
  display: grid;
  grid-template-columns: 60% 32%;
  gap: 8%;
  padding: 2.2vh 4.8% 2.2vh 10.8%;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.12);
  transition: 1s ease;
  z-index: 5;
`;

const NameBox = styled.div`
  line-height: 20px;
  font-size: 15px; 
  margin: 0; 
  padding: 0;
  vertical-align: bottom;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-family: 'Pretendard';

  @media ${theme.device.mobileM} {
    line-height: 18px; 
    font-size: 13px; 
  }
`;

const ForOne = styled.span`
  font-size: 15px;
  font-weight: bold;
  color: #939393;

`;

const CountBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;  

  & > div {
    margin: 0;
    padding: 0;
    cursor: pointer;
  }
`;

const DeleteBtn = styled.div`
  position: absolute;
  left: 0.9vh;
  top: 0.9vh;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export default Card;