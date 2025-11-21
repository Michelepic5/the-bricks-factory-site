import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Se usi un dominio personalizzato (thebricksfactory.com), la base deve essere '/'
  // Se invece usi github pages senza dominio (username.github.io/repo), allora serve '/repo-name/'
  base: '/',
})
