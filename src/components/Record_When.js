import React, {useState} from 'react';
import {Grid, Text} from '../elements';
import styled from 'styled-components';
//이모지
import { FaCircle } from "react-icons/fa";

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 : record에서 기록할 칼로리의 시점 컴포넌트
 * @필수값 : 카트에서 체크한 칼로리의 시점
 * @담당자 : 김나영
*/

const Record_When = (props) => {
// dispatch
// useEffect

//아침
const [bkShow, setBkShow] = useState(false)
const [bkDisplay, setBkDisplay] = useState('none')
const breakfast = () => {
  setBkShow(true)
  setLcShow(false)
  setDnShow(false)
  setBkDisplay('block')
  setLcDisplay('none')
  setDnDisplay('none')
}
//점심
const [lcShow, setLcShow] = useState(false)
const [lcDisplay, setLcDisplay] = useState('none')
const lunch = () => {
  setBkShow(false)
  setLcShow(true)
  setDnShow(false) 
  setBkDisplay('none')
  setLcDisplay('block')
  setDnDisplay('none')
}
//저녁
const [dnShow, setDnShow] = useState(false)
const [dnDisplay, setDnDisplay] = useState('none')
const dinner = () => {
  setBkShow(false)
  setLcShow(false)
  setDnShow(true)
  setBkDisplay('none')
  setLcDisplay('none')
  setDnDisplay('block')
}

  return (
    <React.Fragment>
      <Grid display="flex" padding="0 49px">
        {/* 아침 */}
        <Grid _onClick={breakfast} width="45px" margin="0 32px 0 0">
          <Text size="20px" bold={bkShow}>아침</Text>
          <Dot>
            <Grid display={bkDisplay}>
              <FaCircle size="7px"/>
            </Grid>
          </Dot>
        </Grid>
        {/* 점심 */}
        <Grid _onClick={lunch} width="45px" margin="0 32px 0 0">
          <Text size="20px" bold={lcShow}>점심</Text>
          <Dot>
            <Grid display={lcDisplay}>
              <FaCircle size="7px"/>
            </Grid>
          </Dot>
        </Grid>
        {/* 저녁 */}
        <Grid _onClick={dinner} width="45px" margin="0 32px 0 0">
          <Text size="20px" bold={dnShow}>저녁</Text>
          <Dot>
            <Grid display={dnDisplay}>
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