export default {
    props: ['book'],
    template: `
        <p><span>Description:</span> {{desc}}</p>
    `,
    data() {
        return {
            desc: this.book.description
        }
    },
    methods: {},
    computed: {},
    created() {
        this.desc = this.book.description
    },
    destroyed() { }
}