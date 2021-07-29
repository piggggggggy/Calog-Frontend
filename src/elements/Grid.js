import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  //bg : background-color 
  // is_flex : flex,justify-content,align-items 
  // jc : justify-content
  // ai : align-items
  // fd : flex-direction
  // grid_row : grid-template-row
  // grid_column : grid-template-column
  const {children, width, height, margin, padding, bg, border_radius, border, text_align, is_flex, _onClick, cursor, display, jc, ai, fd, grid_row, grid_column, line_height} = props;

  const styles = {
    width,
    height,
    margin,
    padding,
    bg,
    border_radius,
    border,
    text_align,
    is_flex,
    cursor,
    display,
    jc,
    ai,
    fd,
    grid_row,
    grid_column,
    line_height,
  };

  return (
    <React.Fragment>
      <DefaultGrid onClick={_onClick} {...styles}>{children}</DefaultGrid>
    </React.Fragment>
    
  );
};

Grid.defaultProps = {
  children: null,
  width: "100%",
  height: false,
  margin: "0px",
  padding: "0px",
  bg: null,
  border_radius: "0px",
  border:false,
  text_align: false,
  is_flex: false,
  cursor: null,
  display: "block",
  jc: false,
  ai: "center",
  fd: false,
  grid_row: false,
  grid_column: false,
  _onClick: () => {},
  line_height: false,
};

const DefaultGrid = styled.div`
  width: ${(props) => props.width};
  ${(props) => props.height? `height: ${props.height}`:''};
  margin: ${(props) => props.margin};
  padding : ${(props) => props.padding};
  background-color: ${(props) => props.bg};
  border-radius: ${(props) => props.border_radius};
  border: ${(props) => props.border};
  text-align: ${(props) => props.text_align};
  ${(props) =>props.is_flex &&`display: flex; justify-content: space-between; align-items: center;`}
  ${(props) => (props.cursor ? `cursor: pointer` : "")};
  ${(props) => (props.display ? `display: ${props.display}` : "")};
  ${(props) => (props.jc ? `justify-content: ${props.jc}` : "")};
  ${(props) => (props.ai ? `align-items: ${props.ai}` : "")};
  ${(props) => (props.fd ? `flex-direction: ${props.fd}` : "")};
  ${(props) => (props.grid_row ? `grid-template-row: ${props.grid_row}` : "")};
  ${(props) => (props.grid_column ? `grid-template-column: ${props.grid_column}` : "")};
  ${(props) => (props.line_height ? `line-height: ${props.line_height}` : "")};
`;

export default Grid;
