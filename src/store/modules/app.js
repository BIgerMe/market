import { defineStore } from 'pinia'

export const useAppStore = defineStore({
    id: 'app', // id必填，且需要唯一
    state: () => {
        return {}
    },
    getters: {},
    actions: {},
})
