<template>
  <div>
    <div style="height:100px"></div>
    <div style="min-width: 1300px;height:600px;position:relative">
      <div style="display: inline-block;width: 500px;height:500px;position: relative">
        <div class="thumb-list" style="display: inline-block;width: 70px;position: absolute;top: 0;left: -50px">
          <div id="thumb-list">
            <ul class="thumb">
              <li v-for="item in form.imgList" class="thumb-li"
                  @mouseover="selectStyle(item)"
                  :class="{'active':item===coverImg}"
              >
                <img :src="item">
              </li>
            </ul>
          </div>
        </div>
        <div style="display: inline-block">
          <imgZoom  :width="width"  :height="height" :minIMGsrc="coverImg" :scale="3" />
        </div>
      </div>
      <div style="display: inline-block;width: 700px;text-align: left">
        <div style="position:absolute;top: 0;width: 700px">
          <a-card >
          <h2>{{form.title}}</h2>
            <div>
                  <span aria-hidden="true">
                    <span class="price-symbol">¥</span>
                    <span class="price-whole">{{form.price_int}}<span class="price-decimal">.</span></span>
                    <span class="price-fraction">{{form.price_decimal}}</span>
                    <em class="sale"><strong>18</strong>%<span class="icon">OFF</span></em>
                  </span>
            </div>
            <div>
              <a-input-number id="inputNumber" v-model:value="cart.num" :min="1" :max="10" /> 件
            </div>
            <div style="margin-top: 20px">
              <a-button type="danger" size="large" round @click="addCart()"><b>加入购物车</b></a-button>
            </div>
          </a-card>
        </div>
      </div>
    </div>
    <div style="height:100px"></div>
  </div>
</template>

<script>
  import imgZoom from './components/imgZoom'
  import {addCart,goodsDetail} from '@/api/shopping'
  export default {
    name: 'g_detail',
    data() {
      return {
        cart:{
            num:1,
        },
        form : {
            id:'',
            title:'',
            cover:'',
            video:'',
            imgList:[],
            price:0,
            origin_price:'',
            unit:'件',
            min:0,
            max:0,
            storage:0,
            shelf:'0',
            recommend:0,
            category:[],
        },
        coverImg:'',
        width:420,
        height:420,
      }
    },
    components:{ imgZoom },
    created() {
      this.fetchData()
    },
    mounted() {},
    methods: {
      async fetchData() {
        const { data } = await goodsDetail({ id: this.$route.params.id })
        this.form = data
        this.coverImg = data.cover
      },
      selectStyle(item) {
        this.coverImg = item
      },
      /*添加到购物车*/
      async addCart(){
          const { data } = await addCart({ data:this.form,cart: this.cart})
          let routeData = this.$router.resolve({ name: 'c_Message', params: {id:data.id} });
          window.open(routeData.href, '_blank')
      }
    },
  }
</script>

<style lang="scss" scoped>
  .price-symbol,.price-decimal,.price-fraction{
    position: relative;
    top: -.75em;
    font-size: 13px;
  }
  .price-whole{
    font-size: 28px;
  }
  ul.thumb{
    padding-left: 0;
    list-style-type: none;
    .thumb-li>img{
      width: 50px;
      height: 50px;
      margin-bottom: 3px;
      object-fit: cover;
    }
    .thumb-li.active>img{
      border: 2px solid #e53e41;
    }
  }


  .sale{
    margin-left: 20px;
    color: #ff3100;
    font-family: Tahoma;
    font-size: 18px;
    .icon{
      overflow: hidden;
      display: inline-block;
      margin-left: 3px;
      width: 13px;
      height: 13px;
      background: url(//pics.gmarket.co.kr/pc/gc/main/gc_main.png) no-repeat -400px 0;
      color: #fff;
      font-size: 0;
      text-indent: -999em;
    }
  }
</style>

