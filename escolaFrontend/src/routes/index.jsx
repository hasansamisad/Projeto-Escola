import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MyRoute from './MyRoute';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Aluno from '../pages/Aluno';
import Alunos from '../pages/Alunos';
import Fotos from '../pages/Fotos';
import Page404 from '../pages/Page404/index';

export default function AppRoutes() {
  return (
    <Routes>
      {/* ROTAS ABERTAS */}
      <Route element={<MyRoute isClosed={false} />}>
        <Route path="/" element={<Alunos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/*  ROTAS FECHADAS */}
      <Route element={<MyRoute isClosed />}>
        <Route path="/aluno/:id/edit" element={<Aluno />} />
        <Route path="/aluno" element={<Aluno />} />
        <Route path="/fotos/:id" element={<Fotos />} />
      </Route>

      {/* 🔍 ROTA 404 (Caso não encontre nenhuma URL acima) */}
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
