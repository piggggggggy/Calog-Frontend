import React from 'react';
import styled from 'styled-components';
import theme from '../shared/theme';

// 날짜
import moment from 'moment';

// 데이터
import {useSelector} from 'react-redux';

// 컴포넌트
import Calendar_DayEmoji from './Calendar_DayEmoji';

/** 
 * @param {object} d
 * @returns {object} d props로 넘어온 날짜와 데이터에 기록된 날짜를 비교하여 맞는 데이터의 리스트
 * @역할  캘린더 기초대사량에 따른 이모지 컴포넌트
 * @필수값  day._d
 * @담당자  김나영
*/

const Calendar_Emoji = (props) => {

  // props 받는 날짜(전체)
  const _date = props.day._d;

  // 기준 : 오늘 날짜(일)
  const today = moment().format('YYYYMMDD');

  // 비교 1 : props받는 날짜
  const date = moment(_date).format('YYYYMMDD');

  // 비교 2 : 데이터
  const data = useSelector((state) => state.record.calendar);
  const format = moment(_date).format('YYYY-MM-DD');
  const match = data.find((d) => d.date === format);
  console.log({data:data, format:format, match:match})

  // 입력값이 없을 때
  // case 1) 당일 기준 이 전
  if(date < today) {
    return (
      <React.Fragment>
        {match?.totalCalories > 0 ?

          // case 1-1) 기록이 있을 때
          <Calendar_DayEmoji item={match} day={date}/> :

          // case 1-2) 기록이 없을 때
          <Emoji>
            <Svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="22" cy="22" r="22" fill="#E4E4E4"/>
              <path d="M18.8368 18.8727C19.3682 18.3374 19.6667 17.6114 19.6667 16.8544C19.6667 16.0973 19.3682 15.3713 18.8368 14.836C18.3054 14.3007 17.5848 14 16.8333 14C16.0819 14 15.3612 14.3007 14.8299 14.836C14.2985 15.3713 14 16.0973 14 16.8544C14 17.6114 14.2985 18.3374 14.8299 18.8727C15.3612 19.408 16.0819 19.7087 16.8333 19.7087C17.5848 19.7087 18.3054 19.408 18.8368 18.8727Z" fill="#C5C5C5"/>
              <path d="M30.1701 18.8727C29.6388 19.408 28.9181 19.7087 28.1667 19.7087C27.4152 19.7087 26.6945 19.408 26.1632 18.8727C25.6318 18.3374 25.3333 17.6114 25.3333 16.8544C25.3333 16.0973 25.6318 15.3713 26.1632 14.836C26.6945 14.3007 27.4152 14 28.1667 14C28.9181 14 29.6388 14.3007 30.1701 14.836C30.7015 15.3713 31 16.0973 31 16.8544C31 17.6114 30.7015 18.3374 30.1701 18.8727Z" fill="#C5C5C5"/>
              <rect x="14" y="26.1943" width="17" height="3.80581" rx="1.90291" fill="#C5C5C5"/>
            </Svg>
          </Emoji>
        }
      </React.Fragment>
    )
  };

  // case 2) 당일
  if(date === today) {
    return(
      <React.Fragment>
        {match?.totalCalories > 0 ?

          // case 2-1) 기록이 있을 때
          <Calendar_DayEmoji item={match} day={date}/> :

          // case 2-2) 기록이 없을 때
          <DefaultEmoji />
        }
      </React.Fragment>
    )
  };

  // 입력값이 없을 때
  // case 3) 당일 기준 이 후
  return (
    <React.Fragment>
      <DefaultEmoji />
    </React.Fragment>
  );
};

const DefaultEmoji = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: ${theme.color.gray_2};
  margin: 20% auto 0 auto;

  @media ${theme.device.mobileMini} {
    width: 35px;
    height: 35px;
    margin: 10% auto 0 auto;
  };

  @media only screen and (max-width: 300px) {
    width: 30px;
    height: 30px;
  };
`;

const Emoji = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  margin: 20% auto 0 auto;

  @media ${theme.device.mobileMini} {
    width: 35px;
    height: 35px;
    margin: 10% auto 0 auto;
  };

  @media only screen and (max-width: 300px) {
    width: 30px;
    height: 30px;
  };
`;

const Svg = styled.svg`
  width: 44px;
  height: 44px;

  @media ${theme.device.mobileMini} {
    width: 35px;
    height: 35px;
  };

  @media only screen and (max-width: 300px) {
    width: 30px;
    height: 30px;
  };
`;

export default Calendar_Emoji;