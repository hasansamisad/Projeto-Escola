import styled from 'styled-components';
import { primaryColor, primaryDarkColor } from '../../config/colors';

export const Nav = styled.nav`
  background: ${primaryColor};
  padding: 0 30px;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  position: sticky;
  top: 0;
  z-index: 1000;

  a {
    color: #fff;
    margin: 0 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 300ms ease-in-out;
    position: relative;

    &:hover {
      transform: translateY(-2px);
      filter: brightness(80%);
    }

    /* Pequena linha embaixo do ícone ao passar o mouse */
    &::after {
      content: '';
      width: 0;
      height: 2px;
      background: #fff;
      position: absolute;
      bottom: -8px;
      transition: width 0.3s;
    }

    &:hover::after {
      width: 100%;
    }
  }

  /* Estilização específica para o indicador de status online */
  svg:last-child {
    filter: drop-shadow(0 0 4px #66ff33);
    margin-left: -5px;
    border: 2px solid ${primaryColor};
    border-radius: 50%;
  }
`;
