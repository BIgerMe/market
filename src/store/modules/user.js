import { defineStore } from 'pinia'

export const useUserStore = defineStore({
    id: 'user', // id必填，且需要唯一
    state: () => {
        return {
            name: '张三asd'
        }
    },
    getters: {},
    actions: {
        updateName(name) {
            this.name = name
        }
    },
})
