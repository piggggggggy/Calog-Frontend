import React from 'react';

const Google = async () => {

  const tokenSave = () => {
    const params = (new URL(document.location)).searchParams;
    const token = params.get("token")
      document.cookie = `TOKEN=${token};`;
  };

    await tokenSave();
    await window.location.replace('/loading/body');


  return (
    <div>
        구글
    </div>
  );
}


export default Google;