import React, { useEffect } from 'react';

// css
import {Grid, Text, Image, Button} from '../elements';
import theme from '../shared/theme';

// components
import BtnHeader from '../shared/BtnHeader';
import Cart_Card from '../components/Cart_Card';

// redux
import {history} from '../redux/configStore';
import { useSelector, useDispatch } from 'react-redux';
import {forEdit} from '../redux/modules/food';
import {delRecordDB, editRecordDB} from '../redux/modules/record';


/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 이 컴포넌트를 사용할 때 필수 props
 * @담당자 김나영
*/

const CalendarDateEdit = (props) => {
  const dispatch = useDispatch()

  const url = history.location.pathname.split('/')
  const data_type = url[4]
  const recordId = url[3]
  const date = url[2]

  // 타입에 맞는 식단 리스트
  const foodRecords = useSelector((state) => state.record.record.foodRecords)
  const foodList = []
  for(let i=0; i<foodRecords?.length; i++) {
    foodRecords[i].type === data_type && foodList.push(foodRecords[i]);
  }

  useEffect(() => {
    dispatch(forEdit(foodList))
  }, [])

  // 수정을 위한 식단 리스트
  const typeFoodList = useSelector((state) => state.food.typeFood)

  // 식단 리스트의 전체 칼로리
  let typeCalories = 0
  for(let i=0; i<typeFoodList?.length; i++) {
    const amount = typeFoodList[i].amount
    const kcal = typeFoodList[i].kcal
    typeCalories += amount*kcal
  };

  // 수정하기 버튼 > 식단을 모두 지운 경우 전체 삭제로 이어짐
  const editBtn = () => {
    if(typeFoodList?.length === 0) {
      const result = window.confirm(`식단이 삭제되면 ${data_type}에 대한 기록이 모두 사라져요! 삭제하시겠습니까?`)
      result ? dispatch(delRecordDB(recordId, date, data_type)) : history.push(`/loading/calendar/${date}`)
    } else {
      dispatch(editRecordDB(recordId, date, typeFoodList, data_type, typeCalories))
    }
  }

  return (
    <React.Fragment>

      {/* 헤더 */}
      <BtnHeader title={`${data_type} 식단 수정`} display="none"/>

      <Grid margin="5% 0 0 8%" m_margin="5% 0 0 8%">
        <Text size="20px" bold m_size="15px">{data_type} 식단</Text>
      </Grid>

      {/* 식단 */}
      <Grid padding="5% 0 0 0">
        {typeFoodList?.map((f, idx) => {
          return <Cart_Card key={f.foodId} where={"edit"} {...f}/>
        })}
      </Grid>

      {/* 수정하기 버튼 */}
      <Button bg={theme.color.light} width="93%" height="7.5vh" border_radius="44px" margin="19% auto 0 auto" _onClick={editBtn}>
        <Text size="16px" bold m_size="14px">수정하기</Text>
      </Button>
    </React.Fragment>
  );
}

export default CalendarDateEdit;