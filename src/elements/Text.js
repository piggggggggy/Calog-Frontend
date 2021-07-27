import React from "react";
import styled from "styled-components";

const Text = (props) => {
    //bold : font-weight / size : font-size
    const {children, width, bold, color, size, margin} = props;


    const styles = {
        width,
        bold,
        color,
        size,
        margin,
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
};

const DefaultText = styled.p`
    width: ${(props) => props.width};
    font-weight: ${(props) => (props.bold? "700" : "400")};
    color: ${(props) => props.color};
    font-size: ${(props) => props.size};
    margin: ${(props) => props.margin};  
`;

export default Text;