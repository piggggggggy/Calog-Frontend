import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

// loadsh
import _ from "lodash";

// modules
import { searchKeywordDB, countKeywordDB } from "../redux/modules/search";
import { searchRecentDB, addRecent } from "../redux/modules/recent";

// icons
import { MdCancel } from "react-icons/md";

// 이미지
import SearchBar from "../img/Searchbar_p.png";

/**
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @담당자 : 박용태
 */

const WebSearch = () => {
  const dispatch = useDispatch();
  const keyword = useRef();
  const is_login = useSelector((state) => state.user.is_login);

  // 검색 함수
  const search = () => {
    const data = {
      keyword: keyword.current.value,
      min: 0,
      max: 2000,
    };
    dispatch(searchKeywordDB(data));
    dispatch(countKeywordDB(keyword.current.value));
    {
      is_login
        ? dispatch(searchRecentDB(keyword.current.value))
        : dispatch(addRecent(keyword.current.value));
    }
  };

  // 엔터 검색
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      search();
      keyword.current.vlaue = "";
    }
  };

  // 검색어 삭제
  const [key, setKey] = useState();
  const _setKey = _.debounce((e) => {
    setKey(e.target.value);
  }, 500);

  const deleteKeyword = () => {
    keyword.current.value = "";
    setKey("");
  };

  return (
    <React.Fragment>
      <Container>
        <SearchBox>
          {/* 배경 */}
          <img src={SearchBar} />

          {/* 입력란 */}
          <SearchContents>
            <input
              onKeyPress={onKeyPress}
              ref={keyword}
              onChange={_setKey}
              placeholder="어떤 칼로리가 궁금하신가요?"
            />
            {key ? (
              // <button onClick={deleteKeyword}/>
              <div
                onClick={() => {
                  deleteKeyword();
                }}
              >
                <MdCancel size="24px" color="#C4C4C4" />
              </div>
            ) : (
              ""
            )}
          </SearchContents>

          {/* 버튼 */}

          <SearchBtn onClick={() => search()} />
        </SearchBox>
      </Container>
    </React.Fragment>
  );
};

WebSearch.defaultProps = {};

const Container = styled.div`
  position: fixed;
  z-index: 1;
  width: 100%;
  max-width: 512px;
  height: 100%;
  left: calc(50vw - 512px);

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

  & > div {
    position: absolute;
    width: 24px;
    height: 24px;
    right: 65px;
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
