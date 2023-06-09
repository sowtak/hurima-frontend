import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
const path = require('path')

export default () => {
    return defineConfig({
        base: '',
        root: './',
        server: {
            port: 5173
        },
        define: {
            global: {},
        },
        plugins: [react()],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            }
        }
    })
}