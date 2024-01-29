<script setup lang="ts">
import { computed } from "vue";
import { IData } from "../interfaces/data";

const className = computed(() => {
    let isUserMsg =
        props.data.user.name.trim().toLowerCase() ===
        props.name.trim().toLocaleLowerCase();
    return isUserMsg ? "me" : "user";
});
const props = defineProps<{
    data: IData;
    name: string;
}>();
</script>

<template>
    <div :class="['message', className]">
        <span class="user">{{ data.user.name }}</span>
        <div class="text">{{ data.message }}</div>
    </div>
</template>

<style scoped>
.message {
    width: max-content;
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    width: 100%;
}

.text {
    padding: 10px;
    border-radius: 12px;
    font-size: 15px;
    color: #fff;
}

.user {
    font-size: 14px;
    color: rgb(176, 176, 176);
}

.user {
    align-items: flex-start;
}

.user .text {
    background: #514c4c;
}

.user .user {
    padding-left: 10px;
}

.me {
    align-items: flex-end;
}

.me .text {
    background: #0d49d7;
}

.me .user {
    padding-right: 10px;
}
</style>
