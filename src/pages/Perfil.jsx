import React, { useState } from "react";
import "./Perfil.css";
import "./Perfil-desktop.css";

export default function Perfil() {
  const [nome, setNome] = useState("Usuário Teste");
  const [email, setEmail] = useState("usuario@email.com");

  return (
    <div className="perfil-container">

      <div className="perfil-card">

        {/* Foto */}
        <img src="/user.png" alt="perfil" className="perfil-foto" />

        <h2 className="perfil-titulo">Meu Perfil</h2>

        <form className="perfil-form">
          <input
            type="text"
            value={nome}
            placeholder="Nome"
            onChange={(e) => setNome(e.target.value)}
          />

          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="btn-salvar">Salvar Alterações</button>
        </form>

        <button className="btn-senha">Alterar Senha</button>

      </div>

      <img src="/ondas.png" alt="ondas" className="ondas" />
    </div>
  );
}
