import { i18nService } from '../services/i18n.js'

export default {
    props: ['book'],
    template: `
        <section>
            <p>Name: {{book.title}}</p>
            <p>Price: {{currencySym}}</p>
        </section>    
    `,
    data() {
        return {
            currency: null,
        }
    },
    methods: {},
    computed: {
        currencySym() {
            return i18nService.getCurrency(this.book)
        }
    },
    created() {

    },
    destroyed() { }
}