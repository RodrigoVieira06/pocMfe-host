// host-app/src/App.tsx
import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Carregamento dinâmico dos MFEs remotos:
// Importa o LoginPage exposto pelo login-app e a HomePage (com layout fixo) exposta pelo home-app.
const RemoteLogin = lazy(() => import("loginApp/LoginPage"));
const RemoteHome = lazy(() => import("homeApp/HomePage"));

const App: React.FC = () => {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Routes>
        {/* Rota para o login */}
        <Route path="/login" element={<RemoteLogin />} />
        {/* Rota para a home (que internamente gerencia a dashboard e demais MFEs) */}
        <Route path="/*" element={<RemoteHome />} />
        {/* Se nenhuma rota for encontrada, redireciona para a home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default App;
