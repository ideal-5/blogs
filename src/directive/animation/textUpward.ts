import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

export default {
    mounted(el: HTMLElement) {
        gsap.registerPlugin(SplitText)
        const segmenter = new Intl.Segmenter('zh', { granularity: 'word' })
        document.fonts.ready.then(() => {
            gsap.set(el, { opacity: 1 })
            SplitText.create(el, {
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
    },
}
