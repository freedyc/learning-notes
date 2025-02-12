import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

console.log(new URL('./src/common', import.meta.url).pathname)
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '/Users/dyck/workspaces/git.zdns.cn/zdns/zddiv3/web/public/ipplus',
    rollupOptions: {
      format: 'system',
       entryFileNames: 'my-custom-name.js',
        preserveEntrySignatures: 'strict'
    }
  }
})
