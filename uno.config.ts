import {
    defineConfig,
    presetWind3,
    presetAttributify,
    presetIcons,
    transformerDirectives,
    transformerVariantGroup,
} from 'unocss'

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
    transformers: [
        // 启用 @apply 功能
        transformerDirectives(),
        // 启用 () 分组功能
        // 支持css class组合，eg: `<div class="hover:(bg-gray-400 font-medium) font-(light mono)">测试 unocss</div>`
        transformerVariantGroup(),
    ],
    /**
   * 自定义快捷语句
   * @see https://github.com/unocss/unocss#shortcuts
   */
  shortcuts: [
    ['f-c-c', 'flex justify-center items-center'],
    ['f-c', 'flex items-center'],
    ['f-c-w', 'flex items-center justify-between'],
    ['wf', 'wfull'],
    ['hf', 'hfull'],
  ],
})
