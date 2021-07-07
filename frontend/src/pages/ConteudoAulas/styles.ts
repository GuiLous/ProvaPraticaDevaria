import styled from 'styled-components';

export const AulasContainer = styled.div`
  margin-top: 30px;
  max-width: 1255px;
  width: 1255px;
  align-self: center;

  align-items: center;
  position: relative;

  div#content {
    display: flex;
    flex-direction: row;

    margin-left: 30px;

    align-items: center;

    div#infoAula {
      h5 {
        text-align: left;
        /* max-width: 200px; */
        margin-left: 12px;
        font-size: 38px;
        font-weight: 600;
        font-family: 'Biennale Regular';
        color: rgb(240, 245, 255);
      }

      p {
        text-align: left;
        color: rgb(161, 145, 255);
        font-weight: 600;
        font-size: 18px;
        margin-left: 12px;
      }
    }
  }

  div#contentAulas {
    display: flex;
    flex-wrap: wrap;

    margin-left: 90px;
    margin-top: 80px;

    gap: 30px;

    div#aulas {
      display: flex;
      flex-direction: column;
      -webkit-box-pack: justify;
      justify-content: space-between;
      background-color: rgb(36, 18, 75);
      border-radius: 32px;
      border: 1px solid rgb(94, 73, 255);
      padding: 28px;
      margin: 0px;
      width: 328px;
      min-height: 172px;

      align-items: center;

      transition: border 0.2s;
      &:hover {
        border: 1px solid rgb(59, 212, 45);
      }
      h1 {
        font-size: 26px;
        color: rgb(59, 212, 45);
        margin: 10px 0px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        max-height: 80px;
      }
    }
  }
`;

export const ModulosContainer = styled.div`
  margin-top: 100px;
  max-width: 1255px;
  width: 1255px;
  align-self: center;

  align-items: center;
  position: relative;

  > h1 {
    margin-left: auto;
    font-size: 32px;
    font-weight: 600;
    margin-top: 24px;
    margin-left: 10px;
    font-family: 'Biennale Regular';
    color: rgb(240, 245, 255);
  }

  > p {
    font-size: 18px;
    margin: 8px 10px 40px;
    color: rgb(161, 145, 255);
  }

  button.editorButton {
    min-width: 300px;
    max-width: 400px;
    width: 30%;

    background: rgb(36, 18, 75);
    position: relative;

    padding: 14px 18px;
    border: 1px solid rgb(67, 51, 118);
    border-radius: 10px;
    top: 0;

    margin-bottom: 18px;
    margin-right: 10px;
    margin-left: 10px;

    transition: border 0.2s;
    &:hover {
      border: 1px solid rgb(59, 212, 45);
    }

    div.imgh5p {
      display: flex;
      flex-direction: row;

      align-items: center;

      div.info {
        h5 {
          text-align: left;
          max-width: 300px;
          margin-left: 12px;
          font-size: 18px;
          font-weight: 700;
          color: rgb(59, 212, 45);
        }

        p {
          text-align: left;
          color: rgb(161, 145, 255);
          font-weight: 600;
          font-size: 18px;
          margin-left: 12px;
        }
      }
    }
  }
`;
