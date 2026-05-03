import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    font-weight: 700;
  }

  input {
    height: 40px;
    font-size: 18px;
    border: 1px solid #ddd;
    padding: 0 10px;
    border-radius: 4px;
    margin-top: 5px;
    transition: all 300ms;

    &:focus {
      border: 1px solid ${colors.primaryColor};
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    }

    &::placeholder {
      color: #999;
      font-size: 16px;
    }
  }

  button {
    cursor: pointer;
    background: ${colors.primaryColor};
    border: none;
    color: #fff;
    padding: 10px 20px;
    border-radius: 4px;
    font-weight: 700;
    transition: all 300ms;
    margin-top: 10px;

    &:hover {
      filter: brightness(85%);
    }
  }
`;
