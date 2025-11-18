import { useEffect, useState } from "react";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";
import "./Relatorio.css";
import "./Relatorio-desktop.css";
import { useNavigate } from "react-router-dom";
import useDevice from "../hooks/useDevice";

export default function Relatorio() {
  const [historico, setHistorico] = useState([]);
  const navigate = useNavigate();
  const device = useDevice();

  // Carrega o CSS conforme o dispositivo
  useEffect(() => {
    if (device === "mobile") {
      import("./Relatorio.css");
    } else {
      import("./Relatorio-desktop.css");
    }
  }, [device]);

  useEffect(() => {
    const refStatus = ref(db, "/leituras/historico");

    onValue(refStatus, (snapshot) => {
      const dados = snapshot.val();
      if (!dados) return;

      const lista = Object.values(dados).slice(-100).reverse();
      setHistorico(lista);
    });
  }, []);

  return (
    <div className="relatorio-container">

      <div className="relatorio-header">
        <img 
          src="/seta.png" 
          className="btn-voltar"
          onClick={() => navigate("/dashboard")}
        />
        <h1>Relatório Completo</h1>
      </div>

      <div className="lista-registros">

        {historico.length === 0 && (
          <p className="msg-vazio">Nenhum registro encontrado...</p>
        )}

        {historico.map((item, i) => (
          <div key={i} className="registro-item">
            <div className={`bolinha-relatorio ${item.includes("Água") ? "bolinha-agua" : ""}`}></div>
            <div className="registro-texto">
              {item}
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}
