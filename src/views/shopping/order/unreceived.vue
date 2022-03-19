<template>
  <div style="width: 1000px;display:inline-block;border: 1px solid #eeeeee;margin-top:50px;">
    <div style="width: 1000px;display: inline-block;text-align: left">
      <a-list item-layout="horizontal" size="large" :data-source="data">
        <template #renderItem="{ item }">
          <a-list-item>
            <template #actions>
              <a-button type="primary" danger>去结算</a-button>
            </template>
            <a-list-item-meta>
              <template #avatar>
                <img
                  v-for="cart in item.cart"
                    style="width: 100px;height: 100px;object-fit: cover;padding: 3px"
                    alt="cover"
                    :src="cart.cover"
                />
              </template>
            </a-list-item-meta>
            <div>￥{{item.total}}</div>
          </a-list-item>
        </template>
      </a-list>
    </div>
  </div>
</template>

<script>
  import {useUserStore} from '@/store/modules/user'
  import {unpaid} from "@/api/shopping";

  export default {
    name: 'unpaid',
    data() {
      return {
        data: [],
        userStore: useUserStore()
      }
    },
    components: {},
    created() {
    },
    mounted() {
      this.getList()
    },
    methods: {
      async getList() {
        const {data} = await unpaid()
        this.data = data
      },
    },
  }
</script>
<style lang="scss">
  .cart-num{
    .ant-input-number-input{
      text-align: center!important;
    }
  }
</style>
