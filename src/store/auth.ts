import { defineStore } from 'pinia'
import {RESET_AUTH, SAVE_AUTH} from "@/store/actionTypes";

export const useAuthStore = defineStore('authStore', {
    state: () => ({ auth: null }),
    getters: {
        // doubleCount: (state) => state.count * 2,
    },
    actions: {
        [SAVE_AUTH](data:any) {
            this.auth = data
        },
        [RESET_AUTH]() {
            this.auth = null
        },
    },
    persist: true
})