//컬러 
const color = {
  gray_1: "#ffffff",
  gray_2: "#e4e4e4",
  gray_3: "#c5c5c5",
  gray_4: "#a9a9a9",
  gray_5: "#8c8c8c",
  gray_6: "#737373",
  gray_7: "#5f5f5f",
  gray_8: "#404040",
  gray_9: "#2b2b2b",
  gray_10: "#111e30",
  light: "#ffe899",
  dark: "#f19f13"
};

//반응형용 디바이스 사이즈
const deviceSizes = {
  //갤럭시 폴드
  mobileF: "300px",
  //가로가 정말 작은 휴대폰
  mobileS: "360px",
  //가로가 작은 휴대폰(아이폰 5)
  mobileM: "400px",
  //세로가 긴 휴대폰(갤럭시 폴더나 아이폰 프로의 경우)
  mobileH: "700px",
  //가로도 세로도 작은 휴대폰..
  mobileMini: "568px",
  //세로가 1024 넘어가는 매우 긴 디바이스
  mobileHH: "1024px",
};

//반응형용 디바이스
const device = {
  mobileF: `only screen and (max-width: ${deviceSizes.mobileF})`,
  mobileS: `only screen and (max-width: ${deviceSizes.mobileS})`,
  mobileM: `only screen and (max-width: ${deviceSizes.mobileM})`,
  mobileH: `only screen and (min-height: ${deviceSizes.mobileH})`,
  mobileMini: `only screen and (max-height: ${deviceSizes.mobileMini})`,
  mobileHH: `only screen and (min-height: ${deviceSizes.mobileHH})`
};

const theme = {
  color,
  deviceSizes,
  device,
}

export default theme;