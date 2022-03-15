<template>
  <div style="width: 1000px;display:inline-block;border: 1px solid #eeeeee;margin-top:50px;">
    <div id="address" style="width:800px;display:inline-block;min-height: 100px;text-align: left;padding: 20px 0;border-bottom: 1px solid #eeeeee">
      <!--添加地址-->
      <a-button type="dashed" @click="visible=true;addAddress.id=''">添加地址</a-button>
      <a-modal v-model:visible="visible" title="添加/编辑常用地址" @ok="handleAddAddress" width="800px">
        <a-form layout="horizontal" :model="addAddress" :labelCol="{ style: 'width: 120px' }">
          <a-form-item label="详细地址">
            <a-space>
              <a-select
                  v-model:value="addAddress.province"
                  style="width: 120px"
                  :options="pca.province"
              >
              </a-select>
              <a-select
                  v-model:value="addAddress.city"
                  style="width: 120px"
                  :options="pca.city[addAddress.province]"
              >
              </a-select>
              <a-select
                  v-model:value="addAddress.area"
                  style="width: 120px"
                  :options="pca.area[addAddress.city]"
              >
              </a-select>
            </a-space>
          </a-form-item>
          <a-form-item label="收货人">
            <a-input v-model:value="addAddress.name"/>
          </a-form-item>
          <a-form-item label="详细地址">
            <a-textarea
                v-model:value="addAddress.address"
                :auto-size="{ minRows: 2, maxRows: 5 }"
            />
          </a-form-item>
          <a-form-item label="电话号码">
            <a-input-group size="small">
              <a-row :gutter="8">
                <a-col :span="5">
                  <a-input value="0086" disabled />
                </a-col>
                <a-col :span="8">
                  <a-input v-model:value="addAddress.mobile" />
                </a-col>
              </a-row>
            </a-input-group>
          </a-form-item>
        </a-form>
      </a-modal>
      <!--地址列表-->
      <div>
        <a-radio-group v-model:value="selectAddress">
          <a-radio  @focus="addressEditShow = item.id" :style="{display:'block',height:'30px','line-height':'30px'}" v-for="item in addressList" :value="item.id">
            {{item.name}}&nbsp;&nbsp;{{item.mobile}}&nbsp;&nbsp;{{item.address}}
            <a-button v-show="addressEditShow === item.id" @click="addAddress = item;visible=true" type="link" size="small">编辑</a-button>

            <a-popconfirm
                :title="'确定删除'+item.name+'&nbsp;&nbsp;'+item.address "
                ok-text="是"
                cancel-text="否"
                @confirm="delAddressConfirm(item.id)"
                @cancel="cancel"
            >
              <a-button v-show="addressEditShow === item.id" type="link" size="small" danger>删除</a-button>
            </a-popconfirm>
          </a-radio>
        </a-radio-group>
      </div>
    </div>
    <div style="width: 1000px;display: inline-block;text-align: left">
      <a-list item-layout="horizontal" size="large" :data-source="data">
        <template #footer>
          <div>
            <b>已到底部</b>
          </div>
        </template>
        <template #renderItem="{ item }">
          <a-list-item key="item.title">
            <template #actions>
              <a-button type="link" size="small" danger @click="handleDel(item.id)">删除</a-button>
            </template>
            <a-list-item-meta>
              <template #title>
                <a :href="item.href">{{ item.title }}</a>
              </template>
              <template #description>
                <h2 style="color: #ff3100">￥{{item.price * item.num}}</h2>
              </template>
              <template #avatar>
                <img
                    style="width: 100px;height: 100px;object-fit: cover"
                    alt="cover"
                    :src="item.cover"
                />
              </template>
            </a-list-item-meta>
            <ul style="list-style: none">
              <li>
                单价：￥{{item.price}}
                &nbsp;&nbsp;&nbsp;&nbsp;
                <a-input-number class="cart-num" size="small" v-model:value="item.num" :min="1" :max="10"/> 件
                &nbsp;&nbsp;&nbsp;&nbsp;
              </li>
            </ul>
          </a-list-item>
        </template>
      </a-list>
    </div>
  </div>
</template>

<script>
  import {useUserStore} from '@/store/modules/user'
  import {orderList} from "@/api/shopping";
  import {pca, list, add, del} from "@/api/address";

  export default {
    name: 'o',
    data() {
      return {
        visible:false,
        addressEditShow:'',
        addAddress:{
          id:'',
          province:'',
          city:'',
          area:'',
          address:'',
          name:'',
          mobile:'',
          tag:''
        },
        data: [],
        pca:{},
        addressList:[],
        selectAddress:'',
        userStore: useUserStore()
      }
    },
    components: {},
    created() {
      this.getOrderList()
    },
    mounted() {
      this.getPca()
      this.getList()
    },
    methods: {
      async getOrderList() {
        const {data} = await orderList()
        this.data = data
      },
      async getPca(){//省市区
        const {data} = await pca()
        this.pca = data
      },
      async getList(){//获取用户地址列表
        const {data} = await list()
        this.addressList = data
      },
      async handleAddAddress(){ //添加常用地址
        await add(this.addAddress).then(()=>{
          this.getList()
          this.visible = false
        })
      },
      async delAddressConfirm(id){
        await del({id:id}).then(()=>{
          this.getList()
        })
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
