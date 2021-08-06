import React, { useRef } from 'react';
import NaverLogin from 'react-naver-login';

const Naver = () => {

  const _clickSnsLoginNaver = (e) => {
    let naverid = e.id; // 네이버에서 제공한 ID
    console.log(naverid);
    console.log("click naver sns login");
  };


  return (
    <NaverLogin
    clientId={"Er0DcRNuNMqBlt_3FF7t"}
    callbackUrl="http://localhost:3000/body"
    render={renderProps => (
      <div onClick={renderProps.onClick} disabled={renderProps.disabled}>
        <button>버튼</button>
      </div>
    )}
    onSuccess={(e) => _clickSnsLoginNaver(e)}
    onFailure={(result) => console.error(result)}
    />
  );
}


export default Naver;