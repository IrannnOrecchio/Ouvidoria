import React, { useState } from 'react';
import './loginesenha.css';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../connectionFirebase';

function Loginesenha() {
  const [mensagemErro, setMensagemErro] = useState('');
  const navigate = useNavigate();

  const fazerLogin = async () => {
    const nomeUsuario = document.getElementsByName('usuario')[0].value;
    const email = `${nomeUsuario}@seuapp.com`; // Mantém o domínio fictício
    const senha = document.getElementsByName('senha')[0].value;

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate('/Ticket');
    } catch (error) {
      setMensagemErro('Erro ao fazer login. Verifique seu login e senha.');
      console.error('Erro ao fazer login:', error.message);
    }
  };

  const handleKeyPress = (event) => {
    // Verifica se a tecla pressionada é a tecla "Enter"
    if (event.key === 'Enter') {
      fazerLogin();
    }
  };

  return (
    <div>
      <Link to="/" className="voltarinicio">
        Voltar para home
      </Link>

      <form className="loginesenha" onSubmit={(event) => event.preventDefault()}>
        <h2>Login</h2>

        <div className="box">
          <label htmlFor="nome">Usuário</label>
          <input type="text" name="usuario" required maxLength="15" />
        </div>

        <div className="box">
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            name="senha"
            required
            maxLength="13"
            onKeyPress={handleKeyPress}
          />
        </div>

        {mensagemErro && <p className="mensagem-erro error-text">{mensagemErro}</p>}

        <button type="button" className="entrar" onClick={fazerLogin}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          ENTRAR
        </button>
      </form>
    </div>
  );
}

export default Loginesenha;