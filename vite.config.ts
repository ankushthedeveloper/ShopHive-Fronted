import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv  from 'dotenv'
import envCompatible from 'vite-plugin-env-compatible'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  envCompatible()],
  define:{
    'process.env.VITE_KEY':JSON.stringify(process.env.VITE_KEY)
  }
})
