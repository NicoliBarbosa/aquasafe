import React, { useState } from "react";
import "../pages/Login.css";
import "../pages/Login-desktop.css";
import logo from "/logo-vert.png";
import ondas from "/ondas.png";
import { useNavigate } from "react-router-dom";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  function handleLogin(e) {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, senha)
      .then(() => {
        navigate("/dashboard");  // SUCESSO
      })
      .catch((error) => {
        alert("Email ou senha incorretos!");
      });
  }

  return (
    <div className="login-container">
      
      <img src={logo} className="logo" />

      <h2 className="title">Acessar sua conta</h2>

      <form className="form" onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Email" 
          onChange={(e) => setEmail(e.target.value)}
        />

        <input 
          type="password" 
          placeholder="Senha" 
          onChange={(e) => setSenha(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>

      <div className="links">
        <a href="#" onClick={() => navigate("/criar")}>Criar conta</a>
      </div>

      <img src={ondas} className="ondas" />
    </div>
  );
}
