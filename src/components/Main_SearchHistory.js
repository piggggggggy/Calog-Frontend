import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

// elements & components
import { Grid, Text } from "../elements";
import Loading from "./Loading2";

// icons
import { TiDeleteOutline } from "react-icons/ti";

// modules
import { getRecentDB, deleteRecentDB } from "../redux/modules/recent";

/**
 * @param {*} props
 * @returns 설명적기
 * @역할 현재 독립되지 않고 붙여서 사용 중이라 독립시킬지 말지 고민중
 * @담당자 : 박용태
 */

const SearchHistory = (props) => {
  const dispatch = useDispatch();
  const styles = props.style;
  const recent_list = useSelector((state) => state.recent.recent);

  useEffect(() => {
    dispatch(getRecentDB());
  }, []);

  // loading
  const is_loaded = useSelector((state) => state.record.is_loaded);

  if (!is_loaded) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <historyContainer style={styles}>
        <div>
          <Grid is_flex padding="1.8vh 6%">
            <Text
              lineheight="18px"
              bold
              size="13px"
              m_size="13px"
              color="#000000"
              padding="0"
              margin="0"
            >
              최근검색어
            </Text>
          </Grid>
          <Line />
          {recent_list.map((rec, idx) => {
            if (idx < 5) {
              return (
                <>
                  <Grid is_flex padding="1.3vh 8%" key={idx}>
                    <Text
                      lineheight="20px"
                      m_lineheight="17px"
                      size="15px"
                      m_size="13px"
                      color="#404040"
                      padding="0"
                      margin="0"
                    >
                      {rec.keyword}
                    </Text>
                    <div
                      style={{
                        width: "18px",
                        height: "18px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <TiDeleteOutline
                        onClick={() => {
                          dispatch(deleteRecentDB(rec.keyword));
                        }}
                        size="15px"
                        color="#737373"
                      />
                    </div>
                  </Grid>
                  <Line />
                </>
              );
            }
          })}
        </div>
      </historyContainer>
    </React.Fragment>
  );
};

SearchHistory.defaultProps = {};

const historyContainer = styled.div`
  display: none;
  width: 100%;
  max-width: 420px;
  height: 67vh;
  position: absolute;
  top: 1;
  background: #00000048;
  z-index: 200;
  overflow: hidden;

  & > div {
    width: 100%;
    height: 35vh;
    overflow: scroll;
    background: #fff;
    border-bottom-left-radius: 28px;
    border-bottom-right-radius: 28px;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Line = styled.div`
  width: 87%;
  margin: auto;
  border: 1px solid #ffe899;
`;

export default SearchHistory;
