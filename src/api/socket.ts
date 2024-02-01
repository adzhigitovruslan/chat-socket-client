import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
    connected: false,
    fooEvents: [],
    barEvents: [],
});

const URL = "https://chat-app-wp3k.onrender.com"
// import.meta.env.NODE_ENV === "production" ? 
//  :  "http://localhost:3000";

const socket = io(URL);

// socket.on("connect", () => {
//     state.connected = true;
// });

// socket.on("disconnect", () => {
//     state.connected = false;
// });

// socket.on("foo", (...args) => {
//     // state.fooEvents.push(args);
// });

// socket.on("bar", (...args) => {
//     // state.barEvents.push(args);
// });

export default socket;
