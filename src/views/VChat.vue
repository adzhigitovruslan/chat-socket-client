<script setup lang="ts">
import { ref, Ref } from "vue";
import { useRoute } from "vue-router";
// import { useRouter } from "vue-router";
import { IData } from "../interfaces/data";
import { IQuery } from "../interfaces/data";
import socket from "../api/socket";
import VMessages from "../components/VMessages.vue";
import EmojiPicker from "@/components/UI/EmojiPicker.vue";

// const router = useRouter();
const route = useRoute();
const state: Ref<IData[]> = ref([]);
const searchQuery = ref(route.query) as Ref<IQuery>; // Remove name & room from queries to some variables
const message = ref("");
const isEmojiOpen = ref(false);
const users = ref(0);

socket.connect();
socket.emit("join", searchQuery.value);
socket.on("message", ({ data }) => {
    state.value.push(data);
});
socket.on("room", ({ data }) => {
    users.value = data.users.length;
});

// const leftRoom = () => {
//     socket.emit("leftRoom", { searchQuery: searchQuery.value });
//     router.push("/");
// };
const handleSubmit = () => {
    if (!message.value) return;

    socket.emit("sendMessage", {
        message: message.value,
        searchQuery: searchQuery.value,
    });

    message.value = "";
};

const onSelectEmoji = (emoji: string) => {
    message.value += emoji;
};
</script>

<template>
    <v-app>
        <v-container class="d-flex flex-fill" fluid>
            <v-row class="ma-0">
                <!-- <v-col col="12" sm="3">asdf</v-col> -->
                <v-col col="12" class="d-flex flex-column col-wrapper">
                    <v-card
                        class="chat h-100 d-flex flex-column rounded-0 rounded-t">
                        <v-toolbar class="pa-3 chat__header">
                            <v-badge
                                bordered
                                bottom
                                color="green"
                                dot
                                offset-x="2"
                                offset-y="32">
                                <v-avatar size="40" elevation="10">
                                    <img
                                        src="https://cdn.vuetifyjs.com/images/lists/1.jpg" />
                                </v-avatar>
                            </v-badge>
                            <v-card-item>
                                <v-card-title> Fernando Gaucho </v-card-title>
                                <v-card-subtitle>
                                    last seen recently
                                </v-card-subtitle>
                            </v-card-item>

                            <v-spacer></v-spacer>

                            <v-btn color="blue" icon>
                                <v-icon>fas fa-search</v-icon>
                            </v-btn>

                            <v-btn color="blue" icon>
                                <v-icon>fa-solid fa-ellipsis</v-icon>
                            </v-btn>
                        </v-toolbar>
                        <v-divider></v-divider>
                        <v-list lines="two" class="flex-fill chat__list">
                            <div class="chat-container">
                                <VMessages
                                    v-for="(message, index) in state"
                                    :key="index"
                                    :data="message" />
                            </div>
                        </v-list>
                        <v-divider></v-divider>

                        <EmojiPicker
                            @emoji_click="onSelectEmoji"
                            v-if="isEmojiOpen" />
                        <v-form class="form" @submit.prevent="handleSubmit">
                            <v-btn
                                @click="isEmojiOpen = !isEmojiOpen"
                                class="h-100"
                                variant="text"
                                :ripple="false">
                                <v-icon v-if="!isEmojiOpen"
                                    >fa-solid fa-face-smile
                                </v-icon>
                                <v-icon v-else>fa-solid fa-laugh-beam </v-icon>
                            </v-btn>
                            <v-text-field
                                hide-details
                                variant="solo"
                                v-model="message"
                                placeholder="Write a message...">
                            </v-text-field>
                            <v-btn
                                type="submit"
                                class="h-100"
                                variant="text"
                                :ripple="false">
                                <v-icon> fa-solid fa-paper-plane </v-icon>
                            </v-btn>
                        </v-form>
                    </v-card>

                    <!-- <div class="title">{{ searchQuery.room }}</div>
                    <div class="users">{{ users }} users in this room</div>
                    <button class="left" @click="leftRoom">
                        Left the room
                    </button> -->
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<style scoped lang="scss">
.col-wrapper {
    background: rgba(var(--v-theme-surface));
}

.chat {
    position: relative;

    &__header {
        background: none;
    }
    &__emoji {
        position: absolute;
    }
    &__list {
        height: calc(100svh - 220px);
    }
}
.form {
    display: flex;
    &__actions {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
.emoji {
    width: 40px;
    cursor: pointer;
    position: relative;
}

.emoji img {
    vertical-align: middle;
}

.emojies {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 100%;
}
</style>
