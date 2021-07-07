/* eslint-disable import/no-duplicates */
/* eslint-disable camelcase */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { FiArrowLeft } from 'react-icons/fi';
import { DateUtils } from 'react-day-picker';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/button';

import 'react-day-picker/lib/style.css';
import { AulasContainer, FormContainer, BackButton } from './styles';

import getValidationErrors from '../../utils/getValidationErrors';

interface Aula {
  id: string;
  nome: string;
  modulo: string;
  dataAula: Date;
  created_at: Date;
  updated_at: Date;
}

interface Modulo {
  id: string;
  nome: string;
}

interface IParams {
  id: string;
}

interface AulaFormData {
  nome: string;
  modulo: string;
  dataAula: Date;
}

const AulaEdit: React.FC = () => {
  const [newName, setNewName] = useState('');
  const [newModulo, setNewModulo] = useState('');

  const { id } = useParams<IParams>();

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [aula, setAula] = useState<Aula | null>(null);
  const [modulos, setModulos] = useState<Modulo[]>([]);

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const USER_TOKEN = localStorage.getItem('@ProvaPratica:token');
  const AuthStr = 'Bearer '.concat(USER_TOKEN || '');
  const FORMAT = 'dd/MM/yyyy';

  const history = useHistory();
  useEffect(() => {
    api
      .get(`/aulas/aula/${id}`, {
        headers: { Authorization: AuthStr },
      })
      .then((response) => {
        setNewName(response.data.nome);
        setNewModulo(response.data.modulo);
        setAula(response.data);
      });
    api
      .get('/modulos', { headers: { Authorization: AuthStr } })
      .then((response) => {
        setModulos(response.data);
      });
  }, []);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function parseDate(str: string, format: string, locale: any) {
    const parsed = dateFnsParse(str, format, new Date(), { locale });
    if (DateUtils.isDate(parsed)) {
      return parsed;
    }
    return undefined;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function formatDate(date: number | Date, format: string, locale: any) {
    return dateFnsFormat(date, format, { locale });
  }

  const handleSubmit = useCallback(
    async (data: AulaFormData) => {
      // eslint-disable-next-line no-param-reassign
      data.dataAula = selectedDate;
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          nome: Yup.string().required('Nome obrigatório'),
          modulo: Yup.string().required('Módulo obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const response = await api.put<Aula>(`/aulas/update/${id}`, data, {
          headers: { Authorization: AuthStr },
        });

        const findAula = response.data;

        addToast({
          type: 'success',
          title: 'Aula atualizada!',
        });

        setAula(findAula);
        setNewName('');
        setNewModulo('');
        history.push('/dashboard/aulas');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao atualizar a Aula',
          description:
            'Ocorreu um erro ao tentar atualizar a Aula, tente novamente.',
        });
      }
    },
    [addToast, aula, selectedDate],
  );

  return (
    <>
      <Header />
      <BackButton>
        <Link to="/dashboard/aulas">
          <FiArrowLeft size={40} />
          <span>voltar</span>
        </Link>
      </BackButton>
      <FormContainer>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Atualizar Aula </h1>

          <strong className="nameModulo">Nome</strong>
          <Input
            name="nome"
            placeholder="Nome da aula..."
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />

          <strong className="nameModulo">Módulo</strong>
          <Input
            name="modulo"
            list="modulos"
            placeholder="Módulo da aula..."
            value={newModulo}
            onChange={(e) => setNewModulo(e.target.value)}
          />

          <datalist id="modulos">
            {modulos.map((modulo) => (
              <option key={modulo.id} value={modulo.id}>
                {modulo.nome}
              </option>
            ))}
          </datalist>

          <div className="StyledDayPickerInput">
            <strong className="nameModulo">Data: </strong>
            <DayPickerInput
              formatDate={formatDate}
              format={FORMAT}
              parseDate={parseDate}
              value={selectedDate}
              onDayChange={(e) => setSelectedDate(e)}
            />
          </div>

          <Button type="submit">Atualizar</Button>
        </Form>
      </FormContainer>

      {modulos.length === 0 && (
        <AulasContainer>
          <div>
            <strong className="nameModulo">
              Obs: Você não tem nenhum Módulo cadastrado!
            </strong>
            <p id="empity">Para atualizar é necessário um Módulo.</p>
          </div>
        </AulasContainer>
      )}
    </>
  );
};

export default AulaEdit;
