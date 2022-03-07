<template>
  <div>{{ userStore.name }}</div>
  <button @click="userStore.updateName('李四')">123</button>
</template>

<script >
    import { useUserStore } from '@/store/modules/user'
    export default {
      name: 'shopping_home',
      data() {
        return {
            userStore:useUserStore()
        }
      },
      computed: {

      },
      components:{  },
      mounted() {

      },
      methods: {

      },
    }
</script>
