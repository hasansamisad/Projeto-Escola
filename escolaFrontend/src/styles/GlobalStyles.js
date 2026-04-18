import styled, { createGlobalStyle } from 'styled-components';
import * as colors from '../config/colors';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    background: ${colors.primaryDarkColor};
    color: #333; /* Texto principal mais escuro para áreas claras */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html, body, #root {
    height: 100%;
  }

  button {
    cursor: pointer;
    background: ${colors.primaryColor};
    border: none;
    color: #fff;
    padding: 10px 20px;
    border-radius: 4px;
    font-weight: 600;
    letter-spacing: 0.5px;
    transition: all 250ms ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  button:hover {
    filter: brightness(90%);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  button:active {
    transform: scale(0.98);
  }

  a {
    text-decoration: none;
    color: ${colors.primaryColor};
    font-weight: 500;
  }

  ul {
    list-style: none;
  }

  /* Customização profissional do Toastify */
  .Toastify__toast {
    border-radius: 8px !important;
    font-weight: 500 !important;
  }
`;

// Container principal centralizado e responsivo
export const Container = styled.section`
  max-width: 480px;
  background: #fff;
  margin: 80px auto;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);

  h1 {
    font-size: 24px;
    text-align: center;
    margin-bottom: 25px;
    color: ${colors.primaryDarkColor};
  }
`;
