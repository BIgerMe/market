<template>
  <div class="top-bar-container">
    <div class="vab-main">
      <el-row>
        <el-col style="text-align: right;background: #0c0c0c">
          <div style="display: inline-block">
            <el-menu
            :text-color="variables['menu-color']"
            :active-text-color="variables['menu-color-active']"
            :default-active="activeMenu"
            mode="horizontal"
            menu-trigger="hover"
            >
              <template v-for="route in routes">
                <vab-side-bar-item
                  v-if="!route.hidden"
                  :key="route.path"
                  :full-path="route.path"
                  :item="route"
                />
              </template>
            </el-menu>
          </div>
          <div style="display: inline-block">
            <vab-avatar />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import variables from '@/styles/variables.scss'
  import { mapGetters } from 'vuex'

  export default {
    name: 'NTopBar',
    data() {
      return {
        pulse: false,
        menuTrigger: 'hover',
      }
    },
    computed: {
      ...mapGetters({
        routes: 'routes/routes',
        visitedRoutes: 'tabsBar/visitedRoutes',
      }),
      activeMenu() {
        const route = this.$route
        const { meta, path } = route
        if (meta.activeMenu) {
          return meta.activeMenu
        }
        return path
      },
      variables() {
        return variables
      },
    },
    methods: {
      async refreshRoute() {
        this.$baseEventBus.$emit('reload-router-view')
        this.pulse = true
        setTimeout(() => {
          this.pulse = false
        }, 1000)
      },
    },
  }
</script>
<style lang="scss" scoped>
  .el-menu{
    background-color:#00000000;
  }
  .el-menu.el-menu--horizontal{
    border-bottom: 0;
  }
</style>
