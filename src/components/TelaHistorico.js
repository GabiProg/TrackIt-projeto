import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import Top from "./Top";
import Menu from "./Menu";
import styled from "styled-components";

export default function TelaHistorico(){

    const {foto, valueClick, setValueClick} = useContext(UserContext);

    return(
    <>
    <Conteiner>
    <Top foto={foto}/>
        <h2>Histórico</h2>
        <p>Em breve você poderá ver o histórico<br/>dos seus hábitos aqui!</p>
    <Menu valueClick={valueClick} setValueClick={setValueClick}/>
    </Conteiner>
    </>
    );
}

const Conteiner = styled.div`
    width: 375px;
    height: 667px;
    background: #F2F2F2;
    position: relative;

    h2{
        padding: 28px 0 17px 17px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
    }

    p{
        padding-left: 15px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        color: #666666;
        margin-bottom: 450px;
    }
`;