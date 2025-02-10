import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      federation({
        name: "hostApp",
        remotes: {
          loginApp: env.VITE_REMOTE_LOGIN,
          homeApp: env.VITE_REMOTE_HOME,
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
