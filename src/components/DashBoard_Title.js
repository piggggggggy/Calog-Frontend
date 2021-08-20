import React from 'react';

// css
import {Grid, Text, Image} from '../elements';
import styled from 'styled-components';
import theme from '../shared/theme';

// imgs
import extra_icon from '../img/good.png';
import over_icon from '../img/nope.png';
import Average_icon from '../img/soso.png';
import default_icon from '../img/none.png';

/** 
 * @역할 대시보드 상단 오늘 섭취한 칼로리와 bmr을 비교하여 이미지와 멘트를 나타내는 컴포넌트
 * @필수값 : is_login, bmr, record, user_info
 * @담당자 : 김나영
*/

const DashBoard_Title = (props) => {

  const {is_login, bmr, record, user_info} = props

  // bmr과의 비교 대상 - 오늘 먹은 총 칼로리
  let today_kcal = 0;
  for(let idx = 0; idx<record?.length; idx++) {
    let kcal = record[idx].resultKcal;
    today_kcal += kcal
  };
  
  const tenPer = bmr*0.1;
  
  // case2-1) 기초대사량과 비교하여 +/- 10% 적당히 먹었을 때
  const Average = ((bmr-tenPer) <= today_kcal) && (today_kcal <= (bmr+tenPer));

  // case2-2) 기초대사량과 비교하여 bmr이 남았을 때
  const extra_bmr = today_kcal < (bmr-tenPer);
  const how_extra = bmr - today_kcal;

  // case2-3) 기초대사량과 비교하여 bmr을 초과했을 때
  const over_bmr = today_kcal > (bmr+tenPer);
  const how_over = today_kcal - bmr;

  return (
    <React.Fragment>

    {/* 배경 */}
    <Top>

      {/* case1) 로그인 유저 */}
      {is_login ? (
        <React.Fragment>

        {/* case1-1) 기록된 bmr이 있는 경우 */}
        {bmr !== 0 ? (
          <React.Fragment>

            {/* case1-1-1) 적당히 섭취했을 때 */}
            {Average  && <Image src={Average_icon} b_size="100% 100%"/>}

            {/* case1-1-2) 더 많이 섭취했을 때*/}
            {over_bmr && <Image src={over_icon} b_size="100% 100%"/>}

            {/* case1-1-3) 덜 섭취했을 때*/}
            {extra_bmr && <Image src={extra_icon} b_size="100% 100%"/>}
          </React.Fragment>
        ) : (

          // case1-2) 기록된 bmr이 없는 경우
          <Image src={default_icon} b_size="100% 100%"/>
        )}
        </React.Fragment>
      ) : (

      // case2) 비로그인 유저
      <Image src={default_icon} b_size="100% 100%"/>
      )}
    </Top>


    {/* 멘트 */}
    <Line>

      {/* case1) 로그인 유저 */}
      {is_login ? (
      <React.Fragment>

        {/* 닉네임 >> 초과해서 먹었을 경우에만 색을 다르게 */}
        {(over_bmr && bmr !== 0) ?
          <Text size="22px" bold m_size="18px" color={'#E24444'}>{user_info.nickname}님!</Text> :
          <Text size="22px" bold m_size="18px">{user_info.nickname}님!</Text>
        }

        {/* case1-1) 기록된 리스트가 있을 때 */}
        {record?.length !== 0 ? (
          <React.Fragment>

            {/* case1-1-1) bmr 값이 있을 때 */}
            {bmr !== 0 ? (
              <React.Fragment>

              {/* case1-1-1) 적당히 섭취했을 때 */}
              {Average  && (
                <React.Fragment>
                  <Text size="22px" bold m_size="18px">오늘의 칼로리를<br/>충분히 채웠어요</Text>
                  <Grid padding="1vh 0 0 0;">
                    <Text size="15px" bold color={theme.color.gray_6} m_size="13px">오늘처럼 꾸준히 노력해봐요!</Text>
                  </Grid> 
                </React.Fragment>
              )}

              {/* case1-1-2) 더 많이 섭취했을 때 */}
              {over_bmr && (
                <React.Fragment>
                  <Text size="22px" bold m_size="18px" color={'#E24444'}>{how_over}kcal<br/>초과했어요</Text>
                  <Grid padding="1vh 0 0 0;">
                    <Text size="15px" bold color={theme.color.gray_6} m_size="13px">조금만 더 줄여보는건 어떨까요?</Text>
                  </Grid> 
                </React.Fragment>
              )}

              {/* case1-1-3) 덜 섭취했을 때 */}
              {extra_bmr && (
                <Grid>
                  <Text size="22px" bold m_size="18px">{how_extra}kcal<br/>더 먹을 수 있어요</Text>
                  <Grid padding="1vh 0 0 0;">
                    <Text size="15px" bold color={theme.color.gray_6} m_size="13px"> 어떤 음식을 더 먹어볼까요?</Text>
                  </Grid> 
                </Grid>
              )}
              </React.Fragment>
            ) : (

              // case1-1-2) bmr 값이 없을 때
              <Text size="22px" bold m_size="18px">입력된 <br/>기초 대사량이 없어요</Text>
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>

            {/* case1-2) 기록된 리스트가 없을 때 */}
            <Text size="22px" bold m_size="18px">칼로리를<br/>등록해주세요</Text>
            <Grid padding="1vh 0 0 0;">
              <Text size="15px" bold color={theme.color.gray_6} m_size="13px"> 오늘은 어떤 음식을 드실건가요?</Text>
            </Grid> 
          </React.Fragment>
        )}
        </React.Fragment>    
      ) : (
        <React.Fragment>

        {/* case2) 비로그인 유저 */}
        <Text size="22px" bold m_size="18px">안녕하세요!</Text>
        <Text size="22px" bold m_size="18px">로그인이<br/>필요한 기능이예요</Text>
        <Grid padding="1vh 0 0 0;">
          <Text size="15px" bold color={theme.color.gray_6} m_size="13px"> 오늘은 어떤 음식을 드실건가요?</Text>
        </Grid> 
        </React.Fragment>
      )} 
    </Line>

    </React.Fragment>
  );
}

const Top = styled.div`
  position: relative;
  width: 100%;
  height: 29vh;
  border-bottom-left-radius: 32px;
  border-bottom-right-radius: 32px;
`;

const Line = styled.div`
  position: relative;
  line-height: 27px;
  padding-left: 9.7%;
  margin-top: -45%;

  @media ${theme.device.mobileM} {
    line-height: 20px;
  }
`;

export default DashBoard_Title;