import React from 'react';
import { history } from '../../redux/configStore';


const Kakao = () => 
{
  const tokenSave = () =>
  {
    const params = (new URL(document.location)).searchParams;
    const token = params.get("token")

      document.cookie = `TOKEN=${token};`;
  };

  try {
      tokenSave();
      window.location.replace('/dashboard');
    }
    catch {
      window.alert("소셜 로그인 실패, 다시 로그인 해주세요!");
      history.replace("/body");
    };


  return (
    <div>
        카카오
    </div>
  );
}


export default Kakao;