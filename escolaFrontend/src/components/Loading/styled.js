import styled, { keyframes } from 'styled-components';
import { primaryColor } from '../../config/colors'; // Ajuste o caminho conforme seu projeto

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 30px;
  background: rgba(0, 0, 0, 0.7); /* Fundo escurecido profissional */
  backdrop-filter: blur(2px); /* Efeito de desfoque opcional */

  div.loader__spinner {
    width: 50px;
    height: 50px;
    border: 5px solid rgba(255, 255, 255, 0.2);
    border-top-color: ${primaryColor}; /* Usa a cor principal do seu projeto */
    border-radius: 50%;
    animation: ${rotate} 1s linear infinite;
  }
`;
