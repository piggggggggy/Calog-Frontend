import React from 'react';
import styled from 'styled-components';
import {Button, Text, Grid, Input} from '../elements';


const AddSpec = () => {

    return(
        <React.Fragment>
            <Container>
                <Headers>
                    <Grid>
                        <Text size="28px" lineheight="34px"><Strong>이경미님</Strong>의</Text>
                        <Text size="28px" lineheight="34px"><Strong>신장사이즈</Strong>를 알려주세요</Text>
                    </Grid>
                    <Grid>
                        <Text size="15px" lineheight="20px" color="#5F5F5F">
                        경미님의 소중한 신체데이터는 저희만 알고있을게요!<br/>
                        신장사이즈는 기초대사량을 계산하는 데에 사용됩니다.</Text>
                    </Grid>
                </Headers>
                <Body>
                <InputBox>
                <Input border="none" width="70%"/><Strong>CM</Strong>
                </InputBox>

                    <Button bg="#FFE899" width="348px" height="56px" border_radius="60px">
                        <Text>확인</Text>
                        </Button>
                
                </Body>
            </Container>
        </React.Fragment>
    )
}

export default AddSpec;

const Container = styled.div`
    width: 420px;
    height: 800px;
`;

const Headers = styled.div`

`;

const Body = styled.div`

`;

const InputBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 348px;
    height: 56px;
    border: 1px solid #F19F13;
    border-radius: 60px;
`;

const Strong = styled.b`
    size: 28px;
    line-height: 34px;
    font-weight: 700;
`;