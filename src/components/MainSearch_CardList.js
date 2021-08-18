import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import theme from '../shared/theme';

// elements & components
import Card from './Main_Card';
import { Text } from '../elements';
import Loading from '../pages/Loading3';


/** 
 * @param {*} props
 * @returns 검색결과
 * @역할 검색결과를 보여주는 컴포넌트
 * @담당자 : 박용태
*/

const CardList = (props) => {

  // 검색결과
  // const search_list = useSelector((state) => state.search.filtered_list);
  const search_list = props.search_list;
  
  // 페이지네이션
  const [page, setPage] = useState({
    start: 0,
    end: 20,
  })

  const nextPage = useCallback(() => {
    setPage({
      start: page.start,
      end: page.end + 20,
    })
  }, [page])

  return (
    <React.Fragment>
        {/* 검색결과 */}
        <CardContainer>
          {search_list && search_list.slice(page.start, page.end).map((result, idx) => {     
            return <Card key={result.foodId} {...result}/>;
            })}

          {/* 더보기 버튼  */}
          {search_list?.length > page.end ? 
            <MoreBtn onClick={nextPage}>
              <Text size="13px" m_size="13px" padding="0" margin="0">더보기</Text>
            </MoreBtn> 
          : ''}
        </CardContainer>
    </React.Fragment>
  );
}

CardList.defaultProps = {

}

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  column-gap: 1.8vh;
`;

const MoreBtn = styled.div`
  width: 100%;
  height: 4vh;
  padding: 1.1vh 6%;
  background: rgba(196, 196, 196, 0.19);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default CardList;