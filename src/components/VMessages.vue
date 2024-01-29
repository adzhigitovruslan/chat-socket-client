<script setup lang="ts">
import { IData } from "../interfaces/data";
import VMessageItem from "./VMessageItem.vue";

const props = defineProps<{
    data: IData[];
    name: string;
}>();
</script>

<template>
    <div class="messages">
        <VMessageItem
            v-for="(message, index) in data"
            :key="index"
            :data="message"
            :name="props.name" />
    </div>
</template>

<style scoped>
.messages {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
}


</style>
