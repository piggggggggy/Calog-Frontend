import React from 'react';
import { Grid } from '../elements';
import styled from 'styled-components';
//컴포넌트
import BtnHeader from '../shared/BtnHeader';
import Record_Date from '../components/Record_Date';
import Record_When from '../components/Record_When';
import Record_List from '../components/Record_List';
//이모지
import { BiCamera } from "react-icons/bi";


/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 : 카트에 담은 칼로리 리스트를 본격적으로 기록하러 갈 수 있는 페이지
 * @담당자 : 김나영
*/

const Record = (props) => {
// dispatch
// props
// useEffect

  return (
    <React.Fragment>
      {/* 헤더 */}
      <BtnHeader title="기록하기" display="none"/>
      {/* 날짜 */}
      <Record_Date />
      {/* 기록할 칼로리의 시점 */}
      <Record_When />
      {/* 칼로리 리스트 - 맵 */}
      <Grid bg={'#eee'} width="374px" height="361px" margin="23px auto" border_radius="44px">
        <Record_List />
      </Grid>
      {/* 사진 */}
      <Grid>
        <label for="File">
          <Grid bg={'#eee'} width="374px" height="236px" margin="23px auto" border_radius="44px" padding="15% 30%">
            <BiCamera size="118px" color={'white'}/>
          </Grid>
        </label>
        <FileBox type="file" id="File" accept="image/*"/>
      </Grid>
    </React.Fragment>
  );
}

Record.defaultProps = {

}

const FileBox = styled.input`
  display: none;
`;

export default Record;