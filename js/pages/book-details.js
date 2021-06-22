import { booksService } from '../services/books-service.js'
import { i18nService } from '../services/i18n.js'
import longDesc from '../cmps/book-details-desc.js'
import addReview from './add-review.js'


export default {
    components: {
        longDesc,
        addReview,
    },
    template: `
        <section class="book-details">
            <h3>Name: {{book.title}}</h3>
            <p><span>Subtitle:</span> {{book.subtitle}}</p>
            <p v-for="author in book.authors"><span>Author:</span> {{author}}</p>
            <p><span>Number of pages:</span> {{numOfPages}}</p>
            <p><span>categories:</span> </p>
            <span v-for="category in book.categories">{{category}} </span>
            <p><span>price:</span> {{this.currencySym}}</p>
            <p><span>publish date:</span> {{publish}}</p>
            <img class="on-sale" src="./imgs/sale.png" v-if="isOnSale">
            <div v-if="!chars || !allDesc" class="short-description">
                <p><span>Description:</span> {{desc}}</p>
                <button v-if="chars" @click="showAllDesc">show more</button>
            </div>
            <long-desc v-if="allDesc" :book="book" />
            <button v-if="allDesc" @click="showAllDesc">show less</button>
            <router-link to="/book">
                <button @click="$emit('close')">X</button>
            </router-link>
            <add-review />
        </section>
    `,
    data() {
        return {
            book: null,
            pages: null,
            publishedYearsAgo: null,
            onSale: false,
            charAmount: null,
            allDesc: false,
        }
    },
    methods: {
        showAllDesc() {
            return this.allDesc = !this.allDesc
        }
    },
    computed: {
        currencySym() {
            return i18nService.getCurrency(this.book)
        },
        numOfPages() {
            if (this.book.pageCount > 500)
                return this.pages = 'Long Reading ' + this.book.pageCount + ' pages'
            if (this.book.pageCount > 200)
                return this.pages = 'Decent reading ' + this.book.pageCount + ' pages'
            if (this.book.pageCount < 100)
                return this.pages = 'light reading ' + this.book.pageCount + ' pages'
            else return this.pages = this.book.pageCount
        },
        publish() {
            if ((new Date().getYear() + 1900) - this.book.publishedDate > 10)
                return this.publishedYearsAgo = 'Veteran Book'
            else return this.publishedYearsAgo = 'New!'
        },
        isOnSale() {
            if (this.book.listPrice.isOnSale) return this.osSale = true;
        },
        chars() {
            return this.book.description.length > 100;
        },
        desc() {
            if (!this.chars) return this.book.description.substring(0, 100)
            else return this.book.description.substring(0, 100) + '...'
        },
        description() {

        }
    },
    created() {
        const { bookId } = this.$route.params
        this.book = booksService.getBookById(bookId)
    },
    destroyed() {

    }
}