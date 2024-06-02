/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import checker from 'vite-plugin-checker'

export default defineConfig({
  plugins: [react(), tsconfigPaths(), checker({ typescript: true })],

  server: {
    host: true,
    port: 3000
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "src/utils/variables.scss";
          @import "src/utils/mixins.scss";`
      }
    }
  },

  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    include: ['**/test.{tsx,ts}'],
    setupFiles: ['./vitest.setup.ts']
  }
})
