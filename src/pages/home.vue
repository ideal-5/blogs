<script setup lang="ts">
    import { useDark, useToggle } from '@vueuse/core'

    const isDark = useDark({
        selector: 'html', // 作用在根元素
        attribute: 'class',
        valueDark: 'dark',
        valueLight: 'light',
    })
    const toggleDark = useToggle(isDark)
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
        <div class="text-10" ref="split" v-textUpward>
            历经五十四次劫，劫云仍旧漫遮天。 胸中魂光压众生，拳里剑气纵北原。
            时来时去四百载，无死何能生新颜？ 弃此残躯换清风，卷席苍穹复光年！
        </div>
        <button @click="changeDark" class="p-2 rounded-lg bg-gray-200">
            {{ isDark ? '🌙' : '☀️' }}
        </button>
        <a href="https://beian.miit.gov.cn" target="_blank" class="fixed bottom-1">
            陕ICP备2025071212号
        </a>
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
