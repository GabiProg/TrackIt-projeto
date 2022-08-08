import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "../contexts/UserContext";
import TelaLogin from "./TelaLogin";
import TelaCadastro from "./TelaCadastro";
import TelaHabitos from "./TelaHabitos";
import TelaHoje from "./TelaHoje";
import TelaHistorico from "./TelaHistorico";
import "../assets/Reset.css";

export default function App() {
  const [token, setToken] = useState();
  const [foto, setFoto] = useState();
  const [click, setClick] = useState(false);
  const [habitos, setHabitos] = useState(null);
  const [listarHabitosTelaHoje, setListarHabitosTelaHoje] = useState([]);
  const [valueEnd, setValueEnd] = useState(0);
  const [valueClick, setValueClick] = useState(0);
  
  return (
    <>
      <UserContext.Provider
        value={{
          token,
          setToken,
          foto,
          setFoto,
          click,
          setClick,
          habitos,
          setHabitos,
          listarHabitosTelaHoje,
          setListarHabitosTelaHoje,
          valueEnd,
          setValueEnd,
          valueClick,
          setValueClick
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TelaLogin />} />
            <Route path="/cadastro" element={<TelaCadastro />} />
            <Route path="/habitos" element={<TelaHabitos />} />
            <Route path="/hoje" element={<TelaHoje />} />
            <Route path="/historico" element={<TelaHistorico />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}
