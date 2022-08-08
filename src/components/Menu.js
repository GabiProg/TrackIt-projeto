import { Link } from "react-router-dom";
import styled from "styled-components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Menu({valueClick}) {
  const text = "Hoje";
  const value = valueClick;
  console.log(value);
  return (
    <Conteiner>
      <Link to="/habitos">
        <p>Hábitos</p>
      </Link>
      <Link to="/hoje">
        <div style={{ width: 91, height: 91 }}>
        <ProgressProvider valueStart={value} valueEnd={100}>
          <CircularProgressbar
            value={value}
            text={`${text}`}
            styles={buildStyles({
              pathColor: "#FFFFFF",
              textColor: "#52B6FF",
              trailColor: "#52B6FF",
              backgroundColor: "rgba(62, 152, 199)",
            })}
          />
          </ProgressProvider>
        </div>
      </Link>
      <Link to="/historico">
        <h5>Histórico</h5>
      </Link>
    </Conteiner>
  );
}

const Conteiner = styled.div`
  width: 375px;
  height: 70px;
  background: #ffffff;
  display: flex;
  justify-content: space-between;
  left: 0;
  bottom: 0;

  p {
    padding: 22px 0 26px 34px;
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    text-align: center;
    color: #52b6ff;
    text-decoration: none;
  }

  h5 {
    padding: 22px 31px 28px 0;
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    text-align: center;
    color: #52b6ff;
    text-decoration: none;
  }

  div {
    padding-bottom: 10px;
  }

  div text {
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    text-align: center;
    color: #ffffff;
  }
`;

const ProgressProvider = styled.div``;
