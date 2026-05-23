import React, { useState } from 'react';
import { isEmail } from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';
// 1. Importando os hooks nativos da v6/v7
import { useNavigate, useLocation } from 'react-router-dom';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import { toast } from 'react-toastify';
import * as actions from '../../store/modules/auth/actions';
import Loading from '../../components/Loading/index';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isLoading = useSelector((state) => state.auth.isLoading);

  // 2. Resgata com segurança a rota anterior guardada pelo MyRoute
  const prevPath = get(location, 'state.prevPath', '/');

  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = false;

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail inválido.');
    }
    if (!password || password.length < 6 || password.length > 50) {
      formErrors = true;
      toast.error('A senha deve conter entre 6 e 50 caracteres.');
    }

    if (formErrors) return;

    // 3. Enviamos o email, password, a rota anterior e o hook de navegação para o Saga
    dispatch(actions.loginRequest({ email, password, prevPath, navigate }));
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>Login Page</h1>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="email">
          E-mail:
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu e-mail"
          />
        </label>

        <label htmlFor="password">
          Senha:
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha"
          />
        </label>

        <button type="submit">Entrar</button>
      </Form>
    </Container>
  );
}
