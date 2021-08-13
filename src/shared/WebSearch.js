import React, {useRef} from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../redux/configStore';
// modules
import { 
  searchKeywordDB, 
  countKeywordDB
} from '../redux/modules/search';
import { 
  searchRecentDB,
  addRecent
} from '../redux/modules/recent';
// 이미지
import SearchBar from '../img/Searchbar_p.png';

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @담당자 : 박용태
*/

const WebSearch = (props) => {

  const dispatch = useDispatch();
  // const { history } = props;
  const keyword = useRef();
  const is_login = useSelector((state) => state.user.is_login);

  // 검색 함수
  const search = () => {
    const data = {
      keyword: keyword.current.value,
      min: 0,
      max: 5000
    };
    dispatch(searchKeywordDB(data));
    dispatch(countKeywordDB(keyword.current.value));
    {is_login ?
      dispatch(searchRecentDB(keyword.current.value))
      : dispatch(addRecent(keyword.current.value))};
      // history.push(`/search/${keyword.current.value}`);
  };

  // 엔터 검색
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      search();
      keyword.current.vlaue = '';
    }
  };

  // 검색어 삭제
  const deleteKeyword = () => {
    keyword.current.value = '';
  };


  return (
    <React.Fragment>
      <Container>

        <SearchBox>

          {/* 배경 */}
          <img src={SearchBar}/>

          {/* 입력란 */}
          <SearchContents>
            <input 
            onKeyPress={onKeyPress}
            ref={keyword} 
            placeholder="어떤 칼로리가 궁금하신가요?"
            />
            <button onClick={deleteKeyword}/>
          </SearchContents>

          {/* 버튼 */}
          <SearchBtn onClick={()=>search()}/>

        </SearchBox>

      </Container>
    </React.Fragment>
  );
}

WebSearch.defaultProps = {

}

const Container = styled.div`
  position: fixed;
  z-index: 1;
  width: 100%;
  max-width: 512px;
  height: 100%;
  left: calc(50vw - 512px);
  /* background: #F19F13; */
  /* border: 5px solid black; */

  @media only screen and (max-width: 1024px) {
    display: none;
  }
`;

const SearchBox = styled.div`
  position: relative;
  top: 52%;
  left: 10%;
  width: 373px;
  display: flex;
  align-items: center;

  & > img {
    width: 100%;
  }
`;

const SearchContents = styled.div`
  position: absolute;
  height: 60px;
  display: flex;
  align-items: center;
  padding-left: 30px;
  width: 100%;
  z-index: 5;

  & > input {
    font-size: 17px;
    border: none;
    outline: none;
    width: 238px;
    padding: 1px 2px;
  }

  & > button {
    position: absolute;
    /* display: none; */
    width: 24px;
    height: 24px;
    right: 74px;
    background: #E4E4E4;
    border-radius: 50%;
    border: none;
    padding: 0;
    cursor: pointer;
  }
`;

const SearchBtn = styled.div`
  position: absolute;
  right: 0;
  width: 63px;
  height: 63px;
  border-radius: 50%;
  z-index: 5;
  cursor: pointer;
`;

export default WebSearch;