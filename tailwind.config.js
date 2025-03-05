/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",  // 루트 HTML 파일
    "./src/**/*.{js,jsx,ts,tsx}",  // src 폴더 내부 모든 JS/TSX 파일에 적용
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

