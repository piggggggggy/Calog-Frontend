import React from 'react';
import styled, { keyframes } from 'styled-components';

/** 
 * @param {*} props
 * @returns 똔똔똔
 * @역할 스피너 역할
 * @필수값 
 * @담당자 : 박용태
*/

const Loading3 = (props) => {
// dispatch
// props
// useEffect

  return (
    <React.Fragment>
      <SpinnerContainer>
        <Spinner1>
          <svg viewBox="0 0 626 752" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M207.633 410.649C207.633 410.649 63.6229 358.118 11 138.091" stroke="#565656" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M525.292 392.375C589.081 671.36 397.877 751.554 245.057 751.554C92.2362 751.554 -26.8751 651.497 30.6576 392.375C78.1426 178.481 97.146 0 263.138 0C429.129 0 478.238 186.549 525.292 392.375Z" fill="#6993FF"/>
            <path d="M174.737 165.005C177.817 161.906 179.545 157.714 179.544 153.344C179.544 148.977 177.816 144.787 174.737 141.69C171.655 138.604 167.474 136.868 163.113 136.864C158.754 136.87 154.575 138.605 151.495 141.69C148.412 144.785 146.682 148.976 146.682 153.344C146.68 157.715 148.411 161.908 151.495 165.005C154.575 168.09 158.754 169.825 163.113 169.83C167.474 169.827 171.655 168.091 174.737 165.005Z" fill="white"/>
            <path d="M256.912 165.005C253.832 168.09 249.653 169.825 245.294 169.83C240.934 169.825 236.756 168.09 233.675 165.005C230.591 161.908 228.861 157.715 228.862 153.344C228.862 148.976 230.593 144.785 233.675 141.69C236.756 138.605 240.934 136.87 245.294 136.864C249.653 136.87 253.832 138.605 256.912 141.69C259.995 144.785 261.725 148.976 261.725 153.344C261.727 157.715 259.996 161.908 256.912 165.005Z" fill="white"/>
            <path d="M176.596 198.77C179.097 200.248 180.909 202.659 181.635 205.472C184.498 215.043 194.709 219.271 203.909 219.271C213.108 219.271 223.331 215.006 226.183 205.472C226.95 202.708 228.77 200.354 231.252 198.916C233.729 197.48 236.672 197.075 239.446 197.789C242.222 198.504 244.608 200.278 246.093 202.73C247.582 205.184 248.05 208.123 247.397 210.918C241.724 230.128 223.465 241.253 203.909 241.253C185.101 241.253 165.228 230.286 160.421 210.943C159.713 208.12 160.151 205.133 161.639 202.633C163.116 200.129 165.527 198.315 168.341 197.588C171.141 196.88 174.107 197.304 176.596 198.77Z" fill="white"/>
            <path d="M419.269 350.61C419.269 350.61 563.279 298.079 615.902 78.0518" stroke="#565656" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </Spinner1>
        <Spinner2>
          <svg viewBox="0 0 816 663" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M526 289C526 289 679.256 287.438 806 475" stroke="#565656" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M183.438 331.5C111.452 559.804 323.253 663 495.73 663C668.207 663 806.61 543.547 741.682 331.5C688.045 156.462 650.909 0 478.439 0C305.969 0 236.545 163.064 183.438 331.5Z" fill="#EC6262"/>
            <path d="M597.399 178.933C599.558 178.933 601.696 178.507 603.69 177.679C605.683 176.851 607.494 175.637 609.017 174.108C612.101 171.011 613.832 166.818 613.83 162.447C613.831 158.078 612.1 153.888 609.017 150.792C607.494 149.262 605.683 148.049 603.69 147.221C601.696 146.393 599.558 145.967 597.399 145.967C593.04 145.972 588.861 147.708 585.781 150.792C582.698 153.888 580.968 158.078 580.968 162.447C580.966 166.818 582.697 171.011 585.781 174.108C588.861 177.192 593.04 178.928 597.399 178.933Z" fill="white"/>
            <path d="M498.793 162.447C498.793 158.078 500.524 153.888 503.606 150.792C505.13 149.262 506.94 148.049 508.934 147.221C510.928 146.393 513.066 145.967 515.224 145.967C519.584 145.972 523.762 147.708 526.843 150.792C529.925 153.888 531.656 158.078 531.656 162.447C531.657 166.818 529.927 171.011 526.843 174.108C523.762 177.192 519.584 178.928 515.224 178.933C513.066 178.933 510.928 178.507 508.934 177.679C506.94 176.851 505.13 175.637 503.606 174.108C500.522 171.011 498.791 166.818 498.793 162.447Z" fill="white"/>
            <path d="M520.65 249.219C517.852 248.43 515.482 246.564 514.06 244.029C512.627 241.497 512.254 238.501 513.023 235.694C518.25 216.485 538.358 205.93 557.161 206.34C576.713 206.766 594.725 218.286 599.983 237.615C600.569 240.424 600.035 243.351 598.495 245.773C596.958 248.192 594.534 249.913 591.742 250.567C588.954 251.221 586.02 250.752 583.574 249.262C581.128 247.766 579.361 245.375 578.65 242.598C576.007 232.979 565.885 228.517 556.682 228.316C547.478 228.115 537.184 232.12 534.118 241.627C533.33 244.424 531.464 246.795 528.929 248.217C526.41 249.632 523.433 249.993 520.65 249.219Z" fill="white"/>
            <path d="M290 319C290 319 136.744 317.438 10 505" stroke="#565656" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </Spinner2>
        <Spinner3>
          <svg viewBox="0 0 589 663" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M574.562 331.5C646.548 559.804 434.747 663 262.27 663C89.7933 663 -48.6102 543.547 16.3182 331.5C69.9125 156.462 107.084 0 279.561 0C452.038 0 521.455 163.064 574.562 331.5Z" fill="#FFE899"/>
            <path d="M248.761 176.474C251.84 173.374 253.569 169.182 253.568 164.813C253.568 160.446 251.839 156.256 248.761 153.158C245.679 150.072 241.498 148.337 237.136 148.333C232.777 148.338 228.599 150.074 225.518 153.158C222.436 156.254 220.705 160.445 220.705 164.813C220.703 169.184 222.434 173.377 225.518 176.474C228.599 179.558 232.777 181.294 237.136 181.299C241.498 181.295 245.679 179.56 248.761 176.474Z" fill="#F19F13"/>
            <path d="M330.935 176.474C327.855 179.558 323.676 181.294 319.317 181.299C314.958 181.294 310.779 179.558 307.699 176.474C304.615 173.377 302.884 169.184 302.886 164.813C302.886 160.445 304.616 156.254 307.699 153.158C310.779 150.074 314.958 148.338 319.317 148.333C323.676 148.338 327.855 150.074 330.935 153.158C334.018 156.254 335.749 160.445 335.748 164.813C335.75 169.184 334.019 173.377 330.935 176.474Z" fill="#F19F13"/>
            <path d="M250.619 210.256C253.12 211.735 254.932 214.145 255.657 216.958C258.521 226.529 268.732 230.757 277.931 230.757C287.131 230.757 297.354 226.493 300.205 216.958C300.972 214.194 302.792 211.841 305.274 210.403C307.752 208.966 310.695 208.561 313.468 209.275C316.245 209.99 318.631 211.764 320.115 214.216C321.605 216.67 322.073 219.61 321.419 222.405C315.747 241.614 297.488 252.739 277.931 252.739C259.124 252.739 239.25 241.773 234.443 222.429C233.735 219.607 234.173 216.619 235.662 214.119C237.139 211.616 239.549 209.801 242.363 209.074C245.163 208.366 248.13 208.791 250.619 210.256Z" fill="#F19F13"/>
            <path d="M367 194L354 207" stroke="#ED6358" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M384 194L371 207" stroke="#ED6358" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M336 239C336 239 305.721 227.423 311.809 201" stroke="#F19F13" stroke-width="19" stroke-miterlimit="10" stroke-linecap="round"/>
          </svg> 
        </Spinner3>
        <Spinner4>
          <svg viewBox="0 0 1268 1092" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M987.562 331.5C1059.55 559.804 847.747 663 675.27 663C502.793 663 364.39 543.547 429.318 331.5C482.912 156.462 520.084 0 692.561 0C865.038 0 934.455 163.064 987.562 331.5Z" fill="#FFE899"/>
            <path d="M661.761 176.474C664.84 173.374 666.569 169.182 666.568 164.813C666.568 160.446 664.839 156.256 661.761 153.158C658.679 150.072 654.498 148.337 650.136 148.333C645.777 148.338 641.599 150.074 638.518 153.158C635.436 156.254 633.705 160.445 633.705 164.813C633.703 169.184 635.434 173.377 638.518 176.474C641.599 179.558 645.777 181.294 650.136 181.299C654.498 181.295 658.679 179.56 661.761 176.474Z" fill="#F19F13"/>
            <path d="M743.935 176.474C740.855 179.558 736.676 181.294 732.317 181.299C727.958 181.294 723.779 179.558 720.699 176.474C717.615 173.377 715.884 169.184 715.886 164.813C715.886 160.445 717.616 156.254 720.699 153.158C723.779 150.074 727.958 148.338 732.317 148.333C736.676 148.338 740.855 150.074 743.935 153.158C747.018 156.254 748.749 160.445 748.748 164.813C748.75 169.184 747.019 173.377 743.935 176.474Z" fill="#F19F13"/>
            <path d="M663.619 210.256C666.12 211.735 667.932 214.145 668.657 216.958C671.521 226.529 681.732 230.757 690.931 230.757C700.131 230.757 710.354 226.493 713.205 216.958C713.972 214.194 715.792 211.841 718.274 210.403C720.752 208.966 723.695 208.561 726.468 209.275C729.245 209.99 731.631 211.764 733.115 214.216C734.605 216.67 735.073 219.61 734.419 222.405C728.747 241.614 710.488 252.739 690.931 252.739C672.124 252.739 652.25 241.773 647.443 222.429C646.735 219.607 647.173 216.619 648.662 214.119C650.139 211.616 652.549 209.801 655.363 209.074C658.163 208.366 661.13 208.791 663.619 210.256Z" fill="#F19F13"/>
            <path d="M780 194L767 207" stroke="#ED6358" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M797 194L784 207" stroke="#ED6358" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M749 239C749 239 718.721 227.423 724.809 201" stroke="#F19F13" stroke-width="19" stroke-miterlimit="10" stroke-linecap="round"/>
            <path d="M793.354 390.044H791.904L794.421 394.022L791.904 398H793.354L795.24 394.923L797.135 398H798.575L796.016 394.022L798.575 390.044H797.125L795.24 393.276L793.354 390.044ZM785.593 407.392H784.267L781.625 409.153V410.479L784.205 408.77H784.267V418H785.593V407.392ZM788.578 418.083C789.096 418.083 789.52 417.658 789.52 417.14C789.52 416.622 789.096 416.198 788.578 416.198C788.06 416.198 787.625 416.622 787.635 417.14C787.625 417.658 788.06 418.083 788.578 418.083ZM794.591 418.145C796.704 418.145 798.248 416.664 798.248 414.613C798.248 412.551 796.756 411.059 794.736 411.059C793.99 411.059 793.275 411.308 792.809 411.671H792.695L793.089 408.563H797.74V407.392H791.991L791.245 413.193H792.519C792.913 412.51 793.607 412.23 794.498 412.24C795.927 412.251 796.963 413.266 796.963 414.644C796.963 415.98 795.969 416.985 794.591 416.985C793.441 416.985 792.519 416.28 792.426 415.338H791.141C791.224 416.964 792.675 418.145 794.591 418.145Z" fill="black"/>
            <path d="M848.732 727.8C848.732 727.8 704.722 675.268 652.099 455.241" stroke="#565656" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M1166.39 709.525C1230.18 988.51 1038.98 1068.7 886.155 1068.7C733.335 1068.7 614.224 968.647 671.756 709.525C719.241 495.631 738.245 317.15 904.236 317.15C1070.23 317.15 1119.34 503.699 1166.39 709.525Z" fill="#6993FF"/>
            <path d="M815.836 482.156C818.916 479.056 820.644 474.864 820.643 470.495C820.643 466.127 818.915 461.938 815.836 458.84C812.754 455.754 808.573 454.018 804.212 454.015C799.852 454.02 795.674 455.756 792.593 458.84C789.511 461.935 787.78 466.126 787.78 470.495C787.779 474.865 789.509 479.059 792.593 482.156C795.674 485.24 799.852 486.975 804.212 486.981C808.573 486.977 812.754 485.241 815.836 482.156Z" fill="white"/>
            <path d="M898.011 482.156C894.93 485.24 890.751 486.975 886.392 486.981C882.033 486.975 877.854 485.24 874.774 482.156C871.69 479.059 869.959 474.865 869.961 470.495C869.961 466.126 871.691 461.935 874.774 458.84C877.854 455.756 882.033 454.02 886.392 454.015C890.751 454.02 894.93 455.756 898.011 458.84C901.093 461.935 902.824 466.126 902.824 470.495C902.825 474.865 901.095 479.059 898.011 482.156Z" fill="white"/>
            <path d="M817.695 515.92C820.196 517.399 822.008 519.809 822.733 522.622C825.597 532.193 835.808 536.421 845.007 536.421C854.207 536.421 864.43 532.157 867.281 522.622C868.048 519.858 869.868 517.505 872.35 516.067C874.828 514.63 877.771 514.225 880.544 514.939C883.321 515.654 885.707 517.428 887.191 519.88C888.681 522.334 889.149 525.274 888.495 528.069C882.823 547.278 864.564 558.403 845.007 558.403C826.2 558.403 806.326 547.437 801.519 528.093C800.811 525.271 801.249 522.283 802.738 519.783C804.215 517.28 806.625 515.465 809.44 514.738C812.24 514.03 815.206 514.455 817.695 515.92Z" fill="white"/>
            <path d="M1060.37 667.76C1060.37 667.76 1204.38 615.229 1257 395.202" stroke="#565656" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M463 625L476 637" stroke="#ED6358" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M446 625L459 637" stroke="#ED6358" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M526 718C526 718 679.256 716.438 806 904" stroke="#565656" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M183.438 760.5C111.452 988.804 323.253 1092 495.73 1092C668.207 1092 806.61 972.547 741.682 760.5C688.045 585.462 650.909 429 478.439 429C305.969 429 236.545 592.064 183.438 760.5Z" fill="#EC6262"/>
            <path d="M597.399 607.933C599.558 607.933 601.696 607.507 603.69 606.679C605.683 605.851 607.494 604.637 609.017 603.108C612.101 600.011 613.832 595.818 613.83 591.447C613.831 587.078 612.1 582.888 609.017 579.792C607.494 578.262 605.683 577.049 603.69 576.221C601.696 575.393 599.558 574.967 597.399 574.967C593.04 574.972 588.861 576.708 585.781 579.792C582.698 582.888 580.968 587.078 580.968 591.447C580.966 595.818 582.697 600.011 585.781 603.108C588.861 606.192 593.04 607.928 597.399 607.933Z" fill="white"/>
            <path d="M498.793 591.447C498.793 587.078 500.524 582.888 503.606 579.792C505.13 578.262 506.94 577.049 508.934 576.221C510.928 575.393 513.066 574.967 515.224 574.967C519.584 574.972 523.762 576.708 526.843 579.792C529.925 582.888 531.656 587.078 531.656 591.447C531.657 595.818 529.927 600.011 526.843 603.108C523.762 606.192 519.584 607.928 515.224 607.933C513.066 607.933 510.928 607.507 508.934 606.679C506.94 605.851 505.13 604.637 503.606 603.108C500.522 600.011 498.791 595.818 498.793 591.447Z" fill="white"/>
            <path d="M592.208 635.672C595.022 636.399 597.433 638.213 598.91 640.717C600.398 643.217 600.836 646.205 600.129 649.027C595.322 668.346 575.448 679.337 556.641 679.337C537.084 679.337 518.825 668.212 513.147 649.002C512.5 646.207 512.97 643.269 514.456 640.814C515.941 638.362 518.327 636.588 521.103 635.873C523.877 635.159 526.82 635.564 529.298 637C531.776 638.442 533.595 640.794 534.367 643.556C537.218 653.115 547.435 657.355 556.641 657.355C565.846 657.355 576.051 653.127 578.909 643.556C579.636 640.742 581.45 638.331 583.953 636.854C586.44 635.384 589.409 634.959 592.208 635.672Z" fill="white"/>
            <path d="M290 748C290 748 136.744 746.438 10 934" stroke="#565656" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </Spinner4>
      </SpinnerContainer>
    </React.Fragment>
  );
}

Loading3.defaultProps = {

}

const SpinnerContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap:30px;
`;

const ddonddon = keyframes`
0% {
  opacity: 0.5;
}
50% {
  opacity: 1;
}
100% {
  opacity: 0;

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
  position: absolute;
  opacity: 0;
  width: 90%;
  right: -20%;
  border: none;
  z-index: 5;
  animation: ${ddonddon} 1.5s 0s 1 ease;
`;

const Spinner2 = styled.div`
  position: absolute;
  opacity: 0;
  width: 100%;
  left: -30%;
  border: none;
  z-index: 4;
  animation: ${ddonddon} 1.5s 1.5s 1 ease;
`;

const Spinner3 = styled.div`
  position: absolute;
  opacity: 0;
  width: 90%;
  /* left: -30%; */
  border: none;
  z-index: 3;
  animation: ${ddonddon} 1.5s 3s 1 ease;
`;

const Spinner4 = styled.div`
  position: relative;
  opacity: 0;
  width: 100%;
  border: none;
  z-index: 3;
  animation: ${final} 4s 4.5s 1 ease;
`;


export default Loading3;