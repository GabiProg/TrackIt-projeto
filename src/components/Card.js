import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import "../assets/Style_dia.css";

function CardItens({ day, value, id, PegarId }) {
  const [selecionar, setSelecionar] = useState({});
  const [cor, setCor] = useState("normal");

  function Select(id, value, day) {
    if (value === false) {
      setSelecionar(true);
      setCor("muda-cor");
      PegarId(id, day);
    }
    if (selecionar === true) {
      setSelecionar(false);
      setCor("normal");
    }
  }

  return (
    <>
      <div
        className={!value !== true ? "muda-cor" : `${cor}`}
        onClick={() => Select(id, value, day)}
      >
        {day}
      </div>
    </>
  );
}

export default function Card({ setClick, token }) {
  console.log(token);
  const [diasDaSemana, setDiasDaSemana] = useState([
    { id: "0", day: "D", value: false },
    { id: "1", day: "S", value: false },
    { id: "2", day: "T", value: false },
    { id: "3", day: "Q", value: false },
    { id: "4", day: "Q", value: false },
    { id: "5", day: "S", value: false },
    { id: "6", day: "S", value: false }
  ]);

  const [pegarIdHabito, setPegarIdHabito] = useState(new Map());
  const [nomeHabito, setNomeHabito] = useState();

  function MontarHabitos(id, day) {
    const selecionado = pegarIdHabito.has(id);
    if (selecionado) {
      pegarIdHabito.delete(id);
      setPegarIdHabito(new Map(pegarIdHabito));
    } else {
      setPegarIdHabito(new Map(pegarIdHabito.set(id, day)));
    }
  }

  function EnviarHabitos(e) {
    e.preventDefault();

    const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
    
    const body = {
      name: nomeHabito,
      days: [...pegarIdHabito.keys()]
    }
   
    const promise = axios.post(URL, body, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    
    promise.then(res => {
      console.log(res.data);
      setClick(false);
    });
    promise.catch(err => {
      alert("Falha ao criar Habito");
    })
  }

  return (
    <Conteiner>
      <Texto>
        <input
          type="text"
          placeholder="nome do hábito"
          value={nomeHabito}
          onChange={(e) => setNomeHabito(e.target.value)}
        />
      </Texto>
      <Semana>
        {diasDaSemana.map((item) => (
          <CardItens
            key={item.id}
            id={item.id}
            day={item.day}
            value={item.value}
            PegarId={(id, value, day) => MontarHabitos(id, value, day)}
          />
        ))}
      </Semana>
      <Botoes>
        <div onClick={() => setClick(false)}>
          <p>Cancelar</p>
        </div>
        <div>
          <div onClick={EnviarHabitos}>Salvar</div>
        </div>
      </Botoes>
    </Conteiner>
  );
}

const Conteiner = styled.div`
  width: 340px;
  height: 180px;
  background: #ffffff;
  border-radius: 5px;
  margin-left: 17px;
  margin-bottom: 29px;
  box-sizing: border-box;
`;

const Texto = styled.div`
  padding: 18px 0 8px 10px;

  input {
    width: 303px;
    height: 45px;
    background: #ffffff;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #dbdbdb;
    padding-left: 11px;
  }
`;

const Semana = styled.div`
  display: flex;
  gap: 4px;
  margin: 0 0 25px 11px;

  div {
    width: 30px;
    height: 30px;

    border-radius: 5px;
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;

    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Botoes = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 23px;
  padding-right: 16px;

  div div {
    width: 84px;
    height: 35px;
    background: #52b6ff;
    border-radius: 4.63636px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 15.976px;
    line-height: 20px;
    text-align: center;
    color: #ffffff;
  }

  div p {
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 15.976px;
    line-height: 20px;
    text-align: center;
    color: #52b6ff;
  }
`;
