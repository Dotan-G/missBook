import { utilService } from "../services/util-service.js"
import { booksService } from '../services/books-service.js'

export default {
    template: `
        <section class="add-addReview">
            <form @submit.prevent="save">
                <label for="name">Full Name:</label>
                <input type="text" placeholder="Full Name" id="name" v-model="review.fullName">
                <label for="review-content">Enter your review</label>
                <input type="text" placeholder="add review..." id="review-content" v-model="review.comment">
                <label for="rate">Rate the book:</label>
                <select name="rate" id="rate" v-model="review.rate">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <input type="date" v-model="review.readAt">
                <button>Save</button>
            </form>
            <br>
            <br>
            <h4>{{review}}</h4>
            <h5>{{pastReviews}}</h5>
        </section>
    `,
    data() {
        return {
            pastReviews: utilService.loadFromStorage('reviewDB') || [],
            review: {
                fullName: null,
                comment: null,
                rate: null,
                readAt: null,
            },
            book: null
        }
    },
    methods: {
        save() {
            if (!this.review.fullName || !this.review.comment || !this.review.rate) return
            const data = {
                bookId: this.book.id,
                review: this.review,
            }
            this.pastReviews.push(data)
            utilService.saveToStorage('reviewDB', this.pastReviews)
            this.pastReviews = utilService.loadFromStorage('reviewDB')
            this.review.fullName = null
            this.review.comment = null
            this.review.rate = null
        }
    },
    computed: {},
    created() {
        const { bookId } = this.$route.params
        this.book = booksService.getBookById(bookId)
    },
    destroyed() { },
    mounted() {

    }
}