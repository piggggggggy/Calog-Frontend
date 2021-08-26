import React, {useCallback, useRef, useState} from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import theme from '../shared/theme';

// elements & components
import Card from './Main_Card';
import { Text } from '../elements';
import Loading from '../pages/Loading3';

// modulse
import { foodFeedBack } from '../redux/modules/notice';
import { history } from '../redux/configStore';


/** 
 * @param {*} props
 * @returns 검색결과
 * @역할 검색결과를 보여주는 컴포넌트
 * @담당자 : 박용태
*/

const CardList = (props) => {

  const dispatch = useDispatch();

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

  // 피드백 보내기
  const [feedback, setFeedback] = useState(false);
  
  const ref = useRef()
  const feedBack = () => {
    if (ref.current.value) {
      dispatch(foodFeedBack(ref.current.value));
      setFeedback(false);
      window.alert("요청되었습니다!")
    } else {
      window.alert("입력된 키워드가 없어요!")
    }

  };

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
              <Text size="13px" m_size="13px" padding="0" margin="0" cursor="pointer">더보기</Text>
            </MoreBtn> 
          : ''}

          {/* 피드백보내기 */}
          <FeedBackContainer>
            <FeedBackText>혹시 찾으시는 음식이 없으신가요?</FeedBackText>
            {feedback ? 
              <FeedbackInput>
                <input ref={ref} placeholder="이곳에 찾으시는 음식을 적어주세요!"></input>
              </FeedbackInput>
            : ''}
            <FeedBackBtn onClick={()=>{!feedback ? setFeedback(true) : feedBack()}}>
              <div>{!feedback ? "키워드 등록 요청하기" : "제출하기"}</div>
            </FeedBackBtn>
          </FeedBackContainer>

          {/* 음식 직접 등록 */}
          {!feedback && (
            <AddFoodBtn onClick={() => {history.push('/addFood')}}>
              <div>음식 직접 등록하기</div>
            </AddFoodBtn>
          )}
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
  margin-bottom: 20vh;
`;

const MoreBtn = styled.div`
  width: 100%;
  height: 4vh;
  padding: 1.1vh 6%;
  background: rgba(196, 196, 196, 0.19);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;


const FeedBackContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3.7vh;
`;

const FeedBackText = styled.div`
  font-size: 17px;
  line-height: 22px;
  margin-bottom: 0.9vh;
  color: #5F5F5F;
  font-weight: bold;
  cursor: default;
`;

const FeedbackInput = styled.div`
  width: 72.5%;
  margin: auto;
  border: 1px solid #838383;
  border-radius: 44px;
  padding: 1.3vh 25px;
  margin-bottom: 1.2vh;

  & > input {
    width: 100%;
    border: none;
    outline: none;

    ::placeholder {
      font-size: 13px;
      color: #C4C4C4;
    }
  }
`;

const FeedBackBtn = styled.div`
  width: 54%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #FFE899;
  border: none;
  border-radius: 44px;
  padding-top: 1.3vh;
  padding-bottom: 1.3vh;
  cursor: pointer;

  & > div {
    font-size: 16px;
    line-height: 22px;
    font-weight: bold;
    color: #404040;

    @media ${theme.device.mobileM} {
      font-size: 14px;
    }
  }
`;

const AddFoodBtn = styled.div`
  width: 54%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1.5px solid #F5CC3F;
  border-radius: 44px;
  padding-top: 1.3vh;
  padding-bottom: 1.3vh;
  cursor: pointer;
  margin-top: 2%;

  & > div {
    font-size: 16px;
    line-height: 22px;
    font-weight: bold;
    color: #E6BB2A;

    @media ${theme.device.mobileM} {
      font-size: 14px;
    }
  }
`;


export default CardList;