import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./DefinirSenha.css";
import "./DefinirSenha-desktop.css";

import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";

export default function DefinirSenha() {
  const navigate = useNavigate();
  const location = useLocation();

  // Dados vindos da página CriarConta
  const dados = location.state;

  // Se o usuário cair aqui direto (sem passar pelo cadastro)
  if (!dados) {
    return (
      <div className="definir-container">
        <img src="/logo-vert.png" alt="logo" className="logo" />
        <h1 className="titulo">Ops!</h1>
        <p style={{ marginTop: 10, marginBottom: 20 }}>
          Você acessou esta página de forma incorreta.
        </p>
        <button className="btn-definir" onClick={() => navigate("/criar")}>
          Voltar para cadastro
        </button>
      </div>
    );
  }

  const [senha1, setSenha1] = useState("");
  const [senha2, setSenha2] = useState("");

  function criarConta(e) {
    e.preventDefault();

    if (senha1 !== senha2) {
      alert("As senhas não coincidem!");
      return;
    }

    if (senha1.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    // Criar usuário no Firebase Auth
    createUserWithEmailAndPassword(auth, dados.email, senha1)
      .then((userCredential) => {
        const uid = userCredential.user.uid;

        // Salvar dados extras no Realtime Database
        set(ref(db, "usuarios/" + uid), dados);

        alert("Conta criada com sucesso!");
        navigate("/login");
      })
      .catch((error) => {
        console.log("ERRO FIREBASE:", error.code, error.message);
        alert("Erro ao criar conta: " + error.code);
      });
  }

  return (
    <div className="definir-container">
      <div className="definir-card">
        <img src="/logo-vert.png" alt="logo" className="logo" />

        <h1 className="titulo">Defina sua senha</h1>

        <form className="formulario-definir" onSubmit={criarConta}>
          <input
            type="password"
            placeholder="Digite uma senha"
            value={senha1}
            onChange={(e) => setSenha1(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirme sua senha"
            value={senha2}
            onChange={(e) => setSenha2(e.target.value)}
          />
          <button className="btn-definir">Criar Conta</button>
        </form>
      </div>

      <img src="/ondas.png" alt="ondas" className="ondas" />
    </div>
  );
}
