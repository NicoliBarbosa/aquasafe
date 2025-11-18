import { useEffect, useState } from "react";
import "./Dashboard.css";
import "./Dashboard-desktop.css";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";
import useDevice from "../hooks/useDevice";

export default function Dashboard() {
  const [agua, setAgua] = useState(false);
  const [horarios, setHorarios] = useState([]);

  const navigate = useNavigate();
  const device = useDevice();

  // Carrega CSS correto
  useEffect(() => {
    if (device === "mobile") {
      import("./Dashboard.css");
    } else {
      import("./Dashboard-desktop.css");
    }
  }, [device]);

  // Firebase listener
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

        const mensagem = detectou ? "💧 Água detectada" : "Sem água";

        setHorarios((prev) => {
          const novo = [...prev, `${hora} → ${mensagem}`];
          return novo.slice(-5);
        });
      }
    });
  }, []);

  return (
    <div className="dash-container fade-in">

      {/* Cabeçalho */}
      <div className="dash-header slide-down">
        <img src="/logo-hori.png" className="logo" />
        <img
          src="/user.png"
          className="perfil bounce-in"
          onClick={() => navigate("/perfil")}
        />
      </div>

      {/* Status */}
      <div
        className={`status-card animate-card ${
          agua ? "status-agua" : "status-seco"
        }`}
      >
        <h1 className="status-text">
          {agua ? "Água detectada" : "Água não detectada"}
        </h1>
      </div>

      {/* Dispositivo */}
      <div className="device-card animate-card delay-1">
        <p>
          <strong>Dispositivo:</strong> ESP32_01
        </p>
      </div>

      {/* Atividades */}
      <div className="atividade-card animate-card delay-2">
        <h2>Atividade Recente</h2>

        <div className="horarios">
          {horarios.map((h, i) => (
            <div key={i} className="hora-item slide-left">
              <div
                className={`bolinha ${
                  h.includes("💧") ? "bolinha-agua" : ""
                }`}
              ></div>
              <span className="hora-texto">{h}</span>
            </div>
          ))}
        </div>

        {/* Botão relatório */}
        <button
          className="relatorio-btn relatorio-anim"
          onClick={() => navigate("/relatorio")}
        >
          Relatório Completo
        </button>
      </div>

      <img src="/ondas.png" className="ondas fade-in-bottom" />
    </div>
  );
}
