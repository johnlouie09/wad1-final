<template>
    <div>
        <!-- Post Box -->
        <div class="pb-3">
            <v-textarea variant="outlined" label="What's on your mind?" v-model="content" class="mb-3" :hide-details="true"></v-textarea>
            <div class="d-flex justify-end align-center">
                <div class="d-inline">
                    <v-select :items="users" v-model="user" class="mr-3" density="compact" variant="outlined" :hide-details="true"/>
                </div>
                <v-btn variant="flat" color="primary" @click="post">Post</v-btn>
            </div>
        </div>

        <!-- Posts -->
        <div v-for="(post, postIndex) in posts" :key="post.id">
            <v-card class="my-5">
                <!-- Post Header -->
                <v-card-title class="ml-3">
                    <div class="d-flex justify-space-between">
                        <h5 class="ma-0">
                            <v-icon icon="mdi-account-circle"/>
                            {{ post.user }}
                        </h5>
                        <div class="d-flex justify-end align-center">
                            <h6 class="ma-0" style="opacity: 0.3">{{ post.time }}</h6>
                            <v-icon icon="mdi-delete-outline" size="small" class="ml-2" style="opacity: 0.5" @click="deletePost(postIndex)"/>
                        </div>
                    </div>
                </v-card-title>

                <!-- Post Content -->
                <v-card-text class="mx-3">
                    <p style="font-size: 1.1rem;">{{ post.content }}</p>
                </v-card-text>

                <!-- Post Actions -->
                <v-card-actions class="justify-end mx-3">
                    <div class="mr-3">
                        <v-icon class="mr-1" :icon="post.comments.items.length > 0 ? 'mdi-chat' : 'mdi-chat-outline'" color="primary"/>
                        <span class="text-primary">{{ post.comments.items.length }}</span>
                    </div>
                    <div @click="post.likes += 1" style="cursor: pointer;">
                        <v-icon class="mr-1" :icon="post.likes > 0 ? 'mdi-heart' : 'mdi-heart-outline'" color="error"/>
                        <span class="text-error">{{ post.likes }}</span>
                    </div>
                </v-card-actions>

                <!-- Post Comments -->
                <v-card-text>
                    <v-card v-for="(comment, commentIndex) in post.comments.items" :key="comment.id" :flat="true">
                        <v-divider/>

                        <!-- Comment Header -->
                        <v-card-title class="pr-0">
                            <div class="d-flex justify-space-between">
                                <h5 class="ma-0">
                                    <v-icon icon="mdi-account-circle"/>
                                    {{ comment.user }}
                                </h5>
                                <div class="d-flex justify-end align-center">
                                    <h6 class="ma-0" style="opacity: 0.3">{{ comment.time }}</h6>
                                    <v-icon icon="mdi-delete-outline" size="x-small" class="ml-2" style="opacity: 0.5" @click="deleteComment(post, commentIndex)"/>
                                </div>
                            </div>
                        </v-card-title>

                        <!-- Comment Content -->
                        <v-card-text>
                            {{ comment.content }}
                        </v-card-text>

                        <!-- Comment Actions -->
                        <v-card-actions class="justify-end">
                            <div @click="comment.likes += 1" style="cursor: pointer;">
                                <v-icon class="mr-1" :icon="comment.likes > 0 ? 'mdi-heart' : 'mdi-heart-outline'" color="error"/>
                                <span class="text-error">{{ comment.likes }}</span>
                            </div>
                        </v-card-actions>
                    </v-card>
                </v-card-text>

                <!-- Post Comment Box -->
                <v-card-actions class="justify-end mx-3">
                    <div class="w-100">
                        <v-textarea v-model="post.comments.content" variant="outlined" class="mb-2" label="Write a comment" rows="2" :hide-details="true"/>
                        <div class="d-flex justify-end align-center">
                            <div class="d-inline">
                                <v-select :items="users" v-model="post.comments.user" class="mr-3" density="compact" variant="outlined" :hide-details="true"/>
                            </div>
                            <v-btn color="primary" variant="flat" @click="comment(post)">Comment</v-btn>
                        </div>
                    </div>
                </v-card-actions>
            </v-card>
        </div>
    </div>
</template>


<script>
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: "PostsPage",


        data() {
            return {
                id     : 0,
                posts  : [],
                content: '',
                users: [
                    'Daniel',
                    'Kathryn',
                    'Juan',
                    'Pedro',
                    'Maria'
                ],
                user: 'Daniel'
            }
        },


        methods: {
            /**
             * @method post
             * @description Add a new post.
             */
            post() {
                if(this.content.trim() !== '') {
                    this.id += 1;
                    this.posts.unshift({
                        id      : this.id,
                        time    : new Date().toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true }),
                        user    : this.user,
                        content : this.content,
                        likes   : 0,
                        comments: {
                            id     : 0,
                            items  : [],
                            content: '',
                            user   : this.user
                        }
                    });
                    this.content = '';
                }
            },

            /**
             * @method comment
             * @description Add a comment to a given post.
             * @param {Object} post
             */
            comment(post) {
                if(post.comments.content !== '') {
                    post.comments.id += 1;
                    post.comments.items.push({
                        id      : post.comments.id,
                        time    : new Date().toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true }),
                        user    : post.comments.user,
                        content : post.comments.content,
                        likes   : 0
                    });
                    post.comments.content = '';
                }
            },

            /**
             * @method deletePost
             * @description Delete a post with a given index.
             * @param {number} index
             */
            deletePost(index) {
                const post = this.posts[index];
                if(post) {
                    if(confirm(`Delete post by ${post.user}?`)) {
                        this.posts.splice(index, 1);
                    }
                }
            },

            /**
             * @method deleteComment
             * @description Delete a comment with a given index from a given post.
             * @param {Object} post
             * @param {number} index
             */
            deleteComment(post, index) {
                const comment = post.comments.items[index];
                if(comment) {
                    if(confirm(`Delete comment by ${comment.user}?`)) {
                        post.comments.items.splice(index, 1);
                    }
                }
            }
        },


        created() {
            // dummy post
            this.content = "Nasa 'ye ne eng lehet...";
            this.post();

            // dummy comment
            this.posts[0].comments.content = 'Peti eng pese ke'
            this.comment(this.posts[0]);
        }
    })
</script>


<style scoped>

</style>
