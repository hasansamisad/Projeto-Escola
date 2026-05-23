import React, { useState, useEffect } from 'react';
import get from 'lodash/get';
import { isEmail, isInt, isFloat } from 'validator';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

import appConfig from '../../config/appConfig';
import axios from '../../services/axios';
import { Container } from '../../styles/GlobalStyles';
import { Form, ProfilePicture } from './styled';
import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/actions';

export default function Aluno() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [foto, setFoto] = useState('');
  const [fotoArquivo, setFotoArquivo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function getData() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`/alunos/${id}`);

        const fotoUrl = get(data, 'Photos[0].url', '');

        if (fotoUrl) {
          const finalUrl = fotoUrl.startsWith('http')
            ? fotoUrl
            : `${appConfig.url}${fotoUrl}`;
          setFoto(finalUrl);
        }

        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setEmail(data.email);
        setIdade(data.idade);
        setPeso(data.peso);
        setAltura(data.altura);

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);

        if (status === 400) errors.forEach((error) => toast.error(error));

        navigate('/');
      }
    }

    getData();
  }, [id, navigate]);

  const handleFotoChange = (e) => {
    const arquivo = e.target.files[0];
    if (!arquivo) return;

    const fotoURL = URL.createObjectURL(arquivo);
    setFoto(fotoURL);
    setFotoArquivo(arquivo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      toast.error('Nome deve ter entre 3 e 255 caracteres');
      formErrors = true;
    }

    if (!isEmail(email)) {
      toast.error('E-mail inválido');
      formErrors = true;
    }

    if (!isInt(String(idade))) {
      toast.error('Idade deve ser um número inteiro');
      formErrors = true;
    }

    if (!isFloat(String(peso))) {
      toast.error('Peso deve ser um número');
      formErrors = true;
    }

    if (!isFloat(String(altura))) {
      toast.error('Altura deve ser um número');
      formErrors = true;
    }

    if (formErrors) return;

    try {
      setIsLoading(true);

      let alunoId = id;

      if (id) {
        await axios.put(`/alunos/${id}`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success('Aluno atualizado!');
      } else {
        const { data } = await axios.post('/alunos/', {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        alunoId = data.id;
        toast.success('Aluno criado!');
      }

      if (fotoArquivo) {
        const formData = new FormData();
        formData.append('aluno_id', alunoId);
        formData.append('photo', fotoArquivo);

        await axios.post('/photos/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      setIsLoading(false);
      navigate('/');
    } catch (err) {
      setIsLoading(false);
      const status = get(err, 'response.status', 0);
      const errors = get(err, 'response.data.errors', []);

      if (errors.length > 0) {
        errors.forEach((error) => toast.error(error));
      } else {
        toast.error('Erro ao salvar');
      }

      if (status === 401) dispatch(actions.loginFailure());
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>{id ? 'Editar Aluno' : 'Novo Aluno'}</h1>

      <ProfilePicture htmlFor="fotoInput">
        {foto ? (
          <img src={foto} alt={nome} />
        ) : (
          <FaUserCircle size={180} color="#ddd" />
        )}

        <input
          type="file"
          id="fotoInput"
          onChange={handleFotoChange}
          style={{ display: 'none' }}
        />
      </ProfilePicture>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
        />
        <input
          type="text"
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
          placeholder="Sobrenome"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
        />
        <input
          type="number"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          placeholder="Idade"
        />
        <input
          type="text"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          placeholder="Peso"
        />
        <input
          type="text"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
          placeholder="Altura"
        />

        <button type="submit">Enviar</button>
      </Form>
    </Container>
  );
}
