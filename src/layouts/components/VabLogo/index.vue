<template>
  <div :class="'logo-container-' + layout">
    <router-link to="/">
      <!-- 这里是logo变更的位置 -->
      <img style="width: auto;height: 100%" src="@/assets/logo/6.png">

<!--      <span-->
<!--        class="title"-->
<!--        :class="{ 'hidden-xs-only': layout === 'horizontal' }"-->
<!--        :title="title"-->
<!--      >-->
<!--        {{ title }}-->
<!--      </span>-->
    </router-link>
    &emsp;
    <a-input-search placeholder="搜索" v-model="content" style="width: 200px" @search="search()" />
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { bus } from '@/utils/bus'

  export default {
    name: 'VabLogo',
    data() {
      return {
        title: this.$baseTitle,
        content:'',
      }
    },
    computed: {
      ...mapGetters({
        logo: 'settings/logo',
        layout: 'settings/layout',
      }),
    },
    methods:{
      search(){
        bus.$emit('search',this.content)
      }
    }
  }
</script>
<style lang="scss" scoped>
  @mixin container {
    position: relative;
    height: $base-top-bar-height;
    overflow: hidden;
    line-height: $base-top-bar-height;
    background: $base-menu-background;
  }

  @mixin logo {
    display: inline-block;
    width: 28px;
    height: 28px;
    margin-right: 3px;
    color: $base-title-color;
    vertical-align: middle;
  }

  @mixin title {
    display: inline-block;
    overflow: hidden;
    font-size: 18px;
    line-height: 55px;
    color: $base-title-color;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
  }

  .logo-container-horizontal {
    @include container;

    .logo {
      @include logo;
    }

    .title {
      @include title;
    }
  }

  .logo-container-vertical {
    @include container;

    height: $base-logo-height;
    line-height: $base-logo-height;
    text-align: center;

    .logo {
      @include logo;
    }

    .title {
      @include title;

      max-width: calc(#{$base-left-menu-width} - 60px);
    }
  }
</style>
