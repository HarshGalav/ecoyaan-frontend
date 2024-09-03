import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import fs from 'fs'

const certificatePath = path.resolve(__dirname, 'public/certs/localhost.pem');
const keyPath = path.resolve(__dirname, 'public/certs/localhost-key.pem');
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174, // change here
    https: {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certificatePath),
    },
  }
})
