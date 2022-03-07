<template>
  <div>{{ userStore.name }}</div>
  <div>444</div>
</template>

<script>
    import { useUserStore } from '@/store/modules/user'

    export default {
    name: 'login',
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
