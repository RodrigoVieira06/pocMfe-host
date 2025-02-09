// host-app/vite.config.ts
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig(({ mode }) => {
  // Utilizando variáveis de ambiente para facilitar a troca entre desenvolvimento e produção
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [
      react(),
      federation({
        name: "hostApp",
        // Aqui os remotes apontam para os builds dos outros projetos. Em desenvolvimento, usamos URLs locais.
        remotes: {
          loginApp: env.VITE_REMOTE_LOGIN,  // Ex: "http://localhost:5173/assets/remoteEntry.js"
          homeApp: env.VITE_REMOTE_HOME,     // Ex: "http://localhost:5177/assets/remoteEntry.js"
        },
        shared: ["react", "react-dom", "react-router-dom"]
      })
    ],
    build: {
      modulePreload: false,
      target: "esnext",
      minify: false,
      cssCodeSplit: false
    }
  };
});
