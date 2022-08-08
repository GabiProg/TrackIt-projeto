import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import styled from "styled-components";
import Logo from "../assets/Group 8.png";

export default function TelaCadastro() {
  const navigate = useNavigate();

  const {foto, setFoto} = useContext(UserContext);

  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [nome, setNome] = useState();
  
  function EnviarCadastro(e) {
    e.preventDefault();

    const URL =
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up";

    const promise = axios.post(URL, {
      email: email,
      name: nome,
      image: foto,
      password: senha,
    });
    promise.then((response) => {
      const { data } = response;
      console.log(data);
      navigate("/");
    });
    promise.catch((err) => {
      console.log(err.response.status);
      alert("Falha ao fazer o cadastro.");
    });
  }

  return (
    <Conteiner>
      <form onSubmit={EnviarCadastro}>  
      <img src={Logo} alt="Logo"/>
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="foto"
        value={foto}
        onChange={(e) => setFoto(e.target.value)}
        required
      />
      <button type="submit">Cadastrar</button>
      </form>
      <Link to="/">
        <p>Já tem uma conta? Faça login!</p>
      </Link>
    </Conteiner>
  );
}

const Conteiner = styled.div`
  width: 375px;
  height: 667px;
  background: #ffffff;
  box-sizzing: border-box;

  img {
    width: 180px;
    height: 178.38px;
    padding: 68px 98px 32.62px 97px;
  }

  input {
    width: 303px;
    height: 45px;
    background: #ffffff;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    margin: 0 36px 6px 36px;
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #dbdbdb;
    padding-left: 11px;
  }

  button {
    width: 303px;
    height: 45px;
    background: #52b6ff;
    border-radius: 4.63636px;
    margin: 0 36px 25px 36px;
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 20.976px;
    line-height: 26px;
    text-align: center;
    color: #ffffff;
  }

  p {
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 13.976px;
    line-height: 17px;
    text-align: center;
    text-decoration-line: underline;
    color: #52b6ff;
  }
`;
