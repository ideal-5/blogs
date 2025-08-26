import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        AutoImport({
            imports: ['vue', 'vue-router'],
            vueTemplate: false,
            dts: 'src/types/auto-imports.d.ts',
        }),
        UnoCSS(),
        vue(),
    ],
    server: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3000',
                changeOrigin: true,
                // rewrite: path => path.replace(/^\/proxy-prefix/, ''),
            },
        },
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
})
