<template>
  <div style="margin-top: 100px">
    <div style="width:100%;text-align: center">
      <div style="width:1200px;display: inline-block">
        <div v-for="item in lists" style="display:inline-block;width: 200px;margin: 3px">
          <router-link target="_blank" :to="{name:'g_detail',params:{id:item.id}}">
            <img style="width: 100%;height: 200px;object-fit: cover" :src="item.cover">
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {goodsLists,categoryList} from '@/api/shopping'
  export default {
    name: 'm_home',
    data() {
      return {
        lists:null,
        category:[
          { title:'购 物',subtitle:'Shopping',},
          { title:'拍 卖',subtitle:'Auction',},
          { title:'交 换',subtitle:'exchange',},
          { title:'闲 置',subtitle:'Idle',},
          { title:'赠 送',subtitle:'Present',},
          { title:'导 购',subtitle:'Guide',},
        ]
      }
    },
    components:{  },
    mounted() {
        this.getList()
    },
    methods: {
        async getList(){
            const {data} = await goodsLists({page:1,pageSize:10})
            this.lists = data.data
        }
    },
  }
</script>

<style lang="scss" scoped>

</style>

