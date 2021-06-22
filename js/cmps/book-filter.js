export default {
    template: `
        <section class="search">
            <label>Search:</label>
            <input type="search" 
                v-model="filterBy.title" 
                @input="filter" 
                placeholder="search..." />
            <input v-model="filterBy.minPrice" type="number" @input="filter">
            <input v-model="filterBy.maxPrice" type="number" @input="filter">
        </section>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                minPrice: 0,
                maxPrice: Infinity,
            }
        }
    },
    methods: {
        filter() {
            this.$emit('filter', { ...this.filterBy })
        }
    },
    computed: {},
    created() { },
    destroyed() { }
}
