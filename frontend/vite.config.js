// import { defineConfig } from 'vite'
// import tailwindcss from '@tailwindcss/vite'

// export default defineConfig({
//   plugins: [
//     tailwindcss(),
//   ],
// })

import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [tailwindcss()],

    server: {
      proxy: {
        // Redirect Proxy
        '^/[A-Za-z0-9]{6,8}$': {
          target: env.VITE_REDIRECT_TARGET || "https://shortlink-olh3.onrender.com",
          changeOrigin: true,
          rewrite: path => path,
        },

        // API Proxy
        "/api": {
          target: env.VITE_API_URL || "https://shortlink-olh3.onrender.com/api",
          changeOrigin: true,
          rewrite: path => path,
        }
      }
    }
  };
});

