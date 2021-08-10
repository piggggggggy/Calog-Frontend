import React from 'react';

const Kakao = async () => {

  const tokenSave = () => {
    const params = (new URL(document.location)).searchParams;
    const token = params.get("token")
      document.cookie = `TOKEN=${token};`;
  };

    await tokenSave();
    await window.location.replace('/loading/body');

  return (
    <div>
        카카오
    </div>
  );
}


export default Kakao;