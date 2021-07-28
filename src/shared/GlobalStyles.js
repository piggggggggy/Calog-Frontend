import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset};

    *{
        box-sizing: border-box;
        max-width: 420px;

    }

`;

export default GlobalStyles;