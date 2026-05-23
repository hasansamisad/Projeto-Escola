import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import {
  FaUserCircle,
  FaEdit,
  FaWindowClose,
  FaExclamation,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Container } from '../../styles/GlobalStyles';
import { AlunoContainer, NovoAluno } from './styled';
import axios from '../../services/axios';
import Loading from '../../components/Loading/index';

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await axios.get('/alunos');
        setAlunos(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching aluno data:', error);
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleDeleteAsk = (e) => {
    e.preventDefault();
    const buttonClose = e.currentTarget;
    const exclamation = buttonClose.nextSibling;

    if (exclamation) {
      exclamation.style.display = 'inline-block';
    }
    buttonClose.style.display = 'none';
  };

  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
      await axios.delete(`/alunos/${id}`);

      setAlunos(alunos.filter((aluno) => aluno.id !== id));

      toast.success('Aluno excluído com sucesso!');
      setIsLoading(false);
    } catch (err) {
      const status = get(err, 'response.data.status', 0);

      if (status === 401) {
        toast.error('Você precisa fazer login');
      } else {
        toast.error('Ocorreu um erro ao excluir aluno');
      }
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>Alunos</h1>

      <NovoAluno to="/aluno">Novo Aluno</NovoAluno>

      <AlunoContainer>
        {alunos.map((aluno) => (
          <div key={String(aluno.id)}>
            <div className="profile-picture">
              {get(aluno, 'Photos[0].url', false) ? (
                <img src={aluno.Photos[0].url} alt={aluno.nome} />
              ) : (
                <FaUserCircle size={36} />
              )}
            </div>

            <span>{aluno.nome}</span>
            <span>{aluno.email}</span>

            <Link to={`/aluno/${aluno.id}/edit`}>
              <FaEdit size={16} />
            </Link>

            <span
              onClick={handleDeleteAsk}
              style={{
                cursor: 'pointer',
                display: 'inline-block',
                marginRight: '10px',
              }}
            >
              <FaWindowClose size={16} color="#ef4444" />
            </span>

            <FaExclamation
              size={16}
              style={{ display: 'none', cursor: 'pointer' }}
              color="#eab308"
              onClick={() => handleDelete(aluno.id)}
            />
          </div>
        ))}
      </AlunoContainer>
    </Container>
  );
}
