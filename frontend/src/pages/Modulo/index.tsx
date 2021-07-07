/* eslint-disable camelcase */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { Link } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiXCircle, FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

import HeaderDashboard from '../../components/HeaderDashboard';
import Input from '../../components/Input';
import Button from '../../components/button';

import { ModulosContainer, FormContainer, BackButton } from './styles';

import getValidationErrors from '../../utils/getValidationErrors';

interface Modulo {
  id: string;
  nome: string;
  qntAulas: number;
  created_at: Date;
  updated_at: Date;
}

interface ModuloFormData {
  nome: string;
}

const Modulo: React.FC = () => {
  const [newName, setNewName] = useState('');
  const [modulos, setModulos] = useState<Modulo[]>([]);

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const USER_TOKEN = localStorage.getItem('@ProvaPratica:token');
  const AuthStr = 'Bearer '.concat(USER_TOKEN || '');

  useEffect(() => {
    api
      .get('/modulos', { headers: { Authorization: AuthStr } })
      .then((response) => {
        setModulos(response.data);
      });
  }, []);

  const removeModulo = useCallback(
    async (id: string) => {
      try {
        await api.delete(`/modulos/delete/${id}`, {
          headers: { Authorization: AuthStr },
        });

        console.log(id);
        const findModulo = modulos.findIndex((modulo) => modulo.id === id);

        const listModulos = [...modulos];

        listModulos.splice(findModulo, 1);

        setModulos(listModulos);

        addToast({
          type: 'success',
          title: 'Módulo Excluido!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao excluir Módulo',
          description:
            'Ocorreu um erro ao tentar excluir o Módulo, tente novamente.',
        });
      }
    },
    [addToast, modulos],
  );

  const handleSubmit = useCallback(
    async (data: ModuloFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          nome: Yup.string().required('Nome obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const response = await api.post<Modulo>('/modulos', data, {
          headers: { Authorization: AuthStr },
        });

        addToast({
          type: 'success',
          title: 'Módulo criado!',
        });

        setModulos([...modulos, response.data]);
        setNewName('');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na criação do Módulo',
          description:
            'Ocorreu um erro ao tentar criar o Módulo, tente novamente.',
        });
      }
    },
    [addToast, modulos],
  );

  return (
    <>
      <HeaderDashboard />
      <BackButton>
        <Link to="/dashboard">
          <FiArrowLeft size={40} />
          <span>voltar</span>
        </Link>
      </BackButton>
      <FormContainer>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Criar Módulo</h1>

          <strong className="nameModulo">Nome</strong>
          <Input
            name="nome"
            placeholder="Digite o nome do módulo..."
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />

          <Button type="submit">Criar</Button>
        </Form>
      </FormContainer>

      {modulos.length === 0 && (
        <ModulosContainer>
          <div>
            <strong className="nameModulo">Opps!</strong>
            <p id="empity">Nenhuma Módulo foi encontrado.</p>
          </div>
        </ModulosContainer>
      )}

      {modulos.map((modulo) => (
        <ModulosContainer key={modulo.id}>
          <div>
            <strong className="nameModulo">{modulo.nome}</strong>
            <div>
              <p>
                <strong>ID:</strong> {modulo.id}
              </p>
              <p>
                <strong>Criado em:</strong> {modulo.created_at}
              </p>
              <p>
                <strong>Atualizado em:</strong> {modulo.updated_at}
              </p>
              <div className="buttonContainer">
                <Link to={`/dashboard/modulo/update/${modulo.id}`}>
                  <button className="editorButton" type="button">
                    Editar
                  </button>
                </Link>
              </div>
            </div>

            <button
              id="remove"
              type="button"
              onClick={() => removeModulo(modulo.id)}
            >
              excluir
              <FiXCircle size={30} />
            </button>
          </div>
        </ModulosContainer>
      ))}
    </>
  );
};

export default Modulo;
