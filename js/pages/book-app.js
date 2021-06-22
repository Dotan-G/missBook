import { booksService } from '../services/books-service.js'
import bookList from '../cmps/book-list.js'
import bookFilter from '../cmps/book-filter.js'
import bookDetails from './book-details.js'

export default {
    components: {
        bookFilter,
        bookDetails,
        bookList,
    },
    template: `
        <section class:="book-app">
            <div>
                <book-filter @filter="setFilter" />
                <book-list :books="booksToShow" />
            </div>
        </section>
    `,
    data() {
        return {
            books: null,
            filterBy: null,
            selectedBook: null,
        }
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy
        },
        openDetails(bookId) {
            const book = booksService.getBookById(bookId)
            this.selectedBook = book
        },
        closeDetails() {
            this.selectedBook = null
        }
    },
    computed: {
        booksToShow() {
            if (!this.filterBy ||
                (this.filterBy.title === '' &&
                    this.filterBy.minPrice === '' &&
                    this.filterBy.maxPrice === '')) return this.books
            if (this.filterBy.minPrice === '') this.filterBy.minPrice = 0;
            if (this.filterBy.maxPrice === '') this.filterBy.maxPrice = Infinity;
            const searchStr = this.filterBy.title.toLowerCase()
            const booksToShow = this.books.filter((book) => {
                return (
                    book.title.toLowerCase().includes(searchStr) &&
                    book.listPrice.amount >= this.filterBy.minPrice &&
                    book.listPrice.amount < this.filterBy.maxPrice
                );
            })
            return booksToShow
        }
    },
    created() {
        this.books = booksService.getBooksList()
    },
    destroyed() {

    },
}


// {/* <router-link :to="'/book/'+book.id">Details</router-link> */}