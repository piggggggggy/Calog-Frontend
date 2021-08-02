import React, {useEffect} from 'react';
import {Grid, Text} from '../elements';
import styled from 'styled-components';
import theme from '../shared/theme';
//date picker
import { enGB } from 'date-fns/locale'
import { DatePicker } from 'react-nice-dates'
import '../styles/css/nice_date.css'
//moment
import moment from 'moment'
//icon
import { BiCaretDown } from "react-icons/bi";
//날짜 보내기
import {useDispatch, useSelector} from 'react-redux';
import {addDate} from '../redux/modules/cart'

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 : 현재 기록하려는 칼로리를 언제 섭취했는지 날짜를 선택할 수 있는 컴포넌트
 * @필수값 : 오늘 날짜(변경 가능)
 * @담당자 : 김나영
*/

const Record_Date = (props) => {
  const dispatch = useDispatch()

  //날짜
  const _SelectDate = useSelector((state) => state.cart.date)
  const dateFormat = moment(_SelectDate).format('M월 DD일')
  const [date, setDate] = React.useState(dateFormat)

  const Change = (date) => {
    setDate(moment(date).format('M월 DD일'))
    //백엔드 날짜 data post
    const chgDateFormat = moment(date).format('YYYY-MM-DD')
    dispatch(addDate(chgDateFormat))
  }

  return (
    <Grid padding="9px 20px 31px 20px">
      
      {/* 실제 DatePicker */}
      <DatePicker onDateChange={Change} locale={enGB} format=' '>
        {({ inputProps, focused }) => (
          <React.Fragment>
          <Grid display="flex">
            {/* datePicker 실제로 보이는 부분 */}
            <Text width="90px" margin="0 8px 0 29px" size="22px" bold>{date}</Text>
            <BiCaretDown size="16px" color={theme.color.gray_4}/>
            {/* datePicker 안보이게 숨김 처리 */}
            <Input
            className={'input' + (focused ? ' -focused' : '')}
            {...inputProps}
            />
          </Grid>
          </React.Fragment>
        )}
      </DatePicker>
    </Grid>
  )
}

Record_Date.defaultProps = {

}

const Input = styled.input`
  border: none;
  position: absolute;
  background-color: transparent;
`;



export default Record_Date;