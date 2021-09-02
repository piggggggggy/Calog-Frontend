import React, {useState} from 'react';
import styled from 'styled-components';
import theme from '../shared/theme';
import { useSelector } from 'react-redux';
import { history } from '../redux/configStore';

// elements & components
import Card from './Main_Card';
import { Text, Image } from '../elements';

// img
import addFoodImage from '../img/addFoodImg.png';

/** 
 * @param {*} props
 * @returns 즐겨찾기 리스트
 * @역할 즐겨찾기 리스트
 * @담당자 : 박용태
*/

const FavoList = (props) => {

  // 로그인 체크
  const is_login = useSelector((state) => state.user.is_login);

  // MainBody에서 props로 받아옴
  const favo_list = props.favo_list;
  const [moreFavo, setFavo] = useState(false);

  // 즐겨찾기 덩보기, 더보기
  const changeFavo = () => {
    if (moreFavo) {
      setFavo(false);
    } else {
      setFavo(true);
    }
  };

  // 유저 직접 추가 칼로리
  const userAddFood = useSelector((state) => state.food.addFood)

  // 직접등록 추가
  const addFoodCustom = () => {
    if (is_login) {
      history.push('/addFood');
    } else {
      if(window.confirm("로그인을 하시면 이용하실 수 있어요. 바로 로그인하시겠어요?")) {
        history.push('/signsocial');
      }
    }
  }

  return (
    <React.Fragment>

      {/* use1) 즐겨찾기 목록 */}
      {!props.title ? (
        <React.Fragment>
          {favo_list.length !== 0 ?
          <CardContainer>

            {/* 카드리스트 */}
            {!moreFavo ? favo_list.slice(0,4).map((favo, idx) => {     
              return <Card key={favo.foodId} {...favo}/>              
            })
            : favo_list.map((favo, idx) => {
                return <Card key={favo.foodId} {...favo}/>
            })}

            {/* 버튼 */}
            {favo_list?.length > 4 ? 
            <MoreBtn onClick={changeFavo}>
              <Text size="13px" m_size="13px" padding="0" margin="0" cursor="pointer">{moreFavo ? "덜보기" : "더보기"}</Text>
            </MoreBtn> : ''}
          </CardContainer>
          : ''}
        </React.Fragment>
      ) : (

        // use2) 유저가 직접 기록한 칼로리
        <CardContainer>   

          {/* case1) 기록이 있을 때 */}
          {userAddFood?.length !== 0 ? (

            <React.Fragment>
              {userAddFood?.map((food, idx) => {
                return <Card key={food._id} title={"useAdd"} foodId={food._id} {...food}/>
              })}
            </React.Fragment>
          ) : (
            <Image src={addFoodImage} width="85%" height="15vh" margin="2% auto 0 auto" _onClick={addFoodCustom} cursor="pointer"/>
          )}
        </CardContainer>
      )}
    </React.Fragment>
  );
};

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  column-gap: 1.8vh;
`;

const MoreBtn = styled.div`
  width: 100%;
  height: 4vh;
  padding: 1.1vh 6%;
  background: rgba(196, 196, 196, 0.19);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const AddFoodBtn = styled.div`
  width: 54%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1.5px solid #F5CC3F;
  border-radius: 44px;
  padding-top: 1.3vh;
  padding-bottom: 1.3vh;
  cursor: pointer;
  margin-top: 2%;

  & > div {
    font-size: 16px;
    line-height: 22px;
    font-weight: bold;
    color: #E6BB2A;

    @media ${theme.device.mobileM} {
      font-size: 14px;
    }
  }
`;

export default FavoList;