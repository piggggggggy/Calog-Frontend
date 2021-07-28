import React from 'react';
import styled from 'styled-components';


/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 이 컴포넌트를 사용할 때 필수 props
 * @담당자 : 
*/

const MainBody = (props) => {
// dispatch
// props
// useEffect

  return (
    <React.Fragment>


      <SearchGrid width="60%" margin="2rem auto">
        <SearchInput placeholder="입력해"/>
        <SearchButton>검색</SearchButton>
      </SearchGrid>


    </React.Fragment>
  );
}

MainBody.defaultProps = {

}

const SearchGrid = styled.div`
  position: relative;
  width: 30vw;
  margin: 2rem auto;
  /* display: flex;
  align-items: center; */
  
`;

const SearchInput = styled.input`
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 1rem 10rem 1rem 1rem;
  border: 1px solid black;
  /* border-radius: 6px; */
  outline: none;
  line-height: 1rem;
`;

const SearchButton = styled.button`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  height: 30px;
  margin: 10px 10px 0 0;
  cursor: pointer;
`;

export default MainBody;