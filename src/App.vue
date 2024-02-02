<template>
    <v-layout class="rounded rounded-md">
        <v-app-bar :title="title">
            <template v-slot:prepend>
                <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            </template>
            <template v-slot:append>
                <v-switch
                    v-model="isDark"
                    hide-details
                    :inset="true"
                    label="Dark Mode"
                    @change="toggleTheme"
                >
                </v-switch>
            </template>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" :permanent="true">
            <v-card
                class="mx-auto pa-2"
                max-width="300"
                variant="flat"
            >
                <v-list>
                    <router-link
                        v-for="(sidebarItem, sidebarItemIndex) in sidebar.items"
                        :key="sidebarItem.id"
                        :value="sidebarItem"
                        :to="`/${sidebarItem.id}`"
                        tag="v-list-item"
                        color="primary"
                        rounded="xl"
                        class="my-1"
                        :active-class="'active'"
                    >
                        <template v-slot:prepend>
                            <v-icon :icon="sidebarItem.icon"></v-icon>
                        </template>

                        <v-list-item-title v-text="sidebarItem.text"></v-list-item-title>
                    </router-link>
                </v-list>
            </v-card>
        </v-navigation-drawer>

        <v-main>
            <router-view/>
        </v-main>
    </v-layout>
</template>


<script>
    import { defineComponent } from 'vue';
    import Main    from "./components/Main.vue";

    export default defineComponent({
        name: 'App',

        /** DATA */
        data() {
            return {
                title : "Louie's Final",
                isDark: true,
                drawer: true,
                sidebar: {
                    items: [
                        { id: 'home'   , text: 'Home'      , icon: 'mdi-home'         },
                        { id: 'posts'  , text: 'Posts'     , icon: 'mdi-chat-outline' },
                        { id: 'about'  , text: 'About'     , icon: 'mdi-information'  },
                        { id: 'contact', text: 'Contact Us', icon: 'mdi-account-box'  },
                    ],
                }
            }
        },

        /** COMPONENTS */
        components: {

        },

        /** METHODS */
        methods: {
            toggleTheme() {
                this.$vuetify.theme.global.name = this.isDark ? 'dark' : 'light';
            }
        }
    });
</script>


<style>

</style>
