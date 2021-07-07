/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import React from 'react';

import {
  Container,
  LogoContainer,
  StyledLink,
  LogoutContainer,
} from './styles';

const Header: React.FC = () => {
  return (
    <>
      <Container>
        <StyledLink to="/conteudo-aulas">
          <LogoContainer>
            <h1>Modulos e Aulas</h1>
          </LogoContainer>
        </StyledLink>

        <StyledLink to="/">
          <LogoutContainer>
            <p>Login ADM</p>
          </LogoutContainer>
        </StyledLink>
      </Container>
    </>
  );
};

export default Header;
