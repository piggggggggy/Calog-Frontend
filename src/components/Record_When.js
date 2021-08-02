import React, {useState} from 'react';
import {Grid, Text} from '../elements';
import styled from 'styled-components';
//이모지
import { FaCircle } from "react-icons/fa";
//type chk
import { useSelector } from 'react-redux';

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 : record에서 기록할 칼로리의 시점 컴포넌트
 * @필수값 : 카트에서 체크한 칼로리의 시점
 * @담당자 : 김나영
*/

const Record_When = (props) => {
  
  //type chk
  const typeState = useSelector((state) => state.cart.type)

  //type에 따른 css변경
  const [type, setType] = useState(typeState);

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
  }

  return (
    <React.Fragment>
      <Grid display="flex" padding="0 49px">
        {/* 아침 */}
        <Grid
          _onClick={()=> {selectType('morning')}}
          width="45px" margin="0 20px 0 0">
          <Text size="17px" bold={type === "아침" && true}>아침</Text>
          <Dot>
            <Grid display={type === "아침" ? 'block' : 'none'}>
              <FaCircle size="7px"/>
            </Grid>
          </Dot>
        </Grid>
        {/* 점심 */}
        <Grid
          _onClick={()=> {selectType('lunch')}}
          width="45px" margin="0 20px 0 0">
          <Text size="17px" bold={type === "점심" && true}>점심</Text>
          <Dot>
            <Grid display={type === "점심" ? 'block' : 'none'}>
              <FaCircle size="7px"/>
            </Grid>
          </Dot>
        </Grid>
        {/* 저녁 */}
        <Grid
          _onClick={()=> {selectType('dinner')}}
          width="45px" margin="0 20px 0 0">
          <Text size="17px" bold={type === "저녁" && true}>저녁</Text>
          <Dot>
            <Grid display={type === "저녁" ? 'block' : 'none'}>
              <FaCircle size="7px"/>
            </Grid>
          </Dot>
        </Grid>
        {/* 간식 */}
        <Grid
          _onClick={()=> {selectType('snack')}}
          width="45px" margin="0 20px 0 0">
          <Text size="17px" bold={type === "간식" && true}>간식</Text>
          <Dot>
            <Grid display={type === "간식" ? 'block' : 'none'}>
              <FaCircle size="7px"/>
            </Grid>
          </Dot>
        </Grid>
        {/* 야식 */}
        <Grid
          _onClick={()=> {selectType('midnightSnack')}}
          width="45px" margin="0 20px 0 0">
          <Text size="17px" bold={type === "야식" && true}>야식</Text>
          <Dot>
            <Grid display={type === "야식" ? 'block' : 'none'}>
              <FaCircle size="7px"/>
            </Grid>
          </Dot>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const Dot = styled.div`
  position: relative;
  float: right;
  margin-top: -70%;
`;

export default Record_When;