import React from 'react';
import { Switch } from 'react-router-dom';

import MyRoute from './MyRoute';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Aluno from '../pages/Aluno';
import Alunos from '../pages/Alunos';
import Fotos from '../pages/Fotos';
import Page404 from '../pages/Page404/index';

export default function Routes() {
  return (
    <Switch>
      {/* Rota raiz fechada (ex: um Dashboard) */}
      <MyRoute path="/" exact component={Alunos} isClosed={false} />
      <MyRoute path="/login" component={Login} isClosed={false} />
      <MyRoute path="/register" component={Register} isClosed={false} />
      <MyRoute path="/aluno/:id/edit" component={Aluno} isClosed={true} />
      <MyRoute path="/aluno" component={Aluno} isClosed={true} />
      <MyRoute path="/fotos/:id" component={Fotos} isClosed={true} />
      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
