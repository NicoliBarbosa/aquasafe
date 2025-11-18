import React, { useState } from "react";
import "./CriarConta.css";
import "./CriarConta-desktop.css";
import logo from "/logo-vert.png";
import ondas from "/ondas.png";
import { useNavigate } from "react-router-dom";
import { useMobile } from "../hooks/useMobile"

export default function CriarConta() {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [celular, setCelular] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const dados = { nome, sobrenome, email, nascimento, celular };

    navigate("/definir-senha", { state: dados });
  }

  return (
    <div className="create-container">

      <div className="create-card">
        <img src={logo} className="logo" />

        <h2 className="title">Criar conta</h2>

        <form className="form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Nome" onChange={e => setNome(e.target.value)} />
          <input type="text" placeholder="Sobrenome" onChange={e => setSobrenome(e.target.value)} />
          <input type="email" placeholder="Qual seu melhor email?" onChange={e => setEmail(e.target.value)} />
          <input type="date" onChange={e => setNascimento(e.target.value)} />
          <input type="tel" placeholder="Celular" onChange={e => setCelular(e.target.value)} />

          <button type="submit">Avançar</button>
        </form>
      </div>

      <img src={ondas} className="ondas" />
    </div>
  );
}
