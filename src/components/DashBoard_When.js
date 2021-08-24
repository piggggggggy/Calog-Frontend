import React, {useState} from 'react';
import {Grid, Text} from '../elements';
import styled from 'styled-components';
import theme from '../shared/theme';

// 이모지
import { FaCircle } from "react-icons/fa";

// type chk
import {useDispatch, useSelector} from 'react-redux';
import {typeChk, ttlKcal} from '../redux/modules/record';

// history
import { history } from '../redux/configStore';

/** 
 * @param {object} r
 * @returns {object} r 유저가 기록한 foodRecords의 리스트를 반환
 * @역할  dashboard에서 기록할 칼로리의 시점 컴포넌트
 * @담당자  김나영
*/

const DashBoard_When = (props) => {
  const dispatch = useDispatch();

  // 대시보드와 캘린더 상세에서 들어오는 props값이 달라서 구분
  const foodRecords = history.location.pathname.includes('dashboard') ? props[0] : props?.foodRecords;
  const data_type = useSelector((state) => state.record.type)

  // 대시보드와 캘린더 상세 페이지로 나눠서 각 경우에 맞게 사용
  let btn_type = "";

  // 대시보드
  if(history.location.pathname.includes('dashboard')) {

    // foodRecords && (

      // 처음 로그인하고 들어왔을 때는 스토어에 type이 지정되어있지 않음(아직 버튼을 안눌렀기 때문)
      data_type === null ? btn_type = "" : btn_type = data_type
    // )

    // 캘린더 상세
  } else {
    btn_type = "아침"
  };

  // type에 따른 css변경
  const [type, setType] = useState(btn_type);

  // 기록 리스트(각 타입에 맞는 리스트와 총 칼로리 합계)
  // 아침
  const morning_list = foodRecords?.filter((r) => r.type === "아침");
  let morning_kcal = 0;
  if(morning_list?.length !== 0) {
    for(let idx=0; idx<morning_list?.length; idx++) {
      let kcal = morning_list[idx].resultKcal
      morning_kcal += kcal
    }
  };

  // 점심
  const lunch_list = foodRecords?.filter((r) => r.type === "점심");
  let lunch_kcal = 0;
  if(lunch_list?.length !== 0) {
    for(let idx=0; idx<lunch_list?.length; idx++) {
      let kcal = lunch_list[idx].resultKcal
      lunch_kcal += kcal
    }
  };

  // 저녁
  const dinner_list = foodRecords?.filter((r) => r.type === "저녁");
  let dinner_kcal = 0;
  if(dinner_list?.length !== 0) {
    for(let idx=0; idx<dinner_list?.length; idx++) {
      let kcal = dinner_list[idx].resultKcal
      dinner_kcal += kcal
    }
  };

  // 간식
  const snack_list = foodRecords?.filter((r) => r.type === "간식");
  let snack_kcal = 0;
  if(snack_list?.length !== 0) {
    for(let idx=0; idx<snack_list?.length; idx++) {
      let kcal = snack_list[idx].resultKcal
      snack_kcal += kcal
    }
  };

  // 야식
  const night_list = foodRecords?.filter((r) => r.type === "야식");
  let night_kcal = 0;
  if(night_list?.length !== 0) {
    for(let idx=0; idx<night_list?.length; idx++) {
      let kcal = night_list[idx].resultKcal
      night_kcal += kcal
    }
  };

  // 선택된 type에 따라 css변경, 타입과 총 칼로리 리덕스 저장
  const selectType = (type) => {
    if(type === "morning") {
      setType("아침")
      dispatch(typeChk("아침"))
      dispatch(ttlKcal(morning_kcal))
    }else if (type === "lunch") {
      setType("점심") 
      dispatch(typeChk("점심"))
      dispatch(ttlKcal(lunch_kcal))
    }else if (type === "dinner") {
      setType("저녁")
      dispatch(typeChk("저녁"))
      dispatch(ttlKcal(dinner_kcal))
    }else if (type === "snack") {
      setType("간식")
      dispatch(typeChk("간식"))
      dispatch(ttlKcal(snack_kcal))
    }else if (type === "midnightSnack") {
      setType("야식")
      dispatch(typeChk("야식"))
      dispatch(ttlKcal(night_kcal))
    };
  };

  return (
    <React.Fragment>

      {/* 기록된 리스트가 있을 경우에만 버튼 클릭 활성화 */}
      {foodRecords?.length > 0 ? (
        <Wrap>

          {/* 아침 */}
          <When onClick={()=> {selectType('morning')}}>
            <Text size="17px" bold color={type === "아침" ? 'black' : '#c4c4c4'} m_size="15px">아침</Text>
            <Dot>
              <Grid display={type === "아침" ? 'block' : 'none'}>
                <FaCircle size="7px" color="#F19F13"/>
              </Grid>
            </Dot>
          </When>

          {/* 점심 */}
          <When onClick={()=> {selectType('lunch')}}>
            <Text size="17px" bold color={type === "점심" ? 'black' : '#c4c4c4'} m_size="15px">점심</Text>
            <Dot>
              <Grid display={type === "점심" ? 'block' : 'none'}>
                <FaCircle size="7px" color="#F19F13"/>
              </Grid>
            </Dot>
          </When>

          {/* 저녁 */}
          <When onClick={()=> {selectType('dinner')}} >
            <Text size="17px" bold color={type === "저녁" ? 'black' : '#c4c4c4'} m_size="15px">저녁</Text>
            <Dot>
              <Grid display={type === "저녁" ? 'block' : 'none'}>
                <FaCircle size="7px" color="#F19F13"/>
              </Grid>
            </Dot>
          </When>

          {/* 간식 */}
          <When onClick={()=> {selectType('snack')}} >
            <Text size="17px" bold color={type === "간식" ? 'black' : '#c4c4c4'} m_size="15px">간식</Text>
            <Dot>
              <Grid display={type === "간식" ? 'block' : 'none'}>
                <FaCircle size="7px" color="#F19F13"/>
              </Grid>
            </Dot>
          </When>

          {/* 야식 */}
          <When onClick={()=> {selectType('midnightSnack')}}>
            <Text size="17px" bold color={type === "야식" ? 'black' : '#c4c4c4'} m_size="15px">야식</Text>
            <Dot>
              <Grid display={type === "야식" ? 'block' : 'none'}>
                <FaCircle size="7px" color="#F19F13"/>
              </Grid>
            </Dot>
          </When>
        </Wrap>
      ) : (

        // 기록이 없을 경우에는 버튼 클릭 비활성화
        <Wrap>

          {/* 아침 */}
          <When>
            <Text size="17px" bold color={'#c4c4c4'} m_size="15px">아침</Text>
          </When>

          {/* 점심 */}
          <When>
            <Text size="17px" bold color={'#c4c4c4'} m_size="15px">점심</Text>
          </When>

          {/* 저녁 */}
          <When>
            <Text size="17px" bold color={'#c4c4c4'} m_size="15px">저녁</Text>
          </When>

          {/* 간식 */}
          <When>
            <Text size="17px" bold color={'#c4c4c4'} m_size="15px">간식</Text>
          </When>

          {/* 야식 */}
          <When>
            <Text size="17px" bold color={'#c4c4c4'} m_size="15px">야식</Text>
          </When>
        </Wrap>
      )}
    </React.Fragment>
  );
};

const Wrap =styled.div`
  display: flex;
  padding: 0 7.7%;

  @media ${theme.device.mobileM} {
    padding: 0 8%;
  }
`;

const Dot = styled.div`
  position: relative;
  float: right;
  margin-top: -70%;
`;

const When = styled.div`
  width: 11%;
  margin: 0 5.7% 0 0;

  @media ${theme.device.mobileM} {
    width: 13%;
  }

  @media ${theme.device.mobileF} {
    width: 15%;
  }
`;

export default DashBoard_When;