import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import {history} from '../redux/configStore';

/** 
 * @param {*} props
 * @returns 똔똔똔
 * @역할 스피너 역할
 * @담당자 : 박용태
*/

const Loading4 = (props) => {

  const url = history.location.pathname.split('/')
  // console.log(url)

  useEffect(() => {

    // 미들웨어 외에 추가로 페이지에 스피너를 적용하고 싶을 경우 url 주소에 /loading 추가하여 들어오는 경우
    {(url[1] === "loading") && (

      // 대시보드의 경우 바디 스펙을 적용시킬려면 렌더링이 아닌 새로고침을 했을 때에만 적용되어 /dashboard는 예외 처리
      // url[2] === "dashboard" ? (
      //   setTimeout(() => (window.location.replace(`/dashboard`)), 500)
      // ) : (

        // 캘린더 상세의 경우 url 형식이 /url/:date로 들어가서 예외 처리
        !url[3] ? (
          setTimeout(() => (history.replace(`/${url[2]}`)), 500)
        ) : (
          setTimeout(() => (history.replace(`/${url[2]}/${url[3]}`)), 500)
        )
      // )
    )}
  }, [history]);

  return (
    <React.Fragment>
      <SpinnerContainer>
          <Spinner1>
            <svg viewBox="0 0 816 663" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M526 289C526 289 679.256 287.438 806 475" stroke="#565656" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M183.438 331.5C111.452 559.804 323.253 663 495.73 663C668.207 663 806.61 543.547 741.682 331.5C688.045 156.462 650.909 0 478.439 0C305.969 0 236.545 163.064 183.438 331.5Z" fill="#EC6262"/>
              <path d="M597.399 178.933C599.558 178.933 601.696 178.507 603.69 177.679C605.683 176.851 607.494 175.637 609.017 174.108C612.101 171.011 613.832 166.818 613.83 162.447C613.831 158.078 612.1 153.888 609.017 150.792C607.494 149.262 605.683 148.049 603.69 147.221C601.696 146.393 599.558 145.967 597.399 145.967C593.04 145.972 588.861 147.708 585.781 150.792C582.698 153.888 580.968 158.078 580.968 162.447C580.966 166.818 582.697 171.011 585.781 174.108C588.861 177.192 593.04 178.928 597.399 178.933Z" fill="white"/>
              <path d="M498.793 162.447C498.793 158.078 500.524 153.888 503.606 150.792C505.13 149.262 506.94 148.049 508.934 147.221C510.928 146.393 513.066 145.967 515.224 145.967C519.584 145.972 523.762 147.708 526.843 150.792C529.925 153.888 531.656 158.078 531.656 162.447C531.657 166.818 529.927 171.011 526.843 174.108C523.762 177.192 519.584 178.928 515.224 178.933C513.066 178.933 510.928 178.507 508.934 177.679C506.94 176.851 505.13 175.637 503.606 174.108C500.522 171.011 498.791 166.818 498.793 162.447Z" fill="white"/>
              <path d="M520.65 249.219C517.852 248.43 515.482 246.564 514.06 244.029C512.627 241.497 512.254 238.501 513.023 235.694C518.25 216.485 538.358 205.93 557.161 206.34C576.713 206.766 594.725 218.286 599.983 237.615C600.569 240.424 600.035 243.351 598.495 245.773C596.958 248.192 594.534 249.913 591.742 250.567C588.954 251.221 586.02 250.752 583.574 249.262C581.128 247.766 579.361 245.375 578.65 242.598C576.007 232.979 565.885 228.517 556.682 228.316C547.478 228.115 537.184 232.12 534.118 241.627C533.33 244.424 531.464 246.795 528.929 248.217C526.41 249.632 523.433 249.993 520.65 249.219Z" fill="white"/>
              <path d="M290 319C290 319 136.744 317.438 10 505" stroke="#565656" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </Spinner1>
          <Spinner2>
            <svg viewBox="0 0 589 663" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M574.562 331.5C646.548 559.804 434.747 663 262.27 663C89.7933 663 -48.6102 543.547 16.3182 331.5C69.9125 156.462 107.084 0 279.561 0C452.038 0 521.455 163.064 574.562 331.5Z" fill="#FFE899"/>
              <path d="M248.761 176.474C251.84 173.374 253.569 169.182 253.568 164.813C253.568 160.446 251.839 156.256 248.761 153.158C245.679 150.072 241.498 148.337 237.136 148.333C232.777 148.338 228.599 150.074 225.518 153.158C222.436 156.254 220.705 160.445 220.705 164.813C220.703 169.184 222.434 173.377 225.518 176.474C228.599 179.558 232.777 181.294 237.136 181.299C241.498 181.295 245.679 179.56 248.761 176.474Z" fill="#F19F13"/>
              <path d="M330.935 176.474C327.855 179.558 323.676 181.294 319.317 181.299C314.958 181.294 310.779 179.558 307.699 176.474C304.615 173.377 302.884 169.184 302.886 164.813C302.886 160.445 304.616 156.254 307.699 153.158C310.779 150.074 314.958 148.338 319.317 148.333C323.676 148.338 327.855 150.074 330.935 153.158C334.018 156.254 335.749 160.445 335.748 164.813C335.75 169.184 334.019 173.377 330.935 176.474Z" fill="#F19F13"/>
              <path d="M250.619 210.256C253.12 211.735 254.932 214.145 255.657 216.958C258.521 226.529 268.732 230.757 277.931 230.757C287.131 230.757 297.354 226.493 300.205 216.958C300.972 214.194 302.792 211.841 305.274 210.403C307.752 208.966 310.695 208.561 313.468 209.275C316.245 209.99 318.631 211.764 320.115 214.216C321.605 216.67 322.073 219.61 321.419 222.405C315.747 241.614 297.488 252.739 277.931 252.739C259.124 252.739 239.25 241.773 234.443 222.429C233.735 219.607 234.173 216.619 235.662 214.119C237.139 211.616 239.549 209.801 242.363 209.074C245.163 208.366 248.13 208.791 250.619 210.256Z" fill="#F19F13"/>
              <path d="M367 194L354 207" stroke="#ED6358" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M384 194L371 207" stroke="#ED6358" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M336 239C336 239 305.721 227.423 311.809 201" stroke="#F19F13" stroke-width="19" stroke-miterlimit="10" stroke-linecap="round"/>
            </svg> 
          </Spinner2>
          <Spinner3>
            <svg viewBox="0 0 626 752" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M207.633 410.649C207.633 410.649 63.6229 358.118 11 138.091" stroke="#565656" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M525.292 392.375C589.081 671.36 397.877 751.554 245.057 751.554C92.2362 751.554 -26.8751 651.497 30.6576 392.375C78.1426 178.481 97.146 0 263.138 0C429.129 0 478.238 186.549 525.292 392.375Z" fill="#6993FF"/>
              <path d="M174.737 165.005C177.817 161.906 179.545 157.714 179.544 153.344C179.544 148.977 177.816 144.787 174.737 141.69C171.655 138.604 167.474 136.868 163.113 136.864C158.754 136.87 154.575 138.605 151.495 141.69C148.412 144.785 146.682 148.976 146.682 153.344C146.68 157.715 148.411 161.908 151.495 165.005C154.575 168.09 158.754 169.825 163.113 169.83C167.474 169.827 171.655 168.091 174.737 165.005Z" fill="white"/>
              <path d="M256.912 165.005C253.832 168.09 249.653 169.825 245.294 169.83C240.934 169.825 236.756 168.09 233.675 165.005C230.591 161.908 228.861 157.715 228.862 153.344C228.862 148.976 230.593 144.785 233.675 141.69C236.756 138.605 240.934 136.87 245.294 136.864C249.653 136.87 253.832 138.605 256.912 141.69C259.995 144.785 261.725 148.976 261.725 153.344C261.727 157.715 259.996 161.908 256.912 165.005Z" fill="white"/>
              <path d="M176.596 198.77C179.097 200.248 180.909 202.659 181.635 205.472C184.498 215.043 194.709 219.271 203.909 219.271C213.108 219.271 223.331 215.006 226.183 205.472C226.95 202.708 228.77 200.354 231.252 198.916C233.729 197.48 236.672 197.075 239.446 197.789C242.222 198.504 244.608 200.278 246.093 202.73C247.582 205.184 248.05 208.123 247.397 210.918C241.724 230.128 223.465 241.253 203.909 241.253C185.101 241.253 165.228 230.286 160.421 210.943C159.713 208.12 160.151 205.133 161.639 202.633C163.116 200.129 165.527 198.315 168.341 197.588C171.141 196.88 174.107 197.304 176.596 198.77Z" fill="white"/>
              <path d="M419.269 350.61C419.269 350.61 563.279 298.079 615.902 78.0518" stroke="#565656" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </Spinner3>
      </SpinnerContainer>
    </React.Fragment>
  );
}

Loading4.defaultProps = {

}

const SpinnerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10%;
  overflow: hidden;
  
`;

const ddonddon = keyframes`
0% {
  top: 0%;
  width: 65px
}
25% {
  top: 2%;
  width: 75px
}
50% {
  top: 0%;
  width: 65px

}
75% {
  top: 2%;
  width: 75px

}
100% {
  top: 0%;
  width: 65px

}
`;

const final = keyframes`
0% {
  opacity: 0;
}
100% {
  opacity: 1;
}
`;

const Spinner1 = styled.div`
  position: relative;
  width: 70px;
  border: none;
  animation: ${ddonddon} 0.8s 0s infinite ease;
`;

const Spinner2 = styled.div`
  position: relative;
  width: 60px;
  border: none;
  animation: ${ddonddon} 0.8s -0.2s infinite ease;
`;

const Spinner3 = styled.div`
  position: relative;
  width: 60px;
  border: none;
  animation: ${ddonddon} 0.8s 0s infinite ease;
`;

const Spinner4 = styled.div`
  position: relative;
  opacity: 0;
  width: 80%;
  border: none;
  z-index: 3;
  animation: ${final} 4s 4.5s 1 ease;
`;




export default Loading4;