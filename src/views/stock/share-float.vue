<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.holder_name"
        placeholder="股东名称"
        style="width: 300px"
        class="filter-item"
      />
      <el-date-picker
        v-model="listQuery.date"
        class="filter-item"
        type="daterange"
        range-separator="至"
        value-format="yyyyMMdd"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      />
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="getList"
      >
        搜索
      </el-button>
    </div>
    <pagination
      v-show="listQuery.total > 0"
      :total="listQuery.total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <el-table :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column
        label="ts代码"
        align="center"
        prop="ts_code"
        min-width="100px"
      />
      <el-table-column
        label="股票名称"
        align="center"
        prop="name"
        min-width="100px"
      >
        <template slot-scope="{ row }">
          <router-link
            class="pan-btn blue-btn"
            :to="{ path: '/stock/stock-detail/' + row.ts_code }"
          >
            {{ row.name }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        label="解禁日期"
        align="center"
        prop="float_date"
        min-width="80px"
      />
      <el-table-column
        label="流通股份"
        align="center"
        prop="float_share"
        min-width="80px"
      />
      <el-table-column
        label="流通股份占总股本比率"
        align="center"
        prop="float_ratio"
        min-width="80px"
      />
      <el-table-column label="股东名称" prop="holder_name" min-width="250px" />
      <el-table-column
        label="股份类型"
        align="center"
        prop="share_type"
        min-width="80px"
      />
    </el-table>
  </div>
</template>

<script>
  import { ShareFloatList } from '@/api/stock'
  import Pagination from '@/components/Pagination'
  // import waves from '@/directive/waves' // waves directive

  export default {
    name: 'ShareFloat',
    components: { Pagination },
    // directives: { waves },
    data() {
      return {
        list: null,
        listQuery: {
          holder_name: '',
          date: ['20210901', '20220301'],
          page: 1,
          limit: 10,
          total: 0,
        },
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        ShareFloatList(this.listQuery).then((response) => {
          this.list = response.data
          this.listQuery.total = response.total
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .icons-container {
    margin: 10px 20px 0;
    overflow: hidden;

    .grid {
      position: relative;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    }

    .icon-item {
      margin: 20px;
      height: 85px;
      text-align: center;
      width: 100px;
      float: left;
      font-size: 30px;
      color: #24292e;
      cursor: pointer;
    }

    span {
      display: block;
      font-size: 16px;
      margin-top: 10px;
    }

    .disabled {
      pointer-events: none;
    }
  }
</style>
