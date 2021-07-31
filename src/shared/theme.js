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
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "450px",
  tablet: "768px",
  tabletL: "1024px",
};

//반응형용 디바이스
const device = {
  mobileS: `only screen and (max-width: ${deviceSizes.mobileS})`,
  mobileM: `only screen and (max-width: ${deviceSizes.mobileM})`,
  mobileL: `only screen and (max-width: ${deviceSizes.mobileL})`,
  tablet: `only screen and (max-width: ${deviceSizes.tablet})`,
  tabletL: `only screen and (max-width: ${deviceSizes.tabletL})`,
};

const theme = {
  color,
  deviceSizes,
  device,
}

export default theme;
