import React, { useState } from 'react';
import styled from 'styled-components';
import {Button, Text, Grid, Input} from '../elements';
import BodySpec from './BodySpec';
import { useDispatch } from 'react-redux';
import { BodySpectSV } from '../redux/modules/user';
import { history } from '../redux/configStore';

const AddSpec = () => {
    const dispatch = useDispatch();
//성별, 나이, 키, 몸무게
const [bodyspec, SetSpec] = useState({});
const {gender, weight, height, age} = bodyspec;
const [page, Setpage] = useState(0);
const nextPage = () => {
    Setpage(page+1);
};
const addspec = () => {
    dispatch(BodySpectSV(gender, weight, height, age));
    history.push("/body");
};
const setMan = () => {
    SetSpec({...BodySpec, gender: "남자"});
    Setpage(page+1);
};
const setWoman = () => {
    SetSpec({...BodySpec, gender: "여자"});
    Setpage(page+1);
};
const setThirdGender = () => {
    SetSpec({...BodySpec, gender: "미정"});
    Setpage(page+1);
};
console.log("next page", page);
console.log("body spec", bodyspec);
    return(
        <React.Fragment>
            <Container>
                <Headers>
                    <Grid padding="12px">
                        <Text size="28px" lineheight="34px"><Strong>이경미님</Strong>의</Text>
                        <Text size="28px" lineheight="34px">
                            {page===0?<Strong>성별</Strong>:
                            page===1?<Strong>나이</Strong>:
                            page===2?<Strong>신장 사이즈</Strong>:
                           <Strong>몸무게</Strong>
                            }
                            를 알려주세요</Text>
                    </Grid>

                    <Grid padding="12px">
                        <Text size="15px" lineheight="20px" color="#5F5F5F">
                        경미님의 소중한 신체데이터는 저희만 알고있을게요!<br/>
                        신장사이즈는 기초대사량을 계산하는 데에 사용됩니다.</Text>
                    </Grid>
                </Headers>
                <Body>

                            {page===0?
                            <Grid display="flex" jc="center">
                            <Gender onClick={setMan}>남</Gender>
                            <Gender onClick={setWoman}>여</Gender>
                            <Gender onClick={setThirdGender}>미정</Gender>
                            </Grid>
                            :
                            page===1?
                            <InputBox>
                            &emsp;<Input border="none" width="80%" type="text" value={bodyspec.age} 
                            _onChange={(e)=>SetSpec({...bodyspec, age: e.target.value})}/>
                            <Strong>AGE&emsp;</Strong>
                            </InputBox>
                            :
                            page===2?
                            <InputBox>
                            &emsp;<Input border="none" width="80%" type="text" value={bodyspec.height}
                            _onChange={(e)=>SetSpec({...bodyspec, height: e.target.value})}/>
                            <Strong>CM&emsp;</Strong>
                            </InputBox>
                            :
                            <InputBox>
                            &emsp;<Input border="none" width="80%" type="text" value={bodyspec.weight}
                            _onChange={(e)=>SetSpec({...bodyspec, weight: e.target.value})}/>
                            <Strong>KG&emsp;</Strong>
                            </InputBox>
                            }
                            {page<1?"":
                        <Button bg="#FFE899" width="348px" height="56px" border_radius="60px"
                        _onClick={
                            page<3?
                            nextPage:
                            addspec
                            }>
                        <Grid cursor>
                            <Text color="#404040" size="16px" lineheight="22px" bold>다음</Text>
                            </Grid>
                            </Button>
                            }

                </Body>
            </Container>
        </React.Fragment>
    )
}

export default AddSpec;

const Container = styled.div`
    width: 420px;
    height: 700px;
`;

const Headers = styled.div`
margin: 150px 0px 64px 20px;
`;

const Body = styled.div`

`;

const InputBox = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 348px;
    height: 56px;
    border: 1px solid #F19F13;
    border-radius: 60px;
    margin: auto;
    margin-bottom: 40px;
`;

const Strong = styled.b`
    size: 28px;
    line-height: 34px;
    font-weight: 700;
`;

const Gender = styled.div`
    width: 100px;
    height: 100px;
    background-color: #F19F13;
    border-radius: 60px;
    margin: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    font-weight: 700;
    &:hover{
        cursor: pointer;
    }
`;