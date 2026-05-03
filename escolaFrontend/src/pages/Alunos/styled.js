import styled from 'styled-components';
import {Link} from 'react-router-dom';
import * as colors from '../../config/colors';

export const AlunoContainer = styled.div`
  margin-top: 20px;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
    transition: all 300ms;
  }

  div:hover {
    background: rgba(0, 0, 0, 0.02);
  }

  .profile-picture {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover; /* Garante que a foto não fique esticada */
      border: 2px solid ${colors.primaryColor};
    }

    svg {
      width: 40px;
      height: 40px;
      color: ${colors.primaryColor};
    }
  }

  span {
    flex: 1;
    margin-left: 15px;
    font-size: 16px;
    color: #333;
    font-weight: 500;
  }

  .email {
    color: #666;
    font-size: 14px;
    font-weight: normal;
  }

  /* Estilização para os ícones de ação (Editar/Excluir) */
  a {
    margin-left: 15px;
    color: ${colors.primaryColor};
    transition: all 300ms;

    &:hover {
      filter: brightness(70%);
      transform: scale(1.1);
    }
  }

  .delete-icon {
    color: #e74c3c; /* Vermelho para exclusão */
  }
`;

export const NovoAluno = styled(Link)`
  display: block;
  padding: 10px 0 20px 0;
`;
