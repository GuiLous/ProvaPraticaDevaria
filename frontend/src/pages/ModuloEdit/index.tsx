/* eslint-disable camelcase */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/button';

import { FormContainer, BackButton } from './styles';

import getValidationErrors from '../../utils/getValidationErrors';

interface Modulo {
  id: string;
  nome: string;
  created_at: Date;
  updated_at: Date;
}

interface ModuloFormData {
  nome: string;
}

interface IParams {
  id: string;
}

const ModuloEdit: React.FC = () => {
  const [newName, setNewName] = useState('');
  const [modulo, setModulo] = useState<Modulo | null>(null);

  const { id } = useParams<IParams>();

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const USER_TOKEN = localStorage.getItem('@ProvaPratica:token');
  const AuthStr = 'Bearer '.concat(USER_TOKEN || '');

  const history = useHistory();
  useEffect(() => {
    api
      .get(`/modulos/modulo/${id}`, {
        headers: { Authorization: AuthStr },
      })
      .then((response) => {
        setNewName(response.data.nome);
        setModulo(response.data);
      });
  }, []);

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

        const response = await api.put<Modulo>(`/modulos/update/${id}`, data, {
          headers: { Authorization: AuthStr },
        });

        const findModulo = response.data;

        addToast({
          type: 'success',
          title: 'Modulo atualizado com sucesso!',
        });

        setModulo(findModulo);
        setNewName('');
        history.push('/dashboard/modulos');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na atualização do Módulo',
          description:
            'Ocorreu um erro ao tentar atualizar os dados do Módulo, tente novamente.',
        });
      }
    },
    [addToast, modulo],
  );

  return (
    <>
      <Header />
      <BackButton>
        <Link to="/dashboard/modulos">
          <FiArrowLeft size={40} />
          <span>voltar</span>
        </Link>
      </BackButton>
      <FormContainer>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Atualizar Módulo</h1>

          <strong className="nameModulo">Nome</strong>
          <Input
            name="nome"
            placeholder="Nome do módulo"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />

          <Button type="submit">Atualizar</Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ModuloEdit;
