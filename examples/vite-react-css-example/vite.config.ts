import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import analyzer from "vite-bundle-analyzer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
    }),
    analyzer(),
  ],
  // build: {
  //   rollupOptions: {
  //     output: {
  //       manualChunks(id) {
  //         if (id.includes('ag-grid')) {
  //           return 'ag-grid'; // 单独拆 ag-grid 相关代码
  //         }
  //         // 其它库可按需拆分
  //       }
  //     }
  //   }
  // }
});
