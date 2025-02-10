import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const RemoteLogin = lazy(() => import("loginApp/LoginPage"));
const RemoteHome = lazy(() => import("homeApp/HomePage"));

const App: React.FC = () => {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Routes>
        <Route path="/login" element={<RemoteLogin />} />
        <Route path="/*" element={<RemoteHome />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default App;
