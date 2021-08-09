import React, {useState} from 'react';
import {Grid, Text} from '../elements';
import styled from 'styled-components';
import theme from '../shared/theme';

// 이모지
import { FaCircle } from "react-icons/fa";

// type chk
import {useSelector} from 'react-redux';

/** 
 * @param {String} type
 * @returns {String} type 유저가 끼니를 기록할 시점
 * @역할 : record에서 기록할 칼로리의 시점 컴포넌트
 * @필수값 : 기록할 칼로리의 시점
 * @담당자 : 김나영
*/

const Record_When = (props) => {
  
  // type chk
  const typeState = useSelector((state) => state.cart.type);

  // type에 따른 css변경
  const [type, setType] = useState(typeState);

  // 버튼 클릭에 따른 타입 설정
  const selectType = (type) => {
    if(type === "morning") {
      setType("아침")
    }else if (type === "lunch") {
      setType("점심") 
    }else if (type === "dinner") {
      setType("저녁")
    }else if (type === "snack") {
      setType("간식")
    }else if (type === "midnightSnack") {
      setType("야식")
    };
  };

  return (
    <React.Fragment>
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
            <Grid display={type === "점심" ? 'block' : 'none'} >
              <FaCircle size="7px" color="#F19F13"/>
            </Grid>
          </Dot>
        </When>

        {/* 저녁 */}
        <When onClick={()=> {selectType('dinner')}} >
          <Text size="17px" bold color={type === "저녁" ? 'black' : '#c4c4c4'}  m_size="15px" >저녁</Text>
          <Dot>
            <Grid display={type === "저녁" ? 'block' : 'none'} >
              <FaCircle size="7px" color="#F19F13"/>
            </Grid>
          </Dot>
        </When>

        {/* 간식 */}
        <When onClick={()=> {selectType('snack')}} >
          <Text size="17px" bold color={type === "간식" ? 'black' : '#c4c4c4'} m_size="15px">간식</Text>
          <Dot>
            <Grid display={type === "간식" ? 'block' : 'none'} >
              <FaCircle size="7px" color="#F19F13"/>
            </Grid>
          </Dot>
        </When>

        {/* 야식 */}
        <When onClick={()=> {selectType('midnightSnack')}}>
          <Text size="17px" bold color={type === "야식" ? 'black' : '#c4c4c4'} m_size="15px">야식</Text>
          <Dot>
            <Grid display={type === "야식" ? 'block' : 'none'} >
              <FaCircle size="7px" color="#F19F13"/>
            </Grid>
          </Dot>
        </When>
      </Wrap>
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
  margin: 0 20px 0 0;

  @media ${theme.device.mobileM} {
    width: 13%;
  }
`;

export default Record_When;