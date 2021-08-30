import React from "react";
import styled from "styled-components";
import theme from "../shared/theme";

const Image = (props) => {

  // b_size : background-size(contain으로 유지할 경우 사이즈가 맞지 않는 이미지 잘림 방지)
  const { width, height, margin, b_size, cursor, src, border_radius, _onClick, HH_width, HH_height} = props;

  const styles = {
    width,
    height,
    margin,
    b_size,
    cursor,
    border_radius,
    HH_width,
    HH_height,
  };

  return (
    <React.Fragment>
      <DefaultImage {...styles} src={src} onClick={_onClick}/>
    </React.Fragment>
  );
};

Image.defaultProps = {
  width: "100%",
  height: "100%",
  margin: "0px",
  b_size: "contain",
  cursor: "default",
  border_radius: "0px",
  src: "",
  _onClick: () => {},
};

const DefaultImage = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  border-radius: ${(props) => props.border_radius};
  background-image: url("${(props) => props.src}");
  background-position: center;
  background-size: ${(props) => props.b_size};
  background-repeat: no-repeat;
  cursor: ${(props) => props.cursor};

  @media ${theme.device.mobileHH} {
    width: ${(props) => props.HH_width};
    height: ${(props) => props.HH_height};
  }
`;

export default Image;
