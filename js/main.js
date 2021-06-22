import appHeader from './cmps/app-header.js'
import appFooter from './cmps/app-footer.js'
import { router } from './router.js'

const options = {
    components: {
        appHeader,
        appFooter,
    },
    el: '#app',
    router,
    template: `
    <section>
        <app-header />
        <router-view />
        <app-footer />
    </section>
    `,
    data() {
        return {}
    },
    methods: {},
    computed: {},
    created() { },
    destroyed() { }
}

new Vue(options)