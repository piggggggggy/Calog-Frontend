import React from 'react';
import {Button} from '../../elements/index';
/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 이 컴포넌트를 사용할 때 필수 props
 * @담당자 : 
*/

const KakaoLogin = () => {
// dispatch
// props
// useEffect
function SocialKakao () {
window.Kakao.init("260d1c32075b38f17bb12e77e11aa4ca");
    window.Kakao.Auth.login({
        success: function(authObj) {
            console.log(authObj);
            window.Kakao.API.request({
                url:'/v2/user/me',
                success: res => {
                    const profile = res.kakao_account.profile;
                    console.log(profile)
                }
            })
        }
    })
}

  return (
    <React.Fragment>
        <Button _onClick={SocialKakao} bg="#e1bee7" width="5rem" border_radius="20px">로그인</Button>
    </React.Fragment>
  );
}


export default KakaoLogin;