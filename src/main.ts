import { createApp } from 'vue'
import { createPinia } from 'pinia'
import AppLayout from '@/admin/layouts/AppLayout.vue';
import '@/scss/app.scss';
import router from './router';
import Antd from 'ant-design-vue';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { PiniaLogger } from "pinia-logger";

function main() {
    const  app = createApp(AppLayout);
    const pinia = createPinia()
    pinia.use(piniaPluginPersistedstate)
    pinia.use(
        PiniaLogger({
            expanded: true,
            // disabled: process.env.mode === "production",
            // use a filter to only log certain actions
            // filter: ({ name }) => name !== "incrementCounter",
            // alternatively, you can specify the actions you want to log
            // if undefined, all actions will be logged
            // actions: ["decrementCounter"],
        })
    );
    app.use(Antd)
    app.use(pinia);
    app.use(router);
    app.mount('#app');
}

main();
