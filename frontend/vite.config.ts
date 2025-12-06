import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from "path";

export default defineConfig({
  base: '/static/',
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    },
  },
});
