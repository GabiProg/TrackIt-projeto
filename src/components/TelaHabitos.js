import { useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import styled from "styled-components";
import Menu from "./Menu";
import Top from "./Top";
import Card from "./Card";

function ListaHabitosItens({name, id, token, days}){
    const arr = ["D", "S", "T", "Q", "Q", "S", "S"];

    function RemoverHabito(e){
        e.preventDefault();

        const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`;

        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

        const promise = axios.delete(URL, config);

        promise.then(res => {
            console.log(res.data);
            window.confirm("Você realmente quer deletar esse habito?")
        })

    }

    return(
    <>
    <HabitoCriado>
        <TextoHabito>
    <div>{name}</div>
    <ion-icon name="trash-outline" onClick={RemoverHabito}></ion-icon>
        </TextoHabito>
        <DiasHabitos>
            {
                arr.map((el, i) => {
                    return(
                        <Dia colorDiv={days.includes(i) ? "#CFCFCF" : "#FFFFFF"}>{el}</Dia>
                    )
                })
            }
        </DiasHabitos>
    </HabitoCriado>
    </>
    );
}

export default function TelaHabitos(){

    const { foto, click, setClick, token, habitos, setHabitos, valueClick, setValueClick} = useContext(UserContext);

    useEffect(() => {

        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";

        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

        const promise = axios.get(URL, config);

        promise.then(response => {
            setHabitos([...response.data]);
            console.log(response.data);
        });

    }, []);


     function ListarHabitos(){
         console.log(habitos);
         if(habitos !== null){
             return(
            <div>
                {habitos.map((habito) => (
                <ListaHabitosItens
                    key={habito.key}
                    id={habito.id}
                    name={habito.name}
                    days={habito.days}
                    token={token}
                />
                ))}
            </div>);
         } else {
             return(
             <p>Você não tem nenhum hábito<br/> 
             cadastrado ainda. Adicione um hábito<br/> 
             para começar a trackear!</p>
             );
         }
     }

    return(
    <Conteiner>
        <Top foto={foto}/>
        <Topo>
        <h2>Meus hábitos</h2>
        <div onClick={() => setClick(true)}>+</div>
        </Topo>
        {click? <Card setClick={setClick} token={token}/> : <div></div>}
        {ListarHabitos()}
        <Menu valueClick={valueClick} setValueClick={setValueClick}/>
    </Conteiner>
    );
}

const Conteiner = styled.div`
    width: 100%;
    height: auto;
    background: #F2F2F2;
    position: relative;

    p{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        color: #666666;
        margin-left: 17px;
    }
`;
const Topo = styled.div`
    margin-top: 22px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 28px;

    h2{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
        margin-left: 17px;
    }

    div{
        width: 40px;
        height: 35px;
        background: #52B6FF;
        border-radius: 4.63636px;
        margin-right: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 26.976px;
        line-height: 34px;
        text-align: center;
        color: #FFFFFF;
    }
`;

const HabitoCriado = styled.div`
    width: 340px;
    height: 91px;
    background: #FFFFFF;
    border-radius: 5px;
    margin: 20px 0 0 17px;
`;

const TextoHabito = styled.div`
width: 100%;
height: auto;    
display: flex;
justify-content: space-between;

div{
    padding: 13px 0 8px 15px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #666666;
}

ion-icon{
    padding: 11px 19px 0 0;
    font-size: 15px;
    color: #666666;
}
`;

const DiasHabitos = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    gap: 4px;
    margin-left: 14px;
`;

const Dia = styled.div`
    width: 30px;
    height: 30px;
    background: ${e => e.colorDiv};
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #DBDBDB;
`;