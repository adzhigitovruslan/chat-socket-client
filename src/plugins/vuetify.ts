import { aliases, fa } from "vuetify/iconsets/fa";
import { createVuetify } from "vuetify";
import "vuetify/styles";
import "@fortawesome/fontawesome-free/css/all.css";

export default createVuetify({
    theme: {
        defaultTheme: "dark",
    },
    icons: {
        defaultSet: "fa",
        aliases,
        sets: {
            fa,
        },
    },
});
