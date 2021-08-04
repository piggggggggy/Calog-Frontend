import React, { useCallback, useEffect } from 'react';
import _ from 'lodash';

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 이 컴포넌트를 사용할 때 필수 props
 * @담당자 : 
*/

// const InfiniteScroll = (props) => {
// // dispatch
// // props
//   const { children, callNext, is_next, loading } = props;
// // useEffect

//   // 무한 스크롤..
//   const _handleScroll = _.throttle(() => {
//     // const { innerHeight } = window;
//     // const { scrollHeight } = document.body;

//     // const scrollTop = (document.documentElement && document.documentElement.scrollTop) ||
//     // document.body.scrollTop;

//     // if (scrollHeight - innerHeight - scrollTop < 200) {
//     //   callNext();
//     // }

//     callNext();

//   }, 300);

//   const hadleScroll = useCallback(_handleScroll, [loading]);

//   // console.log("loading:",loading);
//   // console.log("is_next:",is_next);

//   useEffect(() => {
//     if (loading) {
//       return;
//     }
    
//     if (is_next) {
      
//       window.addEventListener("scroll", hadleScroll);
//       console.log("add")
//     } else {
//       window.removeEventListener("scroll", hadleScroll);
//       console.log("remove")
//     }

//     return () => {window.removeEventListener("scroll", hadleScroll); console.log("종료");}
//   }, [is_next, loading]);

//   return (
//     <React.Fragment>
//       {children}
//     </React.Fragment>
//   );
// };
const InfiniteScroll = (props) => {
// dispatch
// props
  const { children, callNext, is_next, loading } = props;
// useEffect

  // 무한 스크롤..
  const _handleScroll = _.throttle(() => {
    // const { innerHeight } = window;
    // const { scrollHeight } = document.body;

    // const scrollTop = (document.documentElement && document.documentElement.scrollTop) ||
    // document.body.scrollTop;

    // if (scrollHeight - innerHeight - scrollTop < 200) {
    //   callNext();
    // }

    callNext();

  }, 300);

  const hadleScroll = useCallback(_handleScroll, [loading]);

  // console.log("loading:",loading);
  // console.log("is_next:",is_next);

  useEffect(() => {
    if (loading) {
      return;
    }
    
    if (is_next) {
      
      window.addEventListener("scroll", hadleScroll);
      console.log("add")
    } else {
      window.removeEventListener("scroll", hadleScroll);
      console.log("remove")
    }

    return () => {window.removeEventListener("scroll", hadleScroll); console.log("종료");}
  }, [is_next, loading]);

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
};
  

InfiniteScroll.defaultProps = {
  children: null,
  callNext: () => {console.log('next~~~')},
  is_next: true,
  loading: false,
};

export default InfiniteScroll;