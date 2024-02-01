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
    <div class="form__wrapper">
        <v-form class="form" @submit.prevent="handleClick">
            <h1 class="form__title">Join</h1>
            <v-card class="mx-auto" max-width="400">
                <v-card-text>
                    <v-row>
                        <v-col>
                            <v-text-field
                                label="username"
                                prepend-icon="fa-solid fa-user-astronaut"
                                variant="solo-filled"
                                v-model="fields.name"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field
                                label="room"
                                color="primary"
                                prepend-icon="fa-solid fa-door-open"
                                variant="solo-filled"
                                v-model="fields.room"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions class="d-flex flex-column">
                    <v-btn type="submit" color="primary">
                        Enter the room
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </div>
</template>

<style scoped lang="scss">
.form {
    max-width: 400px;
    width: 100%;
    &__wrapper {
        padding: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100svh;
    }
    &__title {
        font-size: 40px;
        color: rgb(var(--v-theme-primary)) !important;
        line-height: 2;
        text-align: center;
    }
}
</style>
