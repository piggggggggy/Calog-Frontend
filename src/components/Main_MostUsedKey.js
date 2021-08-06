import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
// elements & components
import { Text } from '../elements';
// modules
import { getMostUsedKeyDB, searchKeywordDB } from '../redux/modules/search';

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 most_list
 * @담당자 : 박용태
*/

const MostUsedKey = (props) => {
// dispatch
  const dispatch = useDispatch();
// props
  const most_list = useSelector((state) => state.search.most);
// useEffect
  useEffect(() => {
    dispatch(getMostUsedKeyDB());
  }, [])


  return (
    <React.Fragment>
      <MostContainer>
        {most_list.map((m, idx) => {
          if (idx < 4){
            return (
              <MostButton 
                onClick={()=>{
                  dispatch(searchKeywordDB(
                    {
                      keyword: m.keyword,
                      min: 0,
                      max: 5000,
                    }
                  ));
                }}
                key={idx}>
                <Text lineheight="12px" m_lineheight="12px" size="10px" m_size="10px" color="#404040" padding="0" margin="0">{m.keyword}</Text>
              </MostButton>
            )
          }
        })}
      </MostContainer>
    </React.Fragment>
  );
}

MostUsedKey.defaultProps = {

}

const MostContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2%;
  margin-top: 1.2vh;
  min-height: 3.4vh
`;

const MostButton = styled.div`
  min-width: 14%;
  height: 2.2vh;
  padding: 2px 4px;
  border: none;
  border-radius: 12.5px;
  background: #fff7da;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default MostUsedKey;