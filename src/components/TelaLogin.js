import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import styled from "styled-components";
import Logo from "../assets/Group 8.png";

export default function TelaLogin() {
  const navigate = useNavigate();
  const { setToken, setFoto } = useContext(UserContext);

  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();

  function Login(e) {
    e.preventDefault();

    const URL =
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";

    const promise = axios.post(URL, {
      email: email,
      password: senha,
    });
    promise.then((response) => {
      const { data } = response;
        console.log(data);
        setToken(data.token);
        setFoto(data.image);
        navigate("/hoje");
    });
    promise.catch((err) => {
      console.log(err.data.status);
      alert("Falha ao fazer o Login.");
    });
  }

  return (
    <Conteiner>
      <img src={Logo} alt="Logo" />
      <form onSubmit={Login}>
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
        <button type="submit">Entrar</button>
      </form>
      <Link to="/cadastro">
        <p>Não tem uma conta? Cadastre-se!</p>
      </Link>
    </Conteiner>
  );
}

const Conteiner = styled.div`
  width: 375px;
  height: 667px;
  background: #ffffff;
  box-sizing: border-box;

  img {
    width: 180px;
    height: 178.38px;
    padding: 68px 98px 32.62px 97px;
  }

  input {
    width: 303px;
    height: 45px;

    border: 1px solid #d5d5d5;
    border-radius: 5px;
    margin: 0 36px 6px 36px;
    padding-left: 11px;
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #dbdbdb;
  }

  button {
    width: 303px;
    height: 45px;
    background: #52b6ff;
    border-radius: 4.63636px;
    margin: 0 36px 25px 43px;
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
    margin: 0 69px 0 74px;
  }

  div{
    width: 303px;
    height: 45px;
    background: #52B6FF;
    opacity: 0.7;
    border-radius: 4.63636px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
//<div><ThreeDots color="#FFFFFF" height={80} width={80} /></div>