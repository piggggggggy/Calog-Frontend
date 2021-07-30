import React from 'react';
import styled from 'styled-components';
// elements & components
import { Text } from '../elements';
// icons
import { IoIosArrowDropleft,IoIosArrowDropright } from 'react-icons/io';
// library
// import Swipeout from 'rc-swipeout';
// import '../../node_modules/rc-swipeout/assets/index.css';

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 카드에 들어갈 푸드 정보
 * @담당자 : 박용태
*/

const Card = (props) => {
// dispatch
// props
// useEffect

  return (
    <React.Fragment>
      {/* <Swipeout
        right={[
          {
            text: 'x',
            onPress: () => console.log('삭제?'),
            style: { backgroundColor: 'gray', color: '#353535', width: "4rem", margin: "0.5rem 0", borderRadius: "20px"},
            // className: 'custom-class-2'
          }
        ]}
        onOpen={() => console.log('열림')}
        onClose={() => console.log('닫힘')}
        > */}
        {/* <div style={{height: 44}}> swipeout demo </div> */}
        <FoodCard>
          <Text margin="0" padding="0">쌀 밥</Text>
          <Text size="1.8rem" bold color="green" margin="10px 0 0 0" padding="0">310 kcal</Text>
          <CountBox>
            <div><IoIosArrowDropleft color="gray" size="2rem"/></div>
            <Text color="#353535" bold size="2rem" margin="0" padding="0">5</Text>
            <div><IoIosArrowDropright color="gray" size="2rem"/></div>
          </CountBox>
        </FoodCard>
      {/* </Swipeout> */}
      
    </React.Fragment>
  );
}

Card.defaultProps = {

}

const FoodCard = styled.div`
  position: relative;
  /* display: flex; */
  width: calc(100% - 50px);
  margin: 0.5rem 25px;
  padding: 25px 30px;
  background: lightgray;
  border: none;
  border-radius: 20px;
`;

const CountBox = styled.div`
  position: absolute;
  right: 5%;
  top: 40%;
  display: flex;
  align-items: center;
  justify-content: space-between;  
  position: absolute;
  width: 115px;
`;

export default Card;