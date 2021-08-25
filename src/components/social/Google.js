import React from 'react';
import { history } from '../../redux/configStore';

import Loading from '../../pages/Loading4';

const Google = () => 
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
        <Loading/>
  );
}


export default Google;