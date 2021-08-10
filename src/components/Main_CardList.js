import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import { useInView } from 'react-hook-inview';

// elements & components
import Card from './Main_Card';

/** 
 * @param {*} props
 * @returns 검색결과
 * @역할 검색결과를 보여주는 컴포넌트
 * @필수값 검색 결과 search_list
 * @담당자 : 박용태
*/

const CardList = (props) => {
// dispatch




  const search_list = props.search_list;

  // const [ref, inView] = useInView({
  //   threshold: 1,
  // });

  // // 페이지네이션
  // const [paging, setPage] = useState({
  //   page: 1,
  //   start: 0,
  //   end: 20,
  // });

  // const handleNext = useCallback(() => {
  //   const { page, start, end } = paging;
  //   setPage({
  //     page: page + 1,
  //     start: start + 20,
  //     end: end + 20,
  //   })
  // }, [paging]);

  // useEffect(() => {
  //   if (inView) {
  //     handleNext();
  //     console.log(inView);
  //     console.log(paging);
  //     console.log(target_list);
  //   }
  // }, [inView])

  // const target_list = search_list.slice(paging.start, paging.end);
  // console.log(target_list)
  return (
    <React.Fragment>
      <CardContainer>
        {search_list && search_list.map((result, idx) => {     
          if (idx >= 100) {
            return;
          }
          return <Card key={result.foodId} {...result}/>;
            
          })}
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

export default CardList;