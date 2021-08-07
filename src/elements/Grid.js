import React from "react";
import styled from "styled-components";
import theme from '../shared/theme';

const Grid = (props) => {
  // bg : background-color 
  // is_flex : flex,justify-content,align-items 
  // jc : justify-content
  // ai : align-items
  // fd : flex-direction
  // grid_row : grid-template-row
  // grid_column : grid-template-column
  const {children, width, height, margin, padding, bg, border_radius, border, text_align, is_flex, _onClick, cursor, display, jc, ai, fd, fw, grid_row, grid_column, line_height,
    
    //media
    m_margin
  } = props;

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
    fw,
    grid_row,
    grid_column,
    line_height,

    //media
    m_margin,
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
  height: null,
  margin: "0px",
  padding: "0px",
  bg: null,
  border_radius: "0px",
  border:false,
  text_align: false,
  is_flex: false,
  cursor: null,
  display: null,
  jc: false,
  ai: "center",
  fd: false,
  fw: false,
  grid_row: false,
  grid_column: false,
  _onClick: () => {},
  line_height: false,
  
  //media
  m_margin: "0px",
};

const DefaultGrid = styled.div`
  width: ${(props) => props.width};
  ${(props) => props.height? `height: ${props.height}`:''};
  margin: ${(props) => props.margin};
  padding : ${(props) => props.padding};
  background-color: ${(props) => props.bg};
  border-radius: ${(props) => props.border_radius};
  border: ${(props) => props.border};
  ${(props) => props.text_align ? `text-align: ${props.text_align}` : ""};
  ${(props) => (props.is_flex ? "display: flex; justify-content: space-between; align-items: center;" : "")}
  ${(props) => (props.cursor ? `cursor: pointer` : "")};
  ${(props) => (props.display ? `display: ${props.display}` : "")};
  ${(props) => (props.jc ? `justify-content: ${props.jc}` : "")};
  ${(props) => (props.ai ? `align-items: ${props.ai}` : "")};
  ${(props) => (props.fd ? `flex-direction: ${props.fd}` : "")};
  ${(props) => (props.fw ? `flex-wrap: ${props.fw}` : "")};
  ${(props) => (props.grid_row ? `grid-template-rows: ${props.grid_row}` : "")};
  ${(props) => (props.grid_column ? `grid-template-columns: ${props.grid_column}` : "")};
  ${(props) => (props.line_height ? `line-height: ${props.line_height}` : "")};

  @media ${theme.device.mobileM} {
    margin: ${(props) => (props.m_margin ? `${props.m_margin}` : `${props.margin}`)}
  }
`;

export default Grid;
