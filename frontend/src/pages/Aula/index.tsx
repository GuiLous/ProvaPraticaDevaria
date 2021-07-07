/* eslint-disable import/no-duplicates */
/* eslint-disable camelcase */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiArrowLeft, FiXCircle } from 'react-icons/fi';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

import Input from '../../components/Input';
import Button from '../../components/button';
import HeaderDashboard from '../../components/HeaderDashboard';

import 'react-day-picker/lib/style.css';

import { ModulosContainer, FormContainer, BackButton } from './styles';

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

interface AulaFormData {
  nome: string;
  modulo: string;
  dataAula: Date;
}

const Aula: React.FC = () => {
  const [newName, setNewName] = useState('');
  const [newModulo, setNewModulo] = useState('');
  const [moduloId, setModuloId] = useState('');

  const [selectedDate, setSelecetedDate] = useState(new Date());

  const [aulas, setAulas] = useState<Aula[]>([]);
  const [modulos, setModulos] = useState<Modulo[]>([]);

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const USER_TOKEN = localStorage.getItem('@ProvaPratica:token');
  const AuthStr = 'Bearer '.concat(USER_TOKEN || '');
  const FORMAT = 'dd/MM/yyyy';

  useEffect(() => {
    api
      .get('/aulas', { headers: { Authorization: AuthStr } })
      .then((response) => {
        setAulas(response.data);
      });
    api
      .get('/modulos', { headers: { Authorization: AuthStr } })
      .then((response) => {
        setModulos(response.data);
      });
  }, [moduloId, selectedDate]);

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

  const removeAula = useCallback(
    async (id: string) => {
      try {
        await api.delete(`/aulas/delete/${id}`, {
          headers: { Authorization: AuthStr },
        });

        const findAula = aulas.findIndex((aula) => aula.id === id);

        const listAulas = [...aulas];

        listAulas.splice(findAula, 1);

        setAulas(listAulas);

        addToast({
          type: 'success',
          title: 'Aula Excluida!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao exlcuir aula',
          description:
            'Ocorreu um erro ao tentar excluir a aula, tente novamente.',
        });
      }
    },
    [addToast, aulas],
  );

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

        const response = await api.post<Aula>('/aulas', data, {
          headers: { Authorization: AuthStr },
        });

        const aula = response.data;

        addToast({
          type: 'success',
          title: 'Aula criada!',
        });

        setAulas([...aulas, aula]);
        setNewName('');
        setNewModulo('');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na criação da Aula',
          description:
            'Ocorreu um erro ao tentar criar a Aula, tente novamente.',
        });
      }
    },
    [addToast, aulas],
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
          <h1>Criar Aula</h1>

          <strong className="nameModulo">Nome</strong>
          <Input
            name="nome"
            placeholder="Nome da aula.."
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />

          <strong className="nameModulo">Módulo</strong>
          <Input
            name="modulo"
            list="modulos"
            placeholder="Módulo da aula..."
            value={moduloId}
            onChange={(e) => setModuloId(e.target.value)}
          />

          <div className="StyledDayPickerInput">
            <strong className="nameModulo">Data: </strong>
            <DayPickerInput
              formatDate={formatDate}
              format={FORMAT}
              parseDate={parseDate}
              placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
              value={selectedDate}
              onDayChange={(e) => setSelecetedDate(e)}
            />
          </div>

          <datalist id="modulos">
            {modulos.map((modulo) => (
              <option key={modulo.id} value={modulo.id}>
                {modulo.nome}
              </option>
            ))}
          </datalist>

          <Button type="submit">Criar</Button>
        </Form>
      </FormContainer>

      {aulas.length === 0 && (
        <ModulosContainer>
          <div>
            <strong className="nameModulo">Opps!</strong>
            <p id="empity">Nenhuma Aula foi encontrada.</p>
          </div>
        </ModulosContainer>
      )}

      {modulos.length === 0 && (
        <ModulosContainer>
          <div>
            <strong className="nameModulo">
              Obs: Você não tem nenhum Módulo criado!
            </strong>
            <p id="empity">
              Para adicionar novas Aulas é necessário um Módulo.
            </p>
          </div>
        </ModulosContainer>
      )}

      {aulas.map((aula) => (
        <ModulosContainer key={aula.id}>
          <div>
            <strong className="nameModulo">{aula.nome}</strong>
            <div>
              <p>
                <strong>ID:</strong> {aula.id}
              </p>
              <p>
                <strong>Módulo:</strong> {aula.modulo}
              </p>
              <p>
                <strong>Data da Aula:</strong> {aula.dataAula}
              </p>
              <p>
                <strong>Criado em:</strong> {aula.created_at}
              </p>
              <p>
                <strong>Atualizado em:</strong> {aula.updated_at}
              </p>
              <div className="buttonContainer">
                <Link to={`/dashboard/aula/update/${aula.id}`}>
                  <button className="editorButton" type="button">
                    Editar
                  </button>
                </Link>
              </div>
            </div>

            <button
              id="remove"
              type="button"
              onClick={() => removeAula(aula.id)}
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

export default Aula;
