import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import styled from "styled-components";
import Top from "./Top";
import Menu from "./Menu";
import dayjs from "dayjs";
import "../assets/Style_dia.css";

function TelaHojeItens({
  name,
  currentSequence,
  highestSequence,
  done,
  id,
  token,
  valueClick,
  setValueClick
}) {
  function MarcarTelaHoje(e) {
    e.preventDefault();

    if (done === false) {
      const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`;

      const body = {};

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const request = axios.post(URL, body, config);

      request.then((response) => {
        console.log(response.data);
        setValueClick((valueClick + 10));
      });
    } else {
      const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`;

      const body = {};

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const request = axios.post(URL, body, config);

      request.then((response) => {
        console.log(response.data);
        if(valueClick > 0){
        setValueClick((valueClick - 10));
        }
      });
    }
  }

  return (
    <>
      <HabitosMarcados>
        <div>
          <NomeHabitoHoje>
            <div>{name}</div>
          </NomeHabitoHoje>
          <Sequencia>Sequência atual: {currentSequence} dias</Sequencia>
          <Record> Seu recorde: {highestSequence} dias</Record>
        </div>
        <span
          className={!done !== true ? "marcar" : "desmarcar"}
          onClick={MarcarTelaHoje}
        >
          <ion-icon name="checkmark-outline"></ion-icon>
        </span>
      </HabitosMarcados>
    </>
  );
}

export default function TelaHoje() {
  const {
    token,
    foto,
    listarHabitosTelaHoje,
    setListarHabitosTelaHoje,
    telaHojeClcik,
    setTelaHojeClick,
    valueClick,
    setValueClick
  } = useContext(UserContext);

  useEffect(() => {
    const URL =
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const promise = axios.get(URL, config);

    promise.then((response) => {
      setListarHabitosTelaHoje([...response.data]);
      console.log(response.data);
    });
  }, []);

  let now = dayjs();
  let date = now.date();
  let month = now.month();
  let day = now.format("dddd");

  return (
    <>
      <Conteiner>
        <Top foto={foto} />
        <Data>
          {day}, {date}/{month + 1}
        </Data>
        <PorcentagemTexto>Nenhum hábito concluído ainda</PorcentagemTexto>
        {listarHabitosTelaHoje.map((item) => (
          <TelaHojeItens
            key={item.id}
            id={item.id}
            name={item.name}
            done={item.done}
            currentSequence={item.currentSequence}
            highestSequence={item.highestSequence}
            token={token}
            telaHojeClcik={telaHojeClcik}
            valueClick={valueClick}
            setValueClick={setValueClick}
          />
        ))}
        <Menu valueClick={valueClick} setValueClick={setValueClick}/>
      </Conteiner>
    </>
  );
}

const Conteiner = styled.div`
  width: 100%;
  height: auto;
  background: #f2f2f2;
  position: relative;
`;

const Data = styled.div`
  font-family: "Lexend Deca";
  font-style: normal;
  font-weight: 400;
  font-size: 22.976px;
  line-height: 29px;
  color: #126ba5;
  padding: 28px 0 0 17px;
`;

const PorcentagemTexto = styled.div`
  font-family: "Lexend Deca";
  font-style: normal;
  font-weight: 400;
  font-size: 17.976px;
  line-height: 22px;
  color: #bababa;
  padding: 0 0 28px 17px;
`;

const HabitosMarcados = styled.div`
  width: 340px;
  height: 94px;
  background: #ffffff;
  border-radius: 5px;
  margin: 0 0 10px 18px;
  display: flex;
  justify-content: space-between;

  span {
    width: 69px;
    height: 69px;
    border: 1px solid #e7e7e7;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 35px;
    color: #ffffff;
    margin: 13px 13px 20px 0;
  }
`;

const NomeHabitoHoje = styled.div`
  div {
    padding: 13px 0 7px 15px;
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #666666;
  }
`;

const Sequencia = styled.div`
  padding-left: 15px;
  font-family: "Lexend Deca";
  font-style: normal;
  font-weight: 400;
  font-size: 12.976px;
  line-height: 16px;
  color: #666666;
`;

const Record = styled.div`
  padding-left: 15px;
  font-family: "Lexend Deca";
  font-style: normal;
  font-weight: 400;
  font-size: 12.976px;
  line-height: 16px;
  color: #666666;
`;
