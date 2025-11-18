import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useDevice from "../hooks/useDevice";

import "./Login.css";
import "./Login-Desktop.css";

import logo from "/logo-vert.png";

export default function Login() {
  const navigate = useNavigate();
  const isMobile = useDevice();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    if (email === "" || senha === "") {
      alert("Preencha email e senha!");
      return;
    }
    navigate("/dashboard");
  }

  return (
    <div className={isMobile ? "login-mobile" : "login-desktop"}>
      <img src={logo} className="logo-anim" alt="AquaSafe" />

      <h1 className="title-anim">Acessar conta</h1>

      <form
        className={isMobile ? "form-mobile form-anim" : "form-desktop form-anim"}
        onSubmit={handleLogin}
      >
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button type="submit" className="btn-anim">
          Entrar
        </button>
      </form>
    </div>
  );
}
