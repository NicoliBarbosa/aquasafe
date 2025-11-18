import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import CriarConta from "./pages/CriarConta";
import DefinirSenha from "./pages/DefinirSenha";
import Dashboard from "./pages/Dashboard";
import Perfil from "./pages/Perfil";
import Relatorio from "./pages/Relatorio";

export default function App() {
  return (
    <Routes>
      {/* Página inicial agora é o Login */}
      <Route path="/" element={<Login />} />

      <Route path="/login" element={<Login />} />
      <Route path="/criar" element={<CriarConta />} />
      <Route path="/definir-senha" element={<DefinirSenha />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="relatorio" element={<Relatorio />} />
      
    </Routes>
  );
}
