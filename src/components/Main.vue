<template>
    <div class="pa-3">
        <home-page  v-if="inHomePage"/>
        <about-page v-else-if="inAboutPage"/>
        <contact-us-page v-else-if="inContactUsPage"/>
        <posts-page v-else-if="inPostsPage"/>
    </div>
</template>


<script>
    import { defineComponent } from 'vue';
    import HomePage      from "../pages/HomePage.vue";
    import AboutPage     from "../pages/AboutPage.vue";
    import ContactUsPage from "../pages/ContactUsPage.vue";
    import PostsPage     from "../pages/PostsPage.vue";

    export default defineComponent({
        name: "Main",

        /** DATA */
        data() {
            return {

            }
        },

        /** PROPS */
        props: {
            page: {
                type    : String,
                required: true
            }
        },

        /** COMPONENTS */
        components: {
            'home-page'      : HomePage,
            'about-page'     : AboutPage,
            'contact-us-page': ContactUsPage,
            'posts-page'     : PostsPage
        },

        /** COMPUTED PROPERTIES */
        computed: {
            /**
             * Computed page is 'home' or not.
             * @returns {boolean}
             */
            inHomePage() {
                return this.page === 'home';
            },

            /**
             * Computed page is 'about' or not.
             * @returns {boolean}
             */
            inAboutPage() {
                return this.page === 'about';
            },

            /**
             * Computed page is 'contact' or not.
             * @returns {boolean}
             */
            inContactUsPage() {
                return this.page === 'contact';
            },

            /**
             * Computed page is 'posts' or not.
             * @returns {boolean}
             */
            inPostsPage() {
                return this.page === 'posts';
            }
        }
    })
</script>


<style scoped>

</style>
