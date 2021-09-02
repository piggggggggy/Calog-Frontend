import React from "react";
import styled from "styled-components";

const Button = (props) => {
  // bg : background-color
  const {
    children,
    bg,
    width,
    margin,
    height,
    _onClick,
    border_radius,
    cursor,
  } = props;

  const styles = {
    bg,
    width,
    margin,
    height,
    border_radius,
    cursor,
  };

  return (
    <React.Fragment>
      <DefaultBtn {...styles} onClick={_onClick} type="button">
        {children}
      </DefaultBtn>
    </React.Fragment>
  );
};

Button.defaultProps = {
  children: null,
  bg: "black",
  width: "100%",
  margin: "auto",
  height: null,
  _onClick: () => {},
  border_radius: "0px",
  cursor: "pointer",
};

const DefaultBtn = styled.button`
  display: block;
  border: none;
  ${(props) => (props.cursor ? `cursor: default` : `cursor: pointer`)};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  background-color: ${(props) => props.bg};
  border-radius: ${(props) => props.border_radius};
`;

export default Button;
