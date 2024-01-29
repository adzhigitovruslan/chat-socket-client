<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const fields = reactive({
    name: "",
    room: "",
});

const handleClick = () => {
    if (!(fields.name && fields.room)) {
        return;
    }

    router.push(`/chat?name=${fields.name}&room=${fields.room}`);
};
</script>

<template>
    <div class="wrap">
        <div class="container">
            <h1 class="heading">Join</h1>
            <form class="form">
                <div class="group">
                    <input
                        type="text"
                        :name="fields.name"
                        v-model="fields.name"
                        placeholder="Username"
                        class="input"
                        autoComplete="off"
                        required />
                </div>
                <div class="group">
                    <input
                        type="text"
                        :name="fields.room"
                        placeholder="Room"
                        v-model="fields.room"
                        class="input"
                        autoComplete="off"
                        required />
                </div>

                <div class="group" @click.prevent="handleClick">
                    <button type="submit" class="button">Sign In</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
.wrap {
    width: 100%;
    height: 100vh;
}
.container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.heading {
    font-size: 32px;
    line-height: 48px;
    text-align: center;
    color: #fff;
}

.form {
    display: flex;
    flex-direction: column;
    row-gap: 12px;
    margin-top: 20px;
}

.group {
    min-width: 320px;
    border-radius: 12px;
    height: 48px;
    overflow: hidden;
}

.input {
    background: rgb(48, 43, 43);
    width: 100%;
    height: 100%;
    color: #fff;
    text-indent: 20px;
    font-size: 16px;
}

.button {
    cursor: pointer;
    width: 100%;
    height: 100%;
    background: #0d49d7;
    font-size: 16px;
    font-weight: 700;
    color: #fff;
}
</style>
