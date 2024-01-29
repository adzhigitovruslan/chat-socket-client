<script setup lang="ts">
import { ref, Ref } from "vue";
import socket from "../api/socket";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import VMessages from "../components/VMessages.vue";
import { IData } from "../interfaces/data";
import { IQuery } from "../interfaces/data";

const router = useRouter();
const route = useRoute();
const state: Ref<IData[]> = ref([]);
const searchQuery = ref(route.query) as Ref<IQuery>; // Remove name & room from queries to some variables
const message = ref("");
const isOpen = ref(false);
const users = ref(0);

socket.connect();
socket.emit("join", searchQuery.value);
socket.on("message", ({ data }) => {
    state.value.push(data);
});
socket.on("room", ({ data }) => {
    users.value = data.users.length;
});

const leftRoom = () => {
    socket.emit("leftRoom", { searchQuery: searchQuery.value });
    router.push("/");
};
const handleSubmit = () => {
    if (!message.value) return;

    socket.emit("sendMessage", {
        message: message.value,
        searchQuery: searchQuery.value,
    });

    message.value = "";
};
// const onEmojiClick = () => {};
</script>

<template>
    <div class="wrap">
        <div class="header">
            <div class="title">{{ searchQuery.room }}</div>
            <div class="users">{{ users }} users in this room</div>
            <button class="left" @click="leftRoom">Left the room</button>
        </div>

        <div class="messages">
            <VMessages :data="state" :name="searchQuery.name" />
        </div>

        <form class="form" @submit.prevent="handleSubmit">
            <div class="input">
                <input
                    type="text"
                    name="message"
                    placeholder="What do you want to say?"
                    v-model="message"
                    autoComplete="off"
                    required />
            </div>
            <div class="emoji">
                <img
                    src="../assets/emoji.svg"
                    alt="emoji"
                    @click="isOpen = !isOpen" />

                <!-- <div class="emojies" v-if="isOpen">
                    <EmojiPicker onEmojiClick="onEmojiClick" />
                </div> -->
            </div>

            <div class="button">
                <input
                    type="submit"
                    @submit.prevent="handleSubmit"
                    value="Send a message" />
            </div>
        </form>
    </div>
</template>

<style scoped>
.wrap {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    color: #fff;
    padding: 15px 0;
}

.header {
    width: 100%;
    color: #fff;
    background: #333;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
}

.title {
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
}

.left {
    background: rgb(253, 73, 73);
    border-radius: 6px;
    font-size: 14px;
    padding: 10px;
    color: #fff;
    cursor: pointer;
}

.form {
    color: #fff;
    width: 100%;
    display: flex;
    align-items: center;
    background: rgb(51, 51, 51);
    justify-content: space-between;
    height: 80px;
    padding: 0 20px;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
}

.input {
    flex-grow: 1;
    height: 100%;
}

.input input {
    width: 100%;
    height: 100%;
    color: #fff;
    font-size: 18px;
    font-weight: 500;
}

.button {
    text-align: center;
}

.button input {
    cursor: pointer;
    color: #fff;
}

.messages {
    flex-grow: 1;
    width: 100%;
    color: #fff;
    font-size: 18px;
    background: rgb(35, 35, 35);
    padding: 32px;
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
