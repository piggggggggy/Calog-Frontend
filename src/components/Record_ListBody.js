import React, {useState} from 'react';
import { Grid } from '../elements';
//컴포넌트
import Record_List from '../components/Record_List';

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 : 칼로리 리스트 갯수에 따라 표출되는 리스트의 idx, 버튼 값의 변동을 모아놓은 컴포넌트
 * @필수값 : cart_list
 * @담당자 : 김나영
*/

const Record_ListBody = (props) => {
  const cart_list = props.list

  //더보기 버튼
  const [long, setLong] = useState('none')
  const [short, setShort] = useState('block')
  //더보기버튼
  const moreBtn = () => {
    setLong('block')
    setShort('none')
  }
  //덜보기(?)버튼
  const lessBtn = () => {
    setLong('none')
    setShort('block')
  }

  return (
    <React.Fragment>
      <Grid margin="46% auto 24px auto" height="auto" m_margin="50% auto 24px auto" display={short}>
        {cart_list.map((c, idx) => {
          // 리스트가 6개 이상일 경우
          if(cart_list.length > 5) {
            // idx 5번까지만 로드한다
            if(idx < 5) {
              return <Record_List key={c.foodId} {...c}/>
            }
          } else {
            return <Record_List key={c.foodId} {...c}/>
          }
        })}
      </Grid>
      {/* 더보기 버튼 눌렀을 때 활성화 */}
      <Grid margin="46% auto 24px auto" height="auto" m_margin="50% auto 24px auto" display={long}>
        {cart_list.map((c, idx) => {
          return <Record_List key={c.foodId} {...c}/>
        })}
      </Grid>
      {/* 리스트가 6개 이상일 경우 활성화 */}
      {cart_list.length > 5 &&
        <Grid margin="5% auto" width="30px" _onClick={moreBtn} m_margin="5% auto" display={short}>
          <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.23 0.229981L20 1.99998L10 12L-7.73692e-08 1.99998L1.77 0.229981L10 8.45998L18.23 0.229981Z" fill="#757575"/>
          </svg>
        </Grid>
      }
      {/* 리스트가 max일 경우 활성화 */}
      <Grid margin="5% auto" width="30px" m_margin="5% auto" _onClick={lessBtn} display={long}>
        <svg width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.87746 12.1475L1.07579 10.4098L10.8936 0.23083L21.0725 10.0486L19.3348 11.8503L10.9575 3.77025L2.87746 12.1475Z" fill="#757575"/>
        </svg>
      </Grid>
    </React.Fragment>
  );
}



export default Record_ListBody;