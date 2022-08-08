import styled from "styled-components";

export default function Top({ foto }) {
  return (
    <Conteiner>
      <TextoTopo>TrackIt</TextoTopo>
      <img src={foto} alt="Foto do usuario" />
    </Conteiner>
  );
}

const Conteiner = styled.div`
  width: 375px;
  height: 70px;
  background: #126ba5;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizzing: border-box;

  img {
    width: 51px;
    height: 51px;
    border-radius: 99px;
    margin-right: 18px;
  }
`;

const TextoTopo = styled.div`
  font-family: "Playball";
  font-style: normal;
  font-weight: 400;
  font-size: 38.982px;
  line-height: 49px;
  color: #ffffff;
  padding-left: 18px;
`;
