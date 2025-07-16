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
            dts:'src/types/auto-imports.d.ts'
        }),
        UnoCSS(),
        vue(),
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
})
