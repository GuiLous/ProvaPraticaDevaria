/* eslint-disable camelcase */
import React, { useEffect, useState, useCallback } from 'react';
import { appendFile } from 'fs';
import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import Header from '../../components/Header';

import iconClas from '../../assets/icon_class.svg';

import { ModulosContainer, AulasContainer } from './styles';

interface Modulo {
  id: string;
  nome: string;
  qntAulas: string;
  created_at: Date;
  updated_at: Date;
}

interface Aula {
  id: string;
  nome: string;
  dataAula: Date;
}

const ConteudoAulas: React.FC = () => {
  const [modulos, setModulos] = useState<Modulo[]>([]);
  const [aulas, setAulas] = useState<Aula[]>([]);
  const [moduloName, setModuloName] = useState<string>();

  const USER_TOKEN = localStorage.getItem('@GoBarber:token');
  const AuthStr = 'Bearer '.concat(USER_TOKEN || '');

  const { addToast } = useToast();

  useEffect(() => {
    api
      .get('/modulos', { headers: { Authorization: AuthStr } })
      .then((response) => {
        setModulos(response.data);
      });
  }, []);

  const handleShowAulas = useCallback(
    async (id: string) => {
      try {
        const response = await api.get(`/aulas/aulasModulo/${id}`, {
          headers: { Authorization: AuthStr },
        });

        setAulas(response.data);

        const responseModulo = await api.get(`/modulos/modulo/${id}`);
        setModuloName(responseModulo.data.nome);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao exibir aulas',
          description:
            'Ocorreu um erro ao tentar exibir as aulas, tente novamente.',
        });
      }
    },
    [addToast, aulas],
  );

  return (
    <>
      <Header />

      <ModulosContainer>
        <h1>Módulos</h1>
        <p>Selecione o módulo para ver as aulas disponíveis:</p>
        {modulos.map((modulo) => (
          <button
            key={modulo.id}
            className="editorButton"
            type="button"
            onClick={() => handleShowAulas(modulo.id)}
          >
            <div className="imgh5p">
              <img src={iconClas} alt="icone modulo" />
              <div className="info">
                <h5>{modulo.nome}</h5>
                <p>{modulo.qntAulas} aulas</p>
              </div>
            </div>
          </button>
        ))}
      </ModulosContainer>

      {aulas.length !== 0 && (
        <AulasContainer>
          <>
            <div id="content">
              <img src={iconClas} width={80} alt="icone aula" />
              <div id="infoAula">
                <h5>{moduloName}</h5>
                <p>Todas as aulas disponíveis nesse módulo:</p>
              </div>
            </div>
            <div id="contentAulas">
              {aulas.map((aula) => (
                <div id="aulas">
                  <h1>{aula.nome}</h1>
                  <p>{aula.dataAula}</p>
                </div>
              ))}
            </div>
          </>
        </AulasContainer>
      )}
    </>
  );
};

export default ConteudoAulas;
