/* eslint-disable camelcase */
import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import iconModuloImg from '../../assets/modulo.svg';
import iconAulaImg from '../../assets/aula.svg';
import iconUserImg from '../../assets/manage_accounts-black-18dp.svg';

import HeaderDashboard from '../../components/HeaderDashboard';

import { Container } from './styles';

const Dashboard: React.FC = () => {
  return (
    <>
      <HeaderDashboard />

      <Container>
        <Link to="/dashboard/modulos">
          <img src={iconModuloImg} alt="room icon" />
          <div>
            <strong>MODULOS</strong>
            <p>Entre para ver, criar, excluir ou editar</p>
          </div>

          <FiChevronRight size={20} />
        </Link>

        <Link to="/dashboard/aulas">
          <img src={iconAulaImg} alt="aulas icon" />
          <div>
            <strong>AULAS</strong>
            <p>Entre para ver, criar, excluir ou editar</p>
          </div>

          <FiChevronRight size={20} />
        </Link>

        <Link to="/dashboard/users">
          <img src={iconUserImg} alt="users icon" />
          <div>
            <strong>USUÁRIOS</strong>
            <p>Entre para ver, criar, excluir ou editar</p>
          </div>

          <FiChevronRight size={20} />
        </Link>
      </Container>
    </>
  );
};

export default Dashboard;
