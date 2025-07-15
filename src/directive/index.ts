import type { App } from 'vue'
import textUpward from './animation/textUpward'

export default function directive(app: App) {
    app.directive('textUpward', textUpward)
}
