import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { presetIcons } from 'unocss'

// https://vite.dev/config/
export default defineConfig({
    plugins: [UnoCSS(), presetIcons({
            collections: {
                carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default),
                mdi: () => import('@iconify-json/mdi/icons.json').then(i => i.default),
                logos: () => import('@iconify-json/logos/icons.json').then(i => i.default),
            },
        }), vue()],
})
