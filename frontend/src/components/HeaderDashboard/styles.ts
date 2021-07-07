import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
  padding: 20px 0;

  background: rgb(28, 12, 63);
  border-bottom: 1px solid rgb(67, 51, 118);
`;

export const StyledLink = styled(Link)`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;

  margin-left: 48px;

  h1 {
    font-size: 26px;
    font-weight: 600;
    color: #fff;
    max-width: 150px;
    align-self: center;
  }
`;

export const LogoutContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 70px;

  color: #c53030;

  border: 1px solid #c53030;
  border-radius: 10px;

  height: 40px;
  padding: 18px;
  background-color: #fff;
  transition: color, background-color 0.2s;
  &:hover {
    color: #fff;
    background-color: #c53030;
  }

  p {
    font-size: 22px;
    font-weight: 600;
    align-self: center;
  }
`;
