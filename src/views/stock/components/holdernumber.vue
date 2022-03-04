<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
  import * as echarts from 'echarts'
  // import resize from 'resize'
  import { stkHolderNumber } from '@/api/stock'

  export default {
    // mixins: [resize],
    props: {
      className: {
        type: String,
        default: 'chart',
      },
      ts_code: {
        type: String,
        default: '',
      },
      id: {
        type: String,
        default: 'stkHolderNumber',
      },
      width: {
        type: String,
        default: '200px',
      },
      height: {
        type: String,
        default: '200px',
      },
    },
    data() {
      return {
        chart: null,
      }
    },
    mounted() {
      this.initChart()
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart() {
        stkHolderNumber({ ts_code: this.ts_code }).then((response) => {
          this.data0 = this.splitData(response.data)
          this.chart = echarts.init(document.getElementById(this.id))
          this.chart.setOption({
            title: {
              text: '股东人数',
              left: 150,
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
              },
            },
            grid: {
              left: '10%',
              right: '10%',
              bottom: '15%',
            },
            legend: {
              data: ['饼图', '折线'],
            },
            calculable: true,
            xAxis: [
              {
                type: 'category',
                axisLine: {
                  lineStyle: {
                    color: '#90979c',
                  },
                },
                data: this.data0.categoryData,
              },
            ],
            yAxis: [
              {
                type: 'value',
                splitLine: {
                  show: false,
                },
                axisLine: {
                  lineStyle: {
                    color: '#90979c',
                  },
                },
                axisTick: {
                  show: false,
                },
                axisLabel: {
                  interval: 0,
                },
                splitArea: {
                  show: false,
                },
              },
            ],
            dataZoom: [
              {
                show: true,
                height: 30,
                xAxisIndex: [0],
                bottom: 30,
                start: 0,
                end: 100,
                handleIcon:
                  'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                handleSize: '110%',
                borderColor: '#90979c',
              },
              {
                type: 'inside',
                show: true,
                height: 15,
                start: 1,
                end: 35,
              },
            ],
            series: [
              {
                name: '饼图',
                type: 'bar',
                stack: 'total',
                barMaxWidth: 35,
                barGap: '10%',
                itemStyle: {
                  normal: {
                    color: 'rgba(255,144,128,1)',
                  },
                },
                data: this.data0.values,
              },
              {
                name: '折线',
                type: 'line',
                stack: 'total',
                symbolSize: 10,
                symbol: 'circle',
                itemStyle: {
                  normal: {
                    color: 'rgb(35,88,253)',
                    barBorderRadius: 0,
                  },
                },
                data: this.data0.values,
              },
            ],
          })
        })
      },
      splitData(rawData) {
        const categoryData = []
        const values = []
        for (let i = 0; i < rawData.length; i++) {
          categoryData.push(rawData[i].end_date)
          values.push(rawData[i].holder_num)
        }
        return {
          categoryData: categoryData,
          values: values,
        }
      },
    },
  }
</script>
