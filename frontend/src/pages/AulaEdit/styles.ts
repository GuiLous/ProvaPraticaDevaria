import styled from 'styled-components';
import { shade } from 'polished';

export const BackButton = styled.div`
  display: flex;
  justify-content: initial;
  align-self: center;

  margin-top: 80px;
  margin-bottom: 5px;

  width: 100%;
  max-width: 700px;

  a {
    text-decoration: none;
    display: flex;
    align-items: center;

    color: #fff;
    transition: color 0.2s;

    svg {
      margin-right: 5px;
    }

    &:hover {
      color: #666;
    }
  }
`;

export const RepositoryInfo = styled.section`
  margin-top: 80px;

  header {
    display: flex;
    align-items: center;

    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
    }

    div {
      margin-left: 24px;

      strong {
        font-size: 36px;
        color: #3d3d4d;
      }

      p {
        font-size: 18px;
        color: #737380;
        margin-top: 4px;
      }
    }
  }

  ul {
    display: flex;
    list-style: none;
    margin-top: 40px;

    li {
      & + li {
        margin-left: 80px;
      }

      strong {
        display: block;
        font-size: 36px;
        color: #3d3d4d;
      }

      span {
        display: block;
        margin-top: 4px;
        color: #6c6c80;
      }
    }
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-self: center;

  border-radius: 5px;

  background: #f7f7f5;

  width: 100%;
  max-width: 700px;
  padding: 24px;

  form {
    max-width: 340px;
    text-align: center;
    color: #3d3d4d;
  }

  h1 {
    text-align: center;
    margin-bottom: 24px;
    color: #3d3d4d;
  }
`;

export const AulasContainer = styled.div`
  margin-top: 80px;
  width: -webkit-fill-available;
  max-width: 700px;
  align-self: center;

  background: #fff;
  border-radius: 5px;
  width: 100%;
  padding: 24px;
  text-decoration: none;

  align-items: center;
  transition: transform 0.2s;

  &:hover {
    transform: translateX(10px);
  }

  & + & {
    margin-top: 16px;
  }

  position: relative;

  div {
    margin: 0 16px;

    strong.nameModulo {
      display: block;
      width: 100%;

      margin-bottom: 10px;
      border-bottom: 1px solid #cbcbd6;

      text-align: center;
      font-size: 24px;
      color: #3d3d4d;
    }

    p {
      font-size: 18px;
      color: #a8a8b3;
      margin-top: 4px;

      strong {
        color: #3d3d4d;
        margin-right: 6px;
      }
    }

    p#empity {
      text-align: center;
    }

    div.buttonContainer {
      text-align: center;
      margin-top: 10px;
      border-top: 1px solid #cbcbd6;
      padding: 18px;
      padding-bottom: 0px;
      width: 100%;
      margin-left: 0px;

      button.editorButton {
        background: #465a6c;
        position: relative;

        color: #fff;

        padding: 5px;
        border-radius: 5px;
        top: 0;

        margin-right: 10px;
        margin-left: 10px;

        transition: background 0.2s;
        &:hover {
          background: ${shade(0.4, '#465a6c')};
        }
      }
    }
  }
`;
