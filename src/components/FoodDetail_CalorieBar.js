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

  const _record = useSelector((state) => state.record.record);
  const record = _record === undefined ? [] : _record;
  const kcal = props.kcal;


  const bmr = record.length === 0 ? 2000 : record[0]?.bmr;
  const record_list = record.length === 0 ? false : record[0]?.foodRecord;
  const currentRec = () => {
    if (record_list) {
      let today_kcal = 0;
      for(let idx = 0; idx<record_list?.length; idx++) {
        let kcal = record_list[idx].resultKcal;
        today_kcal += kcal
      };
      return today_kcal;
    } else {
      return 0;
    }
  };

  const slide = keyframes`
    0% {
      width: 0%;
    }
    100% {
      width: ${currentRec() + kcal < bmr ? (kcal/bmr) * 100 : (100 - ((currentRec()/bmr) * 100))}%;
    }
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

  const FoodData = styled.div`
    position: relative;
    top: -10px;
    height: 10px;
    background: #F19F13;
    border: none;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    ${currentRec() === 0 ?
    'border-top-left-radius: 4px; border-bottom-left-radius: 4px;' 
    : ''}
    z-index: 10;
    transition: 1s ease;
    left: ${(currentRec()/bmr) * 100}%;
    background: ${currentRec() + kcal < bmr ? "#6993FF" : "#EC6262"};
    width: ${currentRec() + kcal < bmr ? (kcal/bmr) * 100 : (100 - ((currentRec()/bmr) * 100))}%;
    animation: ${slide} 1s 1 ease;
  `;

  return (
    <React.Fragment>
      <Grid is_flex margin="2.6vh 0 0 0" m_margin="2.6vh 0 0 0" padding="0 6.5%">
        <Text lineheight="18px" m_lineheight="18px" size="13px" m_size="13px" margin="0">현재 {currentRec()} kcal</Text>
        <Text lineheight="18px" m_lineheight="18px" size="13px" m_size="13px" margin="0">{kcal} kcal</Text>
        <Text lineheight="18px" m_lineheight="18px" size="13px" m_size="13px" margin="0">{currentRec() + kcal < bmr ? "남은 양":""}</Text>
      </Grid>
      <BackgroundBar>
        <CurrentData style={currentRec() <= bmr ? {width: `${(currentRec()/bmr) * 100}%`} : {width: "100%", backgroundColor: "#EC6262"}} />
        <FoodData/>
      </BackgroundBar>
    </React.Fragment>
  );
};

CalorieBar.defaultProps = {
  kcal: 335,
};

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


export default CalorieBar;