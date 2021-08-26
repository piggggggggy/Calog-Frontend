import React from 'react';
import styled, {keyframes} from 'styled-components';
import { useSelector } from 'react-redux';

// elements & components
import { Grid, Text } from '../elements';

/** 
 * @param {*} props
 * @returns 칼로리 1자그래프
 * @역할 기초대상에 대한 음식의 칼로리를 보기 쉽게 보여주는 컴포넌트
 * @필수값 해당음식의 kcal
 * @담당자 : 박용태
*/

const CalorieBar = (props) => {

  // props 음식칼로리, 내 전체칼로리 기록, 기초대사량
  const kcal = props.kcal;
  const totalKcal = props.totalKcal;
  const bmr = props.bmr;
  console.log(bmr);
  
  // 로그인 유무
  const is_login = useSelector((state) => state.user.is_login);

  // 현재 음식의 칼로리바 애니메이션
  const slide = keyframes`
    0% {
      width: 0%;
    }
    100% {
      width: ${bmr === 0 ? bmr/1500 : totalKcal + kcal < bmr ? (kcal/bmr) * 100 : (100 - ((totalKcal/bmr) * 100))}%;
    }
  `;

  // 함수 내 변수를 사용하기 위해 함수안에서 styled-components 선언
  const FoodData = styled.div`
    position: relative;
    top: ${is_login ? "-10px" : "0"};
    height: 10px;
    background: #F19F13;
    border: none;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    ${totalKcal === 0 || !is_login ?
    'border-top-left-radius: 4px; border-bottom-left-radius: 4px;' 
    : ''}
    z-index: 10;
    transition: 1s ease;
    left: ${bmr !== 0 ? `${(totalKcal/bmr) * 100}%` : "0"};
    background: ${totalKcal + kcal < bmr ? "#6993FF" : "#EC6262"};
    /* width: ${totalKcal + kcal < bmr ? (kcal/bmr) * 100 : (100 - ((totalKcal/bmr) * 100))}%; */
    width: ${bmr === 0 ? kcal/2000 : totalKcal + kcal < bmr ? (kcal/bmr) * 100 : (100 - ((totalKcal/bmr) * 100))}%;
    animation: ${slide} 1s 1 ease;

    
    & > div {
      position: relative;
      /* left: ${(totalKcal + kcal/bmr) * 100}%; */
      top: -7vh;
      z-index: 5;
      opacity: 0;
      padding: 5px 5%;
      min-width: 100px;
      margin: auto;
      border: none;
      border-radius: 6px;
      background: #fff;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
    }


    &:hover > div {
      opacity: 1
    }
  `;

  return (
    <React.Fragment>
      <Grid is_flex margin="2.6vh 0 0 0" m_margin="2.6vh 0 0 0" padding="0 6.5%">
        {bmr !==0 ? <Text lineheight="18px" m_lineheight="18px" size="13px" m_size="13px" margin="0">현재 {totalKcal} kcal</Text> 
        : <Text lineheight="18px" m_lineheight="18px" size="13px" m_size="13px" margin="0">{kcal} kcal</Text>}
        
        {is_login ? 
        <Text lineheight="18px" m_lineheight="18px" size="13px" m_size="13px" margin="0">{totalKcal + kcal < bmr ? "남은 양":""}</Text> 
        : ''}
        
      </Grid>
      <BackgroundBar>
        {bmr === 0 ?
        <CurrentData style={{display: "none"}}/> 
        :
        <CurrentData style={totalKcal <= bmr ? {width: `${(totalKcal/bmr) * 100}%`} : {width: "100%", backgroundColor: "#EC6262"}} /> 
        }
        <FoodData>
          <div>
            <Text size="15px" m_size="15px" bold>{kcal} kcal</Text>
          </div>
        </FoodData>
      </BackgroundBar>
    </React.Fragment>
  );
};

// CalorieBar.defaultProps = {
//   kcal: 335,
// };

const BackgroundBar = styled.div`
  position: relative;
  width: 87%;
  margin: 4px auto 0 auto;
  height: 10px;
  background: #E4E4E4;
  border: none;
  border-radius: 4px;
  z-index: 5;
`;

const CurrentData = styled.div`
  position: relative;
  left: 0;
  top: 0;
  height: 10px;
  background: #F19F13;
  border: none;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  z-index: 10;

`;

export default CalorieBar;