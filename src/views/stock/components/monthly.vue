<template>
  <div
    :id="id"
    :ts_code="ts_code"
    :class="className"
    :style="{ height: height, width: width }"
  />
</template>

<script>
  import * as echarts from 'echarts'
  // import resize from 'resize'
  import { Monthly } from '@/api/stock'

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
        default: 'monthly',
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
        upColor: '#ec0000',
        upBorderColor: '#8A0000',
        downColor: '#00da3c',
        downBorderColor: '#008F28',
        data0: [],
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
        Monthly({ ts_code: this.ts_code }).then((response) => {
          this.data0 = this.splitData(response.data)
          this.chart = echarts.init(document.getElementById(this.id))
          const option = {
            title: {
              text: '月线',
              left: 150,
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
              },
            },
            legend: {
              data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30'],
            },
            grid: [
              {
                left: '10%',
                right: '8%',
                height: '50%',
              },
              {
                left: '10%',
                right: '8%',
                top: '63%',
                height: '16%',
              },
            ],
            xAxis: [
              {
                type: 'category',
                data: this.data0.categoryData,
                scale: true,
                boundaryGap: false,
                axisLine: { onZero: false },
                splitLine: { show: false },
                splitNumber: 20,
                min: 'dataMin',
                max: 'dataMax',
              },
              {
                type: 'category',
                gridIndex: 1,
                data: this.data0.categoryData,
                scale: true,
                boundaryGap: false,
                axisLine: { onZero: false },
                axisTick: { show: false },
                splitLine: { show: false },
                axisLabel: { show: false },
                splitNumber: 20,
                min: 'dataMin',
                max: 'dataMax',
              },
            ],
            yAxis: [
              {
                scale: true,
                splitArea: {
                  show: true,
                },
              },
              {
                scale: true,
                gridIndex: 1,
                splitNumber: 2,
                axisLabel: { show: false },
                axisLine: { show: false },
                axisTick: { show: false },
                splitLine: { show: false },
              },
            ],
            dataZoom: [
              {
                type: 'inside',
                xAxisIndex: [0, 1],
                start: 90,
                end: 100,
              },
              {
                show: true,
                type: 'slider',
                xAxisIndex: [0, 1],
                top: '90%',
                start: 50,
                end: 100,
              },
            ],
            series: [
              {
                name: '日K',
                type: 'candlestick',
                data: this.data0.values,
                itemStyle: {
                  color: this.upColor,
                  color0: this.downColor,
                  borderColor: this.upBorderColor,
                  borderColor0: this.downBorderColor,
                },
                markPoint: {
                  label: {
                    normal: {
                      formatter: function (param) {
                        return param != null ? Math.round(param.value) : ''
                      },
                    },
                  },
                  data: [
                    {
                      name: 'XX标点',
                      coord: ['2013/5/31', 2300],
                      value: 2300,
                      itemStyle: {
                        color: 'rgb(41,60,85)',
                      },
                    },
                    {
                      name: 'highest value',
                      type: 'max',
                      valueDim: 'highest',
                    },
                    {
                      name: 'lowest value',
                      type: 'min',
                      valueDim: 'lowest',
                    },
                    {
                      name: 'average value on close',
                      type: 'average',
                      valueDim: 'close',
                    },
                  ],
                  tooltip: {
                    formatter: function (param) {
                      return param.name + '<br>' + (param.data.coord || '')
                    },
                  },
                },
                markLine: {
                  symbol: ['none', 'none'],
                  data: [
                    [
                      {
                        name: 'from lowest to highest',
                        type: 'min',
                        valueDim: 'lowest',
                        symbol: 'circle',
                        symbolSize: 10,
                        label: {
                          show: false,
                        },
                        emphasis: {
                          label: {
                            show: false,
                          },
                        },
                      },
                      {
                        type: 'max',
                        valueDim: 'highest',
                        symbol: 'circle',
                        symbolSize: 10,
                        label: {
                          show: false,
                        },
                        emphasis: {
                          label: {
                            show: false,
                          },
                        },
                      },
                    ],
                    {
                      name: 'min line on close',
                      type: 'min',
                      valueDim: 'close',
                    },
                    {
                      name: 'max line on close',
                      type: 'max',
                      valueDim: 'close',
                    },
                  ],
                },
              },
              {
                name: 'MA5',
                type: 'line',
                data: this.calculateMA(5),
                smooth: true,
                lineStyle: {
                  opacity: 0.5,
                },
              },
              {
                name: 'MA10',
                type: 'line',
                data: this.calculateMA(10),
                smooth: true,
                lineStyle: {
                  opacity: 0.5,
                },
              },
              {
                name: 'MA20',
                type: 'line',
                data: this.calculateMA(20),
                smooth: true,
                lineStyle: {
                  opacity: 0.5,
                },
              },
              {
                name: 'MA30',
                type: 'line',
                data: this.calculateMA(30),
                smooth: true,
                lineStyle: {
                  opacity: 0.5,
                },
              },
              {
                name: 'Volume',
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                itemStyle: {
                  color: '#7fbe9e',
                },
                emphasis: {
                  itemStyle: {
                    color: '#140',
                  },
                },
                data: this.data0.vol,
              },
            ],
          }
          this.chart.setOption(option)
        })
      },
      splitData(rawData) {
        const categoryData = []
        const values = []
        const vol = []
        for (let i = 0; i < rawData.length; i++) {
          categoryData.push(rawData[i].trade_date)
          vol.push(parseInt(rawData[i].vol))
          const v = [
            parseFloat(rawData[i].open),
            parseFloat(rawData[i].close),
            parseFloat(rawData[i].low),
            parseFloat(rawData[i].high),
          ]
          values.push(v)
        }
        return {
          categoryData: categoryData,
          values: values,
          vol: vol,
        }
      },
      calculateMA(dayCount) {
        const result = []
        for (let i = 0, len = this.data0.values.length; i < len; i++) {
          if (i < dayCount) {
            result.push('-')
            continue
          }
          let sum = 0
          for (let j = 0; j < dayCount; j++) {
            sum += this.data0.values[i - j][1]
          }
          result.push(parseFloat(sum / dayCount).toFixed(4))
        }
        return result
      },
    },
  }
</script>
