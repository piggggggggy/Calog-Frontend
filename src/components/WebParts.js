import React from 'react';
import styled from 'styled-components';
import { Grid } from '../elements'

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 작업에 필요한 파츠들 임시 작성
 * @필수값 이 컴포넌트를 사용할 때 필수 props
 * @담당자 : 용태
*/

const WebParts = (props) => {
// dispatch
// props
// useEffect

  return (
    <React.Fragment>
      <SearchContainer>
        <SearchContents>
          <input placeholder="입력해"></input>
          <button></button>
        </SearchContents>

      </SearchContainer>


    </React.Fragment>
  );
}

WebParts.defaultProps = {

}

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 373px;
  margin-bottom: 2rem;
  border: 2px solid #5fdb5b;
  box-sizing: border-box;
`;

const SearchContents = styled.div`
  position: absolute;
  height: 60px;
  display: flex;
  align-items: center;
  padding-left: 30px;
  width: 100%;

  & > input {
    font-size: 20px;
    font-weight: 500;
    border: none;
    width: 238px;
    outline: none;
  }

  & > button {
    width: 24px;
    height: 24px;
    position: absolute;
    right: 74px;
    background: #ececec;
    border-radius: 50%;
    border: none;
    padding: 0;
    cursor: pointer;
  }
`;

const SearchButton = styled.div`
  position: absolute;
  right: 0;
  width: 68px;
`;





export default WebParts;