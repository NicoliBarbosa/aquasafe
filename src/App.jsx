import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import CriarConta from "./pages/CriarConta";
import DefinirSenha from "./pages/DefinirSenha";
import Dashboard from "./pages/Dashboard";
import Perfil from "./pages/Perfil";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/criar" element={<CriarConta />} />
      <Route path="/definir-senha" element={<DefinirSenha />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/perfil" element={<Perfil />} />
    </Routes>
  );
}
