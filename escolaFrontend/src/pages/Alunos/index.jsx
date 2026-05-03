import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import { FaUserCircle, FaEdit, FaWindowClose, FaExclamation } from 'react-icons/fa';
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

  const handleDeleteAsk = e => {
    e.preventDefault();
    /*
      e.currentTarget: É o elemento que recebeu o evento (por exemplo, o input onde você clicou ou digitou).
      .nextSibling: É uma propriedade que diz ao JavaScript: "pegue o próximo nó que estiver exatamente ao lado deste elemento no HTML".
    */
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');
    e.currentTarget.remove();

  }

  const handleDelete = async (e, id) => {
    try{
      setIsLoading(true);
      await axios.delete(`/alunos/${id}`);
      e.target.parentElement.remove();
      setIsLoading(false);
    } catch(err){
      const status = get(err, 'response.data.status', 0);

      if(status === 401){
        toast.error("Você precisa fazer login");
      }else{
        toast.error("Ocorreu um erro ao excluir aluno");
      }
      setIsLoading(false);
    }
  };

  return (
    <Container>
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

            <Link onClick={handleDeleteAsk} to={`/aluno/${aluno.id}/delete`}>
              <FaWindowClose size={16} />
            </Link>

            < FaExclamation  size={16} display = "none" cursor = "pointer" onClick={ e => handleDelete(e, aluno.id)}/>
          </div>
        ))}
      </AlunoContainer>
    </Container>
  );
}
