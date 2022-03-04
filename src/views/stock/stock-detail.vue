<template>
  <div>
    <div class="app-container">
      <div class="filter-container">
        <el-descriptions  title="基础信息" border :column="4" size="middle">
          <el-descriptions-item
            label-class-name="my-label"
            content-class-name="my-content"
            label="名称"
            :span="3"
          >
            {{ stock_basic.name + '（' + stock_basic.fullname + '）' }}
          </el-descriptions-item>
          <el-descriptions-item
            label-class-name="my-label"
            content-class-name="my-content"
            label="代码"
          >
            {{ stock_basic.ts_code }}
          </el-descriptions-item>
          <el-descriptions-item label="上市日期">
            {{ stock_basic.list_date }}
          </el-descriptions-item>
          <el-descriptions-item label="地域">
            {{ stock_basic.area }}
          </el-descriptions-item>
          <el-descriptions-item label="所属行业">
            {{ stock_basic.industry }}
          </el-descriptions-item>
          <el-descriptions-item label="市场">
            {{ stock_basic.market }}
          </el-descriptions-item>
        </el-descriptions>
        <br />
        <el-card v-if="share_float.length > 0" class="md-card">
          <div slot="header" class="clearfix">
            <span>解禁信息</span>
          </div>
          <el-timeline>
            <el-timeline-item
              v-for="(value, index) in share_float"
              :key="index"
            >
              <el-tag>{{ value.share_type }}</el-tag>
              <el-tag>{{ value.float_date }}</el-tag>
              解禁比例：{{ value.float_ratio + '%' }} ， 流通股份：{{
                parseFloat(parseFloat(value.float_share) / 10000).toFixed(2) +
                '万股'
              }}
              ， 持股方：{{ value.holder_name }}
            </el-timeline-item>
          </el-timeline>
        </el-card>
        <br />
        <el-card
          v-if="repurchase.length > 0"
          style="max-height: 300px; overflow-y: auto"
          class="md-card"
        >
          <div slot="header" class="clearfix">
            <span>逆回购</span>
          </div>
          <el-timeline>
            <el-timeline-item v-for="(value, index) in repurchase" :key="index">
              <el-tag>{{ value.proc }}</el-tag>
              【公告日期】{{ value.ann_date }}
              <!--【截止日期】{{value.end_date}} 【过期日期】{{value.exp_date}}-->
              回购数量：{{
                parseFloat(parseFloat(value.vol) / 10000).toFixed(2) + '万股'
              }}
              ， 回购金额：{{
                parseFloat(parseFloat(value.amount) / 10000).toFixed(2) + '万元'
              }}
              ， 回购最高价 ：{{ value.high_limit }} 回购最低价 ：{{
                value.low_limit
              }}
            </el-timeline-item>
          </el-timeline>
        </el-card>
        <br />
        <div>
          <el-row :gutter="15">
            <el-col :lg="12" :xs="24">
              <el-card class="md-card">
                <daily :ts_code="ts_code" height="400px" width="100%" />
              </el-card>
            </el-col>
            <el-col :lg="12" :xs="24">
              <el-card class="md-card">
                <weekly :ts_code="ts_code" height="400px" width="100%" />
              </el-card>
            </el-col>
            <el-col :lg="12" :xs="24">
              <el-card class="md-card">
                <monthly :ts_code="ts_code" height="400px" width="100%" />
              </el-card>
            </el-col>
            <el-col :lg="12" :xs="24">
              <el-card class="md-card">
                <holderNumber :ts_code="ts_code" height="400px" width="100%" />
              </el-card>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import daily from './components/daily'
  import weekly from './components/weekly'
  import monthly from './components/monthly'
  import holderNumber from './components/holdernumber'
  import { StockBasicDetail } from '@/api/stock'

  export default {
    name: 'StockDetail',
    components: { daily, weekly, monthly, holderNumber },
    data() {
      return {
        ts_code: '',
        stock_basic: {
          name: '',
          symbol: '',
        },
        share_float: null,
        repurchase: null,
      }
    },
    created() {
      this.ts_code = this.$route.params.ts_code
      this.getDetail()
    },
    methods: {
      getDetail() {
        StockBasicDetail({ ts_code: this.ts_code }).then((response) => {
          this.stock_basic = response.data.stock_basic
          this.share_float = response.data.share_float
          this.repurchase = response.data.repurchase
        })
      },
    },
  }
</script>

<style type="scss" scoped>
  @import "~@/styles/themes/neumorphism.scss";

</style>
