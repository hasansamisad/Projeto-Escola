import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: column;

  input {
    height: 40px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 0 10px;
    font-size: 16px;

    &:focus {
      border: 1px solid ${colors.primaryColor};
    }
  }

  button {
    margin-top: 10px;
  }
`;

export const ProfilePicture = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0 20px;
  position: relative;
  cursor: pointer; /* Muda o mouse para a mãozinha */
  width: 180px; /* Define o tamanho do container */
  height: 180px;
  margin: 0 auto 20px; /* Centraliza na tela */
  border-radius: 50%;
  overflow: hidden; /* Garante que a imagem fique redonda */
  background: #eee; /* Cor de fundo caso não tenha foto */
  border: 5px dashed transparent; /* Borda invisível por padrão */
  transition: all 300ms;

  &:hover {
    border: 5px dashed ${colors.primaryColor}; /* Borda aparece no hover */
  }

  img {
    width: 180px;
    height: 180px;
    object-fit: cover; /* Faz a imagem cobrir o círculo sem distorcer */
  }

  /* Opcional: Se quiser um efeito de brilho no hover sobre a imagem */
  &:hover img {
    filter: brightness(110%);
  }

  input {
    display: none; /* Esconde o input de arquivo original */
  }
`;
