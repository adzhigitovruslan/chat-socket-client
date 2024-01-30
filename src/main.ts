import { createApp } from "vue";
import router from "./router/router";
import { io } from "socket.io-client";
import "./style.css";
import App from "./App.vue";
import createVuetify from "./plugins/vuetify";

const app = createApp(App);
app.use(router);
app.use(io);
app.use(createVuetify);
app.mount("#app");
