import React from 'react';
import {
  FaHome,
  FaSignInAlt,
  FaUserAlt,
  FaSignOutAlt,
  FaCircle,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from '../../store/modules/auth/actions';
import history from '../../services/history';
import { Nav } from './styled';

export default function Header() {
  const dispatch = useDispatch();

  // Pegamos o estado de login do Redux
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(actions.loginFailure());
    history.push('/');
  };

  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} title="Home" />
      </Link>

      <Link to="/register">
        <FaUserAlt size={24} title="Editar Perfil / Registrar" />
      </Link>

      {/* Se estiver logado, mostra o botão de Sair. Se não, mostra o Login */}
      {isLoggedIn ? (
        <Link onClick={handleLogout} to="/logout" title="Sair">
          <FaSignOutAlt size={24} color="#ff4444" />
        </Link>
      ) : (
        <Link to="/login" title="Entrar">
          <FaSignInAlt size={24} />
        </Link>
      )}

      {/* Indicador visual de conexão (opcional, fica muito profissional) */}
      {isLoggedIn && (
        <FaCircle size={12} color="#66ff33" style={{ marginLeft: '-10px' }} />
      )}
    </Nav>
  );
}
