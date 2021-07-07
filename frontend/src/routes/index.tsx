import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';

import Dashboard from '../pages/Dashboard';
import ConteudoAulas from '../pages/ConteudoAulas';
import Modulo from '../pages/Modulo';
import ModuloEdit from '../pages/ModuloEdit';
import Aula from '../pages/Aula';
import AulaEdit from '../pages/AulaEdit';
import User from '../pages/User';
import UserEdit from '../pages/UserEdit';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/conteudo-aulas" exact component={ConteudoAulas} />
    <Route path="/dashboard" exact component={Dashboard} isPrivate />

    <Route path="/dashboard/modulos" exact component={Modulo} isPrivate />
    <Route
      path="/dashboard/modulo/update/:id"
      exact
      component={ModuloEdit}
      isPrivate
    />

    <Route path="/dashboard/aulas" exact component={Aula} isPrivate />
    <Route
      path="/dashboard/aula/update/:id"
      exact
      component={AulaEdit}
      isPrivate
    />

    <Route path="/dashboard/users" exact component={User} isPrivate />
    <Route
      path="/dashboard/user/update/:id"
      exact
      component={UserEdit}
      isPrivate
    />
  </Switch>
);
export default Routes;
