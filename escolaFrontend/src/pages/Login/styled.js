import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    font-weight: 700;
    color: #444;
  }

  input {
    height: 40px;
    font-size: 18px;
    border: 1px solid #ddd;
    padding: 0 15px;
    border-radius: 4px;
    margin-top: 7px;
    transition: all 300ms;
    background: #fff;

    &:focus {
      border: 1px solid ${colors.primaryColor};
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
      outline: none;
    }

    &::placeholder {
      color: #aaa;
      font-size: 16px;
    }
  }

  button {
    cursor: pointer;
    background: ${colors.primaryColor};
    border: none;
    color: #fff;
    padding: 12px 20px;
    border-radius: 4px;
    font-weight: 700;
    font-size: 16px;
    transition: all 300ms;
    margin-top: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:hover {
      filter: brightness(90%);
      transform: translateY(-1px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
    }

    &:active {
      transform: translateY(0);
    }
  }
`;
