import React, {useState, useRef, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { useSelector, useDispatch } from 'react-redux';
// elements & components
import Card from './Main_Card';

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 이 컴포넌트를 사용할 때 필수 props
 * @담당자 : 
*/

const CardList = (props) => {
// dispatch
  const dispatch = useDispatch();
// props
  const search_list = props.search_list;

  // 무한스크롤 용
  const [items, setItems] = useState([]);
  const [page, setPage] = useState({
    start: 0,
    end: 20,
    next: false
  });
  const [loading, setLoading] = useState(false);

  const [ref, inView] = useInView();
// useEffect

  // 무한스크롤

  const sliceItems = useCallback(() => {
    // setLoading(true)
    let result = search_list.slice(page.start, page.end);
    if (result.length === 21) {
      setPage({
        start: page.start + 20,
        end: page.end + 20,
        next: true
      })
      result.pop();
      setItems([...items, ...result]);
    } else {
      setItems([...items, ...result]);
    };
    // setLoading(false)
  }, [search_list])

  // useEffect(() => {
  //   sliceItems()
  // }, []);

  useEffect(() => {
    if(inView) {
      sliceItems()
    }
  }, [inView]);

  console.log(items);
  // console.log(items);
  // console.log("loading:",loading);
  // console.log("inView:", inView);

  // if (!search_list) {
  //   return <></>
  // }

  return (
    <React.Fragment>
      <CardContainer>
        {search_list.map((result, idx) => {     
            if (idx < 100) {
              return <Card key={result.foodId} {...result}/>
            }                  
          })}
        {/* {search_list.map((result, idx) => {     
          if (search_list.length -1 != idx) {
            return <Card key={result.foodId} {...result}/> 
          } else {
            return <Card ref={ref} key={result.foodId} {...result}/> 
          }                  
        })} */}
      </CardContainer>
    </React.Fragment>
  );
}

CardList.defaultProps = {

}

const CardContainer = styled.div`
  width: 100%;
  padding: 0 6%;
  /* height: 100%; */
  display: flex;
  flex-wrap: wrap;
  column-gap: 4%;
`;

export default CardList;