import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: { alias: { '@': '/src' }, // 필요 시 경로 별칭 설정
            extensions: ['.js', '.jsx', '.json'], // 확장자 우선 순위
  },
  server: {
    // 포트번호 변경
    port: 3333,
    // 서버 프록시 설정
    proxy: {
      '/api': {
        target: 'https://localhost:7777',  
        changeOrigin: true,   
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''), // '/api'를 제거
      },
    }
  }
});