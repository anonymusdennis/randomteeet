import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base path for GitHub Pages deployment
  // Set to '/<repo-name>/' for GitHub Pages, or '/' for custom domain
  base: process.env.GITHUB_PAGES ? '/randomteeet/' : '/',
})
