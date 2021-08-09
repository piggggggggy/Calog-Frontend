import React from 'react';
import styled, { keyframes } from 'styled-components';

/** 
 * @param {*} props
 * @returns 똔똔똔
 * @역할 스피너 역할
 * @필수값 
 * @담당자 : 박용태
*/

const Loading = (props) => {
// dispatch
// props
// useEffect

  return (
    <React.Fragment>
      <SpinnerContainer>
        <SpinnerCircle1/>
        <SpinnerCircle2/>
        <SpinnerCircle3/>
        <SpinnerCircle4/>
      </SpinnerContainer>
    </React.Fragment>
  );
}

Loading.defaultProps = {

}

const SpinnerContainer = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap:30px;
`;

const ddonddon = keyframes`
0% {
  width: 20px;
  height: 20px;
  background: #FFE899;
}
25% {
  width: 30px;
  height: 30px;
  background: #F19F13;
}
50% {
  width: 20px;
  height: 20px;
  background: #FFE899;
}
75% {
  width: 20px;
  height: 20px;
  background: #FFE899;
}
100% {
  width: 20px;
  height: 20px;
  background: #FFE899;
}
`;


const SpinnerCircle1 = styled.div`
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 50%;
  background: #FFE899;
  animation: ${ddonddon} 2s 1s infinite ease;
`;

const SpinnerCircle2 = styled.div`
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 50%;
  background: #FFE899;
  animation: ${ddonddon} 2s 1.5s infinite ease;
`;

const SpinnerCircle3 = styled.div`
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 50%;
  background: #FFE899;
  animation: ${ddonddon} 2s 2s infinite ease;
`;

const SpinnerCircle4 = styled.div`
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 50%;
  background: #FFE899;
  animation: ${ddonddon} 2s 2.5s infinite ease;
`;



export default Loading;