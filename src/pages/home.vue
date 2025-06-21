<script setup lang="ts">
    import gsap from 'gsap'
    import { SplitText } from 'gsap/SplitText'
    import { onMounted } from 'vue'

    onMounted(() => {
        gsap.registerPlugin(SplitText)

        const segmenter = new Intl.Segmenter('zh', { granularity: 'word' })
        console.log('SplitText', SplitText)
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
</script>

<template>
    <div class="size-full h-100vh text-#FFFCE1 bg-#0E100F f-c-c">
        <div class="split text-10">
            大漠孤洲起星芒，天外孤魂牵断肠 自身本是轮回客，不知何处话桑麻
        </div>

        <a href="https://beian.miit.gov.cn" target="_blank" class="fixed bottom-1"
            >陕ICP备2025071212号</a
        >
    </div>
</template>

<style scoped lang="scss">
  
</style>
