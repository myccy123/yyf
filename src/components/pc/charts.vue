<template>
  <div :style="{height:height,width:width}"></div>
</template>

<script>
import eCharts from 'echarts'
export default {
  name: 'charts',
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '260px'
    }
  },
  data: function () {
    return {
      chart: null
    }
  },
  mounted: function () {
    this.initChart()
  },
  beforeDestroy: function () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    setOptions: function () {
      this.chart.setOption({
        title: {
          text: '#温度传感器',
          textStyle: {
            color: '#409EFF',
            // 字体风格,'normal','italic','oblique'
            fontStyle: 'normal',
            // 字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
            fontWeight: 'normal',
            // 字体系列
            fontFamily: 'Microsoft YaHei',
            // 字体大小
            fontSize: 15
          }
        },
        tooltip: {},
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            mark: { show: true },
            dataView: { show: false, readOnly: false },
            // magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },// line折线图、bar柱状图、stack堆叠模式、tiled平铺模式。
            magicType: { type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        xAxis: {
          type: 'category',
          data: ['2019-10-7 10:00:00', '2019-10-8 10:00:00', '2019-10-9 10:00:00', '2019-10-10 10:00:00', '2019-10-11 10:00:00', '2019-10-12 10:00:00', '2019-10-13 10:00:00']
        },
        yAxis: {
          name: '℃',
          nameLocation: 'middle', // start,end
          nameTextStyle: { fontSize: '12', fontWeight: 'normal' },
          nameGap: 50,
          type: 'value',
          axisLabel: {
            formatter: '{value} °C',
            fontSize: '12',
            show: true,
            interval: 'auto'
          },
          axisLine: {
            // lineStyle: {
            //    color: 'green'
            // }
          },
          splitLine: {
            lineStyle: {
              color: '#ddd'
            }
          }
        },
        series: [
          {
            name: '温度',
            type: 'line',
            yAxisIndex: 0, // 使用第一个y轴
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ],
              label: {
                normal: {
                  formatter: '{c}℃'
                }
              }
            },
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            },
            itemStyle: {
              normal: {
                color: '#409EFF', // 折点颜色
                lineStyle: {
                  color: '#409EFF' // 折线颜色
                },
                borderType: 'dashed',
                label: { // 设置柱子上面的内容
                  show: false, // 数据是否显示在柱子上
                  position: 'inside',
                  offset: [0, 0],
                  formatter: '{c}℃', // 如果是百分比：formatter : '{c}%',
                  textStyle: {// 字体内容设置
                    /* color: '#000000',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontFamily: 'sans-serif', */
                    fontSize: 6
                  }
                }
              }
            },
            data: [5, 20, 36, 10, 10, 20, 20]
          }
        ],
        dataZoom: [{
          type: 'slider',
          xAxisIndex: 0,
          minSpan: 5,
          height: 20,
          bottom: 5,
          start: 30, // 数据窗口范围的起始百分比,表示30%
          end: 70, // 数据窗口范围的结束百分比,表示70%
          handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: '120%'
        }]
      })
    },
    initChart: function () {
      this.chart = eCharts.init(this.$el)
      this.setOptions()
    }
  }
}
</script>

<style scoped>
</style>
