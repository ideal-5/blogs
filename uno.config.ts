import { defineConfig, presetWind3, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
    presets: [
        presetWind3(), // 官方预设
        presetAttributify(), // 属性化
        presetIcons({
            scale: 1.2,
            warn: true, // 启用警告输出，便于在开发时发现潜在配置或用法问题
            extraProperties: {
                display: 'inline-block',
                'vertical-align': 'middle',
            },
        }),
    ],
})
