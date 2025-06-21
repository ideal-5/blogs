<script setup lang="ts">
    import gsap from 'gsap'
    import { SplitText } from 'gsap/SplitText'
    import { onMounted } from 'vue'
    import { useDark, useToggle } from '@vueuse/core'

    const isDark = useDark({
        selector: 'html', // 作用在根元素
        attribute: 'class',
        valueDark: 'dark',
        valueLight: 'light',
    })
    const toggleDark = useToggle(isDark)
    onMounted(() => {
        gsap.registerPlugin(SplitText)

        const segmenter = new Intl.Segmenter('zh', { granularity: 'word' })
        document.fonts.ready.then(() => {
            gsap.set('.split', { opacity: 1 })
            SplitText.create('.split', {
                type: 'words',
                wordsClass: 'word',
                prepareText: (text, _el) => {
                    return [...segmenter.segment(text)]
                        .map(s => s.segment)
                        .join(String.fromCharCode(8204))
                },
                wordDelimiter: { delimiter: /\u200c/, replaceWith: '' },
                autoSplit: true,
                onSplit: self => {
                    return gsap.from(self.words, {
                        y: 50,
                        opacity: 0,
                        stagger: 0.1,
                        ease: 'back',
                    })
                },
            })
        })
    })

    const changeDark = (event: MouseEvent) => {
        const transition = document.startViewTransition(() => {
            toggleDark()
        })
        transition.ready.then(() => {
            const { clientX, clientY } = event

            const radius = Math.hypot(
                Math.max(clientX, innerWidth - clientX),
                Math.max(clientY, innerHeight - clientY)
            )

            const clipPath = [
                `circle(0px at ${clientX}px ${clientY}px)`,
                `circle(${radius}px at ${clientX}px ${clientY}px)`,
            ]

            const isDark = document.documentElement.classList.contains('dark')

            document.documentElement.animate(
                {
                    clipPath: isDark ? clipPath.reverse() : clipPath,
                },
                {
                    duration: 800,
                    easing: 'ease-in-out',
                    pseudoElement: isDark
                        ? '::view-transition-old(root)'
                        : '::view-transition-new(root)',
                }
            )
        })
    }
</script>

<template>
    <div class="size-full h-100vh text-#FFFCE1 bg-#0E100F lt-sm:bg-red f-c-c dark:bg-red">
        <div class="split text-10">
            大漠孤洲起星芒，天外孤魂牵断肠 自身本是轮回客，不知何处话桑麻
        </div>
        <button @click="changeDark" class="p-2 rounded-lg bg-gray-200">
            {{ isDark ? '🌙' : '☀️' }}
        </button>

        <a href="https://beian.miit.gov.cn" target="_blank" class="fixed bottom-1"
            >陕ICP备2025071212号</a
        >
    </div>
</template>

<style scoped>
    ::view-transition-old(root),
    ::view-transition-new(root) {
        animation: none;
        mix-blend-mode: normal;
    }

    ::view-transition-old(root) {
        z-index: 1;
    }

    ::view-transition-new(root) {
        z-index: 2147483646;
    }

    html.dark::view-transition-old(root) {
        z-index: 2147483646;
    }

    html.dark::view-transition-new(root) {
        z-index: 1;
    }
</style>
