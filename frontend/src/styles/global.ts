import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: rgb(28, 12, 63);
    color: #fff;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Catesque Regular', serif;
    font-size: 16px;
  }

  #root {
    /* max-width: 960px; */
    margin: auto;
    padding: 40px 20px;
    margin-top: -34px;
    display: flex;
    flex-direction: column;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }
`;
