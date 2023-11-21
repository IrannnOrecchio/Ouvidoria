import React, { useState, useEffect } from 'react';
import './cadastrar.css';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../connectionFirebase';

function Cadastrar() {
  const [mensagemUsuario, setMensagemUsuario] = useState('');
  const [mensagemSenha, setMensagemSenha] = useState('');
  const navigate = useNavigate();

  const mostrarMensagemUsuario = () => {
    setMensagemUsuario('*Lembre-se de guardar seu usuário e senha para logins futuros');
  };

  const mostrarMensagemSenha = () => {
    setMensagemSenha('*Lembre-se de guardar seu usuário e senha para logins futuros');
  };

  const cadastrarUsuario = async (event) => {
    event.preventDefault();
    const nomeUsuario = event.target.elements.usuario.value;
    const senhaInput = event.target.elements.senha.value;
    const email = `${nomeUsuario}@seuapp.com`;

    try {
      await createUserWithEmailAndPassword(auth, email, senhaInput);
      console.log('Usuário criado com sucesso');
      navigate('/Ticket');
    } catch (error) {
      console.error('Erro ao criar usuário:', error.message);
    }
  };

  const handleKeyPress = (event) => {
    // Verifica se a tecla pressionada é a tecla "Enter"
    if (event.key === 'Enter') {
      cadastrarUsuario(event);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      // Redireciona para a página do Ticket se o usuário tentar voltar para a tela de login
      if (window.location.pathname.includes('/Login')) {
        navigate('/Ticket');
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  // Intercepta as mudanças de histórico e substitui a entrada no histórico para evitar a navegação
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.returnValue = true;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div>
      <Link to="/" className="voltarinicio">
        Voltar para home
      </Link>

      <form className="Cadastro" onSubmit={cadastrarUsuario}>
        <h2>Cadastre-se</h2>

        <div className="box">
          <label htmlFor="nome">Digite seu usuário</label>
          <input
            type="text"
            name="usuario"
            required
            maxLength="15"
            onFocus={mostrarMensagemUsuario}
            onBlur={() => setMensagemUsuario('')}
          />
          <p className="mensagem">{mensagemUsuario}</p>
        </div>

        <div className="box">
          <label htmlFor="senha">Digite sua senha</label>
          <input
            type="password"
            name="senha"
            required
            maxLength="13"
            onFocus={mostrarMensagemSenha}
            onBlur={() => setMensagemSenha('')}
          />
          <p className="mensagem">{mensagemSenha}</p>
        </div>

        <button type="submit" className="cadastrar">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          CADASTRAR
        </button>

        {/* Adiciona o manipulador de evento para a tecla "Enter" no formulário */}
        <div tabIndex="0" onKeyPress={handleKeyPress} style={{ height: '0', overflow: 'hidden' }}></div>
      </form>
    </div>
  );
}

export default Cadastrar;