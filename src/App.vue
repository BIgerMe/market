<template>
  <div id="zyf" v-cloak>
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App',
    mounted() {},
  }
</script>
<style type="scss" scoped>
  [v-cloak] {
    display: none;
  }
</style>
