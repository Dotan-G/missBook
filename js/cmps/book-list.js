import bookPreview from './book-preview.js'

export default {
    components: {
        bookPreview,
    },
    props: ['books'],
    template: `
    <ul class="book-list">
        <li v-for="book in books">
            <book-preview :book="book" />
            <router-link :to="'/book/'+book.id">Details</router-link>
        </li>
    </ul>
    `,
    data() {
        return {}
    },
    methods: {

    },
    computed: {},
    created() { },
    destroyed() { }
}