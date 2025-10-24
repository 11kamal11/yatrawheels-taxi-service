import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // absolute paths for Vercel deployment
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
    proxy: {
      '/api/odoo': {
        target: 'https://yatrawheels.odoo.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/odoo/, ''),
        cookieDomainRewrite: '',
        secure: false,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Response:', proxyRes.statusCode, req.url);
          });
        },
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
