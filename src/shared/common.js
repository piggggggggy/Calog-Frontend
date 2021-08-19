export const IdCheck = (id) => {
    let _reg = /^[a-zA-Z0-9]/;
  
    return _reg.test(id);
  };
  
  export const NickCheck = (nick="") => {
    let _reg = /^[가-힣a-zA-Z0-9]/;
    if(nick.length<2||nick.length>5){
        return false;
    }
    console.log(nick)
    return _reg.test(nick);
  };

  export const pwdCheck = (pwd="") => {
    let _reg = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/;
    if(pwd.length<8){
        return false;
    }
    return _reg.test(pwd);
  };

  export const pwdDupli = (pwd, pwdcheck) => {
    if(pwd===pwdcheck){
      return true;
    } else {
      return false;
    }
  }

  export const emailCheck = (email) => {
    let _reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    // let _reg = /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-z])*.([a-zA-Z])*/;
  
    return _reg.test(email);
  };

  export const NickLimit = (nick="") => {
      if(nick.length<3){
          return false;
      } else {
          return true;
      }
  }

  export const _Number = (number) => {
    let _reg = /^[0-9]+$/;
    
    return _reg.test(number);
  }