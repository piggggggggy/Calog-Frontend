import React, {useEffect} from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
// elements & components
import BtnHeader from '../shared/BtnHeader';
import { Grid, Text } from '../elements';
import UnderBar from '../components/Main_UnderBar';
// icons
import { BsFillPlusSquareFill } from 'react-icons/bs';
// modules
import { addCartRx } from '../redux/modules/cart';
import { getDetailDB } from '../redux/modules/search';
/** 
 * @param {*} props
 * @returns 기본정보, 영양정보, 칼로리 비교
 * @역할  음식 상세정보를 표시
 * @필수값 푸드Id에 해당하는 상세 푸드 데이터
 * @담당자 : 박용태
*/

const FoodDetail = (props) => {
// dispatch
  const dispatch = useDispatch();
// props
  const foodInfo = useSelector((state) => state.search.detail);
  const foodId = props.match.params.foodId;

// 대사량과 나의 칼로리 기록
  const record = useSelector((state) => state.record.record);
  const bmr = record.length === 0 ? 0 : record[0]?.bmr;
  const foodRecord = record.length === 0 ? [] : record[0]?.foodRecords;
  console.log(record)

// useEffect
  useEffect(() => {
    dispatch(getDetailDB(foodId))
  }, []);

  if (foodId !== foodInfo.foodId) {
    return <></>;
  };

  // 장바구니 담기!
  const addCart = () => {
    const cartUnit = {
      foodId: foodInfo.foodId,
      name: foodInfo.name,
      forOne: foodInfo.forOne,
      grams: foodInfo.grams,
      kcal: foodInfo.kcal,
      amount: 1,
    };
    dispatch(addCartRx(cartUnit));
  };

  // 현재 남은(초과한) 칼로리 계산
  const totalKcal = () => {
    let result = 0
    if(foodRecord.length !== 0) {
      foodRecord.map((f, idx) => {
        result += parseInt(f.amount) * f.resultKcal;
      });
      return result;
    } else {
      return 0;
    }
  };

  const is_over = () => {
    if (bmr === totalKcal()) {
      return "line";
    } else if (bmr > totalKcal()) {
      return "under";
    } else if (bmr < totalKcal()) {
      return "over";
    }
  };

  
  return (
    <React.Fragment>
      {/* 헤더 */}
      <BtnHeader title="칼로리 상세"/>

      <BodyContainer>
        
        {/* 기본정보 */}
        <Grid padding= "1.7vh 7.6% 0 7.6%">
          <Grid>
            <Grid display="flex">
              <Text lineheight="22px" bold size="17px" m_size="15px" color="#5F5F5F" margin="0 10px 0 0" paddig="0">{foodInfo.name}</Text>
              <span style={{fontSize: "13px", color: "#404040"}}>1인분 ({foodInfo.forOne}g)</span>
            </Grid>  
            <Text lineheight="41px" bold size="34px" m_size="28px" color="#2A2A2A" margin="0.6% 0" paddig="0">{foodInfo.kcal} kcal</Text>
          </Grid>
          {/* 칼로리 비교정보 */}
          <Grid margin="1vh 0" m_margin="1vh 0">
            <Text lineheight="22px" m_lineheight="20px" size="15px" m_size="13px" bold color="#EC6262" padding="0" margin="0">
              {is_over() === "line" ? 
              "현재까지 오늘의 기준치를 모두 채웠어요!" 
              : is_over() === "over" ? 
              `현재까지 기준치 ${totalKcal()-bmr} kcal 초과했어요!` 
              : `아직 기준치까지 ${bmr-totalKcal()} kcal 남았어요!`}
            </Text>
          </Grid>
        </Grid>

        {/* 카트 버튼 */}
        <Grid margin="1.7vh 0" m_margin="1.7vh 0" padding= "0 7.6%">
          <div><BsFillPlusSquareFill onClick={addCart} style={{cursor: "pointer"}} color="#F19F13" size="34px"/></div>
        </Grid>

        {/* 영양성분 */}
        <Grid padding= "0 7.6%">
          <Text lineheight="22px" bold size="17px" m_size="15px" color="#5F5F5F" margin="0" padding="0">영양성분</Text>
        </Grid>
        
        <Grid is_flex margin="2vh 0 6.25vh 0" m_margin="2vh 0 6.25vh 0" padding= "0 6%">
          <IngredientCircle>
            <Text lineheight="18px" bold size="13px" m_size="13px" color="#404040" padding="0" margin="0">탄수화물</Text>
            <Text lineheight="28px" bold size="22px" m_size="20px" color="#000000" padding="0" margin="0">63g</Text>
          </IngredientCircle>
          <IngredientCircle>
            <Text lineheight="18px" bold size="13px" m_size="13px" color="#404040" padding="0" margin="0">단백질</Text>
            <Text lineheight="28px" bold size="22px" m_size="20px" color="#000000" padding="0" margin="0">6g</Text>
          </IngredientCircle>
          <IngredientCircle>
            <Text lineheight="18px" bold size="13px" m_size="13px" color="#404040" padding="0" margin="0">지방</Text>
            <Text lineheight="28px" bold size="22px" m_size="20px" color="#000000" padding="0" margin="0">8g</Text>
          </IngredientCircle>
        </Grid>

        <Grid>
          <Grid is_flex padding="0.9vh 9%">
            <Text lineheight="18px" bold size="13px" m_size="13px" color="#404040" padding="0" margin="0">탄수화물</Text>
            <Text lineheight="18px" bold size="13px" m_size="13px" color="#404040" padding="0" margin="0">63g</Text>
          </Grid>
          <Line style={{border: "1px solid #F19F13"}}/>
          <Grid is_flex padding="0.9vh 9% 0.9vh 10.5%">
            <Text lineheight="18px" size="13px" m_size="13px" color="#5F5F5F" padding="0" margin="0">식이섬유</Text>
            <Text lineheight="18px" size="13px" m_size="13px" color="#5F5F5F" padding="0" margin="0">4g</Text>
          </Grid>
          <Line style={{border: "1px solid #FFE899"}}/>          
          <Grid is_flex padding="0.9vh 9% 0.9vh 10.5%">
            <Text lineheight="18px" size="13px" m_size="13px" color="#5F5F5F" padding="0" margin="0">당</Text>
            <Text lineheight="18px" size="13px" m_size="13px" color="#5F5F5F" padding="0" margin="0">7g</Text>
          </Grid>
          <Line style={{border: "1px solid #FFE899"}}/>          
          <Grid is_flex padding="0.9vh 9%">
            <Text lineheight="18px" bold size="13px" m_size="13px" color="#404040" padding="0" margin="0">단백질</Text>
            <Text lineheight="18px" bold size="13px" m_size="13px" color="#404040" padding="0" margin="0">459g</Text>
          </Grid>
          <Line style={{border: "1px solid #F19F13"}}/>          
          <Grid is_flex padding="0.9vh 9% 0.9vh 10.5%">
            <Text lineheight="18px" size="13px" m_size="13px" color="#5F5F5F" padding="0" margin="0">나트륨</Text>
            <Text lineheight="18px" size="13px" m_size="13px" color="#5F5F5F" padding="0" margin="0">549g</Text>
          </Grid>
          <Line style={{border: "1px solid #FFE899"}}/>          
          <Grid is_flex padding="0.9vh 9% 0.9vh 10.5%">
            <Text lineheight="18px" size="13px" m_size="13px" color="#5F5F5F" padding="0" margin="0">칼륨</Text>
            <Text lineheight="18px" size="13px" m_size="13px" color="#5F5F5F" padding="0" margin="0"></Text>
          </Grid>
          <Line style={{border: "1px solid #FFE899"}}/>          
          <Grid is_flex padding="0.9vh 9%">
            <Text lineheight="18px" bold size="13px" m_size="13px" color="#404040" padding="0" margin="0">지방</Text>
            <Text lineheight="18px" bold size="13px" m_size="13px" color="#404040" padding="0" margin="0">459mg</Text>
          </Grid>
          <Line style={{border: "1px solid #F19F13"}}/>          
        </Grid>

        {/* 카트 탭 */}
        <UnderBar/>

      </BodyContainer>
    </React.Fragment>
  );
}

FoodDetail.defaultProps = {

}

const BodyContainer = styled.div`
  max-width: 420px;
  max-height: 80vh;
  padding-bottom: 10vh;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const IngredientCircle = styled.div`
  width: 12vh;
  height: 12vh;
  border: 3px solid #F19F13;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Line = styled.div`
  width: 87%;
  height: 1px;
  padding: 0;
  margin: auto; 
`;

export default FoodDetail;