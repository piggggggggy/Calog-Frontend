import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import { useInView } from 'react-hook-inview';

// elements & components
import Card from './Main_Card';

/** 
 * @param {*} props
 * @returns 검색결과
 * @역할 검색결과를 보여주는 컴포넌트
 * @담당자 : 박용태
*/

const CardList = (props) => {




  const search_list = props.search_list;
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