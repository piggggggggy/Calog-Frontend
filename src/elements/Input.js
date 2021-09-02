import React from "react";
import styled from "styled-components";

import { Text, Grid } from "./index";

const Input = (props) => {
  // bg : background-color / type(혹시나 submit, file로 변경 가능성) / onSubmit(keypress Enter과 연결) / value 추가
  const {
    label,
    placeholder,
    width,
    bg,
    border,
    border_radius,
    padding,
    type,
    onSubmit,
    _onChange,
    value,
  } = props;

  const styles = {
    width,
    bg,
    border,
    border_radius,
    padding,
  };

  return (
    <React.Fragment>
      <Grid>
        <Text margin="0px">{label}</Text>
        <DefaultInput
          {...styles}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={_onChange}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              onSubmit(e);
            }
          }}
        />
      </Grid>
    </React.Fragment>
  );
};

Input.defaultProps = {
  label: "",
  placeholder: "",
  width: "100%",
  bg: null,
  border: "1px solid black",
  border_radius: "0px",
  padding: "2px",
  type: "text",
  value: "",
  onSubmit: () => {},
  _onChange: () => {},
};

const DefaultInput = styled.input`
  width: ${(props) => props.width};
  background-color: ${(props) => props.bg};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.border_radius};
  padding: ${(props) => props.padding};
  box-sizing: border-box;
  :focus {
    outline: none;
  }
`;

export default Input;
