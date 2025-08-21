import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/predReys_cite/",
  define: {
    // Мокаем process.env, чтобы зависимости, ожидающие Node-среду, не падали
    'process.env': {},
  },
})
