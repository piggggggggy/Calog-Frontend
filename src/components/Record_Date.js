import React from 'react';
import {Grid, Text} from '../elements';
import styled from 'styled-components';

// date picker
import { enGB } from 'date-fns/locale';
import { DatePicker } from 'react-nice-dates';
import '../styles/css/nice_date.css';

// moment
import moment from 'moment';

// 날짜 보내기
import {useDispatch, useSelector} from 'react-redux';
import {addDate} from '../redux/modules/cart';

/** 
 * @param {String} date
 * @returns {String} date 날짜
 * @역할  현재 기록하려는 칼로리를 언제 섭취했는지 날짜를 선택할 수 있는 컴포넌트
 * @필수값  오늘 날짜(변경 가능)
 * @담당자  김나영
*/

const Record_Date = (props) => {
  const dispatch = useDispatch();

  // 날짜
  const _SelectDate = useSelector((state) => state.cart.date);
  const Date = moment(_SelectDate).format('M월 D일');
  const [date, setDate] = React.useState(Date);
  
  // 날짜를 변경했을 경우 onChange
  const Change = (date) => {
    setDate(moment(date).format('M월 D일'))

    // 백엔드 날짜로 data형식 맞추어 전송
    const chgDateFormat = moment(date).format('YYYY-MM-DD')
    dispatch(addDate(chgDateFormat))
  };

  return (
    <Grid padding="9px 20px 7% 12px">
      
      {/* 실제 DatePicker */}
      <DatePicker onDateChange={Change} locale={enGB} format=' '>
        {({ inputProps, focused }) => (
          <React.Fragment>
          <Grid display="flex">

            {/* datePicker 실제로 보이는 부분 */}
            <Text width="24%" margin="0 8px 0 29px" size="22px" bold>{date}</Text>
            <svg width="17" height="9" viewBox="0 0 17 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M7.37245 8.712L0.291018 1.704C-0.097006 1.296 -0.097006 0.672 0.291018 0.288C0.679042 -0.096 1.30958 -0.096 1.72186 0.288L8.1 6.6L14.4781 0.288001C14.8662 -0.0959994 15.521 -0.0959993 15.909 0.288001C16.297 0.672001 16.297 1.296 15.909 1.704L8.80329 8.712C8.41527 9.096 7.78473 9.096 7.37245 8.712Z" fill="black"/>
            </svg>

            {/* datePicker 안보이게 숨김 처리 */}
            <Input
            readOnly
            className={'input' + (focused ? ' -focused' : '')}
            {...inputProps}
            />
          </Grid>
          </React.Fragment>
        )}
      </DatePicker>
    </Grid>
  )
};

const Input = styled.input`
  border: none;
  position: absolute;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  caret-color: white;
  color: white;
`;

export default Record_Date;