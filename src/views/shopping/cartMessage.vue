<template>
  <div style="position: relative">
    <div style="display: inline-block">
      <a-result
          status="success"
          title="商品已成功加入购物车"
          sub-title=""
      >
        <template #extra>
          <div style="text-align: left;margin-bottom: 10px;border-radius: 10px;background: #ffffff;box-shadow:  rgb(253 253 253) 5px 5px 3px, #fdfdfd -5px -5px 3px">
            <div style="display: inline-block">
              <img style="border-radius: 10px;height: 100px;width: 100px;object-fit: cover" :src="data.cover">
            </div>
            <div style="display: inline-block;padding: 0 20px;">
              <h3 style="overflow: hidden;text-overflow: ellipsis">{{data.title}}</h3>
              <p>{{data.num}} 件</p>
            </div>
          </div>
          <a-button key="console" type="primary">去结算</a-button>
          <a-button key="buy">继续逛逛</a-button>
        </template>
      </a-result>
    </div>
  </div>
</template>

<script>
    import { useUserStore } from '@/store/modules/user'
    import {cartDetail} from "@/api/shopping";

    export default {
    name: 'c_Message',
    data() {
      return {
          data : {
              cover:'',
          },
          userStore:useUserStore()
      }
    },
    components:{  },
    created() {
        this.fetchData()
    },
    methods: {
        async fetchData(){
            const { data } = await cartDetail({ id: this.$route.params.id })
            this.data = data
            console.log(this.data)
        }
    },
  }
</script>
