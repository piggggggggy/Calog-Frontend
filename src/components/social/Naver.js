import React from 'react';


const Naver = async () => 
{
  const tokenSave = () => 
  {
    const params = (new URL(document.location)).searchParams;
    const token = params.get("token")
  
    document.cookie = `TOKEN=${token};`;
  };

    await tokenSave();
    await window.location.replace('/body');


  return (
    <div>
      네이버
    </div>
  );
}


export default Naver;