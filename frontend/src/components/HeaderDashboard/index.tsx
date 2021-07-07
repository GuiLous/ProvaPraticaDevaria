/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import React from 'react';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  LogoContainer,
  StyledLink,
  LogoutContainer,
} from './styles';

const HeaderDashboard: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <>
      <Container>
        <StyledLink to="/conteudo-aulas">
          <LogoContainer>
            <h1>Módulos e Aulas</h1>
          </LogoContainer>
        </StyledLink>

        <StyledLink to="/conteudo-aulas" onClick={signOut}>
          <LogoutContainer>
            <p>sair</p>
          </LogoutContainer>
        </StyledLink>
      </Container>
    </>
  );
};

export default HeaderDashboard;
