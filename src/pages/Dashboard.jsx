import { useEffect, useState } from "react";
import "./Dashboard.css";
import { db, auth } from "../firebase";
import { ref, onValue } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [agua, setAgua] = useState(false);
  const [horarios, setHorarios] = useState([]);

  const navigate = useNavigate();

  // ---- PROTEÇÃO DE ROTA ----
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      }
    });
  }, []);

  // ---- LENDO FIREBASE ----
  useEffect(() => {
    const statusRef = ref(db, "/leituras/status");

    onValue(statusRef, (snapshot) => {
      const valor = snapshot.val();

      if (valor !== null) {
        const detectou = valor === 1;
        setAgua(detectou);

        const now = new Date();
        const hora = now.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        });

        const mensagem = detectou
          ? "💧 Água detectada"
          : "Sem água";

        setHorarios((prev) => {
          const novo = [...prev, `${hora} → ${mensagem}`];
          return novo.slice(-5);
        });
      }
    });
  }, []);

  return (
    <div className="dash-container">
      
      {/* TOPO */}
      <div className="dash-header">
        <img src="/logo-hori.png" className="logo" />

        {/* ÍCONE DE PERFIL → Página Perfil */}
        <img 
          src="/perfil.png" 
          className="perfil" 
          alt="perfil"
          onClick={() => navigate("/perfil")}
          style={{ cursor: "pointer" }}
        />
      </div>

      {/* STATUS */}
      <div className={`status-card ${agua ? "status-agua" : "status-seco"}`}>
        <h1>{agua ? "Água detectada" : "Água não detectada"}</h1>
      </div>

      {/* DISPOSITIVO */}
      <div className="device-card">
        <p><strong>Dispositivo:</strong> ESP32_01</p>
      </div>

      {/* ATIVIDADE */}
      <div className="atividade-card">
        <h2>Atividade Recente</h2>

        <div className="horarios">
          {horarios.map((h, i) => (
            <div key={i} className="hora-item">
              <div className={`bolinha ${h.includes("💧") ? "bolinha-agua" : ""}`}></div>
              <span className="hora-texto">{h}</span>
            </div>
          ))}
        </div>

        <button className="relatorio-btn">Relatório Completo</button>
      </div>

      <img src="/ondas.png" className="ondas" />
    </div>
  );
}
