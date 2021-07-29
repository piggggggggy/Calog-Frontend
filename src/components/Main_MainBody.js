import React from 'react';
import styled from 'styled-components';


/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 이 컴포넌트를 사용할 때 필수 props
 * @담당자 : 박용태
*/

const MainBody = (props) => {
// dispatch
// props
// useEffect

  return (
    <React.Fragment>
      <BodyContainer>

        <SearchGrid margin="1rem 0.5rem">
          <div>
            <input placeholder="입력해"/>
          </div>
          
          {/* <SearchButton>검색</SearchButton> */}
        </SearchGrid>



      </BodyContainer>
    </React.Fragment>
  );
}

MainBody.defaultProps = {

}

const BodyContainer = styled.div`
  max-width: 100%;
  margin: auto;
`;

const SearchGrid = styled.div`
  margin: 10px 20px;
  width: 100%;
  
  & > div {

    width: 100%;
    border: 1px solid #000;
    padding: 9px 20px;
    border-radius: 25px;
    /* box-sizing: border-box; */

    & > input {
      display: block;
      font-size: 14px;
      font-weight: 400;
      width: 100%;
      border: none;
      outline: none;
      /* line-height: 1rem; */
    }
  }

  
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