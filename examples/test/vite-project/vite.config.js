import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '/Users/dyck/workspaces/git.zdns.cn/zdns/zddiv3/web/public/ipplus',
    rollupOptions: {
      format: 'system',
      preserveEntrySignatures: true
    }
  },
})
