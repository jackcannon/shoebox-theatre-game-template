/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
    // The engine package is built for bundlers (extensionless imports and CSS imports), so Vite must process it.
    server: { deps: { inline: ['shoeboxtheatre'] } },
  },
})
