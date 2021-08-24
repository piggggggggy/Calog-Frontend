import React, {useState} from 'react';
import styled from 'styled-components';
import {Grid, Text} from '../elements';
import theme from '../shared/theme';

// middleware
import {useDispatch, useSelector} from 'react-redux';
import {delRecordDB} from '../redux/modules/record';


/** 
 * @역할 모달 카드
 * @필수값 title
 * @담당자 : 김나영
*/

const Modal = (props) => {
  const dispatch = useDispatch();

  const {open, title} = props;

  // 모달 열고 닫기
  const [display, setDisplay] = useState("block");

  // 삭제 모달 시 필요 - id, 날짜, 타입
  const record = useSelector((state) => state.record);
  const record_list = record.record[0];
  const record_id = record_list?._id;
  const record_date = record_list?.date;
  const type = record.type;
  const delBtn = () => {
    dispatch(delRecordDB(record_id, record_date, type))
  };

  // 취소 버튼
  const xBtn = () => {
    setDisplay("none")
  };

  

  return (
    <Grid display={open ? display : "none"}>

      {/* 바탕 */}
      <Wrap>

        {/* 흰색 박스 */}
        <InnerBox>

          {/* 내용 */}
          <Grid padding="10.6% 0 10.6% 0">

            {/* 삭제 모달인 경우 */}
            {title === "삭제" && (
              <React.Fragment>
                <Grid margin="0 0 0 8.5%" m_margin="0 0 0 8.5%">
                  <Text size="28px" bold m_size="23px" >삭제하시겠습니까?</Text>
                  <Grid margin="2% 0 0 0" m_margin="2% 0 0 0">
                    <Text size="18px" bold color={theme.color.gray_6} m_size="14px">삭제된 식단은 장바구니에 추가되며<br/>기록이 작성되면 사라져요!</Text>
                  </Grid>
                </Grid>
              </React.Fragment>
            )}

            {/* 버튼 */}
            {/* 삭제 모달인 경우 - 버튼 2개 */}
            {title === "삭제" && (
              <DelBtns>
                <Btn onClick={xBtn}>
                  <Text size="16px" bold m_size="12px">취소</Text>
                </Btn>
                <Btn onClick={delBtn}>
                  <Text size="16px" bold m_size="12px">삭제</Text>
                </Btn>
              </DelBtns>
            )}
          </Grid>

          

        </InnerBox>

      </Wrap>
    </Grid>
  );
};

const Wrap = styled.div`
  top: 0;
  left: 0;
  position: absolute;
  background-color: rgba(30, 30, 30, 0.1);
  width: 100%;
  height: 100%;
  animation: modal-bg-show .3s;

  @keyframes modal-bg-show {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
  }
`;

const InnerBox = styled.div`
  background-color: white;
  position: relative;
  z-index: 100;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 90.5%;
  height: auto;
  border-radius: 10px;
  animation: modal-show .3s;

  @keyframes modal-show {
    from {
        opacity: 0;
        margin-top: -50px;
    }
    to {
        opacity: 1;
        margin-top: 0;
    }
  }
`;

const Btn = styled.button`
  width: 40%;
  height: 40px;
  background-color: ${theme.color.light};
  border: none;
  border-radius: 44px;
`;

const DelBtns = styled.div`
  display: flex;
  justify-content: space-around;
  margin:4% 0 0 0;
`;



export default Modal;