import { defineConfig, presetWind3, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
    presets: [
        presetWind3(),
        presetAttributify(), // 属性化
        presetIcons({
            scale: 1.2,
            warn: true,
            extraProperties: {
                display: 'inline-block',
                'vertical-align': 'middle',
            },
        }),
    ],
})
