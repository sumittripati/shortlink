// import { defineConfig } from 'vite'
// import tailwindcss from '@tailwindcss/vite'

// export default defineConfig({
//   plugins: [
//     tailwindcss(),
//   ],
// })


import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],

  server: {
    proxy: {
        // Redirect Proxy — Short code -> Backend redirect
        '^/[A-Za-z0-9]{6,8}$': {
          target: env.VITE_REDIRECT_TARGET || "http://localhost:5000",
          changeOrigin: true,
          rewrite: (path) => path,
        },

        // API Proxy
        "/api": {
          target: env.VITE_API_URL || "http://localhost:5000/api",
          changeOrigin: true,
          rewrite: (path) => path,
        },
    }
  }
});
