import React from "react";
import styled from "styled-components";
import theme from '../shared/theme'

const Text = (props) => {
    //bold : font-weight / size : font-size / lineheight: line-height
    const {children, width, bold, color, size, margin, lineheight,
        //media
        m_size} = props;


    const styles = {
        width,
        bold,
        color,
        size,
        margin,
        lineheight,
        //media
        m_size,
    };

    return(
        <React.Fragment>
            <DefaultText {...styles}> {children} </DefaultText>
        </React.Fragment>
    )
}

Text.defaultProps = {
    children: null,
    width: "auto",
    bold: false,
    color: "black",
    size: "1em",
    margin: "auto",
    lineheight: "null",
    //media
    m_size: "1em",
};

const DefaultText = styled.p`
    width: ${(props) => props.width};
    font-weight: ${(props) => (props.bold? "700" : "400")};
    color: ${(props) => props.color};
    font-size: ${(props) => props.size};
    margin: ${(props) => props.margin};  
    ${(props) => props.lineheight ? `line-height: ${props.lineheight}` : ''};

    @media ${theme.device.mobileM} {
        font-size: ${(props) => props.m_size};
        ${(props) => props.m_lineheight ? `line-height: ${props.m_lineheight}` : ''};
    }
`;

export default Text;