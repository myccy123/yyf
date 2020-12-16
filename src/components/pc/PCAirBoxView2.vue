<template>
  <el-container style="height: 100%; border: 0 solid #eee;">
    <el-main>
      <el-form :inline="true" style=" width: 100%;height: 40px;display: flex;">
        <el-form-item>
          <el-button type="primary" size="mini" icon="" @click="queryDialogVisible = true" plain>查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" icon="" @click="exportToExcel" plain>导出</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" plain @click="changeToData">数据</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" plain @click="changeToChart">图表</el-button>
        </el-form-item>
      </el-form>
      <el-tabs id="tabs" v-model="activeName" tab-position="top">
        <el-tab-pane name="dataView">
          <el-table :data="tableData" :height="tableHeight" border stripe>
            <el-table-column type="index" align="center" label="#">
            </el-table-column>
            <el-table-column prop="dateTime" label="时间" width="160" >
            </el-table-column>
            <el-table-column prop="deviceCode" label="设备编号" width="220">
            </el-table-column>
            <el-table-column prop="temperature" label="温度[℃]" width="80">
            </el-table-column>
            <el-table-column prop="humidity" label="湿度[%]" width="80">
            </el-table-column>
            <el-table-column prop="co2" label="CO2[ppm]" width="100">
            </el-table-column>
            <el-table-column prop="pm25" label="PM2.5[ug/m3]" width="120">
            </el-table-column>
            <el-table-column prop="co" label="CO[ug/m3]" width="100">
            </el-table-column>
            <el-table-column prop="tvoc" label="TVOC[ug/m3]" width="120">
            </el-table-column>
            <el-table-column prop="ch2o" label="CH2O[ug/m3]" width="120">
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="total, sizes, prev, pager, next" @current-change="handleCurrentChange" v-if="pageShow"
            :page-size="pageSize" @size-change="handleSizeChange" align="right"
            :current-page="currentPage" :page-sizes="[50, 100]" style="padding-right: 50px"
            :total="total">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane name="chartView" style="background-color:white">
          <el-scrollbar id="scrollbar" class="chartViewScrollbar">
            <el-row>
              <el-col :span="20">
                <div class="grid-content-left">
                  <TChart chart-title="#温度传感器" chart-unit="℃" series-name="温度"
                          :chart-x-data="chartDateTime" :chart-y-data="chartDataTemperature"
                          v-if="'chartView' === activeName">tab1</TChart>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content-right">
                  <div><label>最新数据</label></div>
                  <div class="current_value">32.6</div>
                  <div class="current_unit">摄氏度[℃]</div>
                  <div class="current_date">更新时间:2020-06-15 15:48:52 </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <div class="grid-content-left">
                  <TChart chart-title="#湿度传感器" chart-unit="%" series-name="相对湿度"
                          :chart-x-data="chartDateTime" :chart-y-data="chartDataHumidity"
                          v-if="'chartView' === activeName">tab1</TChart>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content-right">
                  <div><label>最新数据</label></div>
                  <div class="current_value">52.6</div>
                  <div class="current_unit">百分比[%RH]</div>
                  <div class="current_date">更新时间:2020-06-15 15:48:52 </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <div class="grid-content-left">
                  <TChart chart-title="#CO2传感器" chart-unit="ppm" series-name="CO2含量"
                          :chart-x-data="chartDateTime" :chart-y-data="chartDataCO2"
                          v-if="'chartView' === activeName">tab1</TChart>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content-right">
                  <div><label>最新数据</label></div>
                  <div class="current_value">328.2</div>
                  <div class="current_unit">百万分比[ppm]</div>
                  <div class="current_date">更新时间:2020-06-15 15:48:52 </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <div class="grid-content-left">
                  <TChart chart-title="#PM2.5传感器" chart-unit="ug/m3" series-name="PM2.5浓度"
                          :chart-x-data="chartDateTime" :chart-y-data="chartDataPM25"
                          v-if="'chartView' === activeName">tab1</TChart>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content-right">
                  <div><label>最新数据</label></div>
                  <div class="current_value">32.6</div>
                  <div class="current_unit">微克/立方米[ug/m3]</div>
                  <div class="current_date">更新时间:2020-06-15 15:48:52 </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <div class="grid-content-left">
                  <TChart chart-title="#CO传感器" chart-unit="ug/m3" series-name="CO浓度"
                          :chart-x-data="chartDateTime" :chart-y-data="chartDataCO"
                          v-if="'chartView' === activeName">tab1</TChart>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content-right">
                  <div><label>最新数据</label></div>
                  <div class="current_value">32.6</div>
                  <div class="current_unit">微克/立方米[ug/m3]</div>
                  <div class="current_date">更新时间:2020-06-15 15:48:52 </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <div class="grid-content-left">
                  <TChart chart-title="#TVOC传感器" chart-unit="ug/m3" series-name="TVOC浓度"
                          :chart-x-data="chartDateTime" :chart-y-data="chartDataTVOC"
                          v-if="'chartView' === activeName">tab1</TChart>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content-right">
                  <div><label>最新数据</label></div>
                  <div class="current_value">32.6</div>
                  <div class="current_unit">微克/立方米[ug/m3]</div>
                  <div class="current_date">更新时间:2020-06-15 15:48:52 </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <div class="grid-content-left">
                  <TChart chart-title="#甲醛传感器" chart-unit="ug/m3" series-name="甲醛浓度"
                          :chart-x-data="chartDateTime" :chart-y-data="chartDataCH2O"
                          v-if="'chartView' === activeName">tab1</TChart>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content-right">
                  <div><label>最新数据</label></div>
                  <div class="current_value">32.6</div>
                  <div class="current_unit">微克/立方米[ug/m3]</div>
                  <div class="current_date">更新时间:2020-06-15 15:48:52 </div>
                </div>
              </el-col>
            </el-row>
          </el-scrollbar>
        </el-tab-pane>
      </el-tabs>
      <!--查询数据对话框-->
      <el-dialog title="查询数据" :visible.sync="queryDialogVisible" width="40%">
        <el-form label-width="80px" label-position="right" size="small">
          <el-form-item label="选择时间">
            <el-date-picker
              v-model="queryDateTimeRange" style="width: 90%" align="left"
              type="datetimerange" :picker-options="pickerOptions" value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="开始日期" range-separator="至" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="queryDialogVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="queryData" size="mini">确 定</el-button>
        </span>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<style>
  .el-tabs__nav-wrap {
    visibility: hidden;
  }
  .el-tabs__header {
    position: relative;
    margin: 0 0 -45px 0;
  }
  .el-table th.is-leaf{
    background: #409EFF;
    color: #fff;
    font-size: 14px;
  }
  .el-table td, .el-table th{
    padding: 1px;
  }

  .chartViewScrollbar .el-scrollbar__wrap{
    overflow-x: hidden;
  }
  .chartViewScrollbar .el-scrollbar__bar.is-horizontal {
    display: none;
  }
  .el-row {
    margin-bottom: 5px;
    background: #f1f1f1;
    padding: 2px;
  }
  .grid-content-left {
    border-radius: 4px 0 0 4px;
    min-height: 260px;
    max-height: 260px;
    /*grid 布局*/
    display: grid;
    /*实现垂直居中*/
    align-items: center;
    background: #ffffff;
  }
  .grid-content-right {
    border-radius: 0 4px 4px 0;
    min-height: 260px;
    max-height: 260px;
    /*grid 布局*/
    display: grid;
    /*实现垂直居中*/
    align-items: center;
    background-color: rgb(238, 241, 246);
  }
  label {
    font-size: 24px;
    line-height: 40px;
    color: #666;
  }
  .current_value {
    font-size: 50px;
    line-height: 0;
    color: #409EFF;
  }
  .current_unit {
    font-size: 18px;
    line-height: 0;
    color: #999;
  }
  .current_date {
    font-size: 12px;
    color: #999;
  }
</style>

<script>
import '../../excel/Blob.js'
import '../../excel/Export2Excel'
import TChart from '../pc/PCTChart'
export default {
  name: 'PCAirBoxView2',
  components: {
    TChart
  },
  data () {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      queryDateTimeRange: '',
      queryMinTime: '',
      queryMaxTime: '',
      queryDeviceCode: this.$route.query.deviceCode,
      queryDialogVisible: false,
      activeName: 'dataView',
      iconData: 'el-icon-pie-chart',
      buttonText: '图表',
      tableHeight: window.innerHeight - 135,
      pageShow: 'true',
      currentPage: '1', // 当前页
      pageSize: '50', // 每页大小
      total: '', // 总数量
      chartDateTime: [],
      chartDataTemperature: [],
      chartDataHumidity: [],
      chartDataCO2: [],
      chartDataPM25: [],
      chartDataCO: [],
      chartDataTVOC: [],
      chartDataCH2O: []
    }
  },
  created () {
    this.getData(0)
  },
  mounted () {
    document.getElementById('scrollbar').style.height = window.innerHeight - 100 + 'px'
  },
  methods: {
    // ----------以下为查询数据功能--------------
    queryData () {
      if (this.queryDateTimeRange == null) {
        this.queryMinTime = ''
        this.queryMaxTime = ''
      } else {
        this.queryMinTime = this.queryDateTimeRange[0]
        this.queryMaxTime = this.queryDateTimeRange[1]
      }
      this.getData(0)
      this.queryDialogVisible = false
    },
    // ----------以下为导出Excel数据功能--------------
    exportToExcel () {
      require.ensure([], () => {
        // eslint-disable-next-line camelcase
        const { export_json_to_excel } = require('../../excel/Export2Excel')
        const tHeader = ['时间', '温度[℃]', '湿度[%]', 'CO[ug/m3]', 'CO2[ppm]', 'PM2.5[ug/m3]', 'TVOC[ug/m3]'] // 上面设置Excel的表格第一行的标题
        const filterVal = ['dateTime', 'temperature', 'humidity', 'co', 'co2', 'pm25', 'tvoc'] // 上面的tableData里对象的属性key值
        const list = this.tableData // 把要导出的数据tableData存到list
        const data = this.formatJson(filterVal, list)
        const dateTime = new Date()
        const fileName = '数据' + dateTime.getFullYear() + (dateTime.getMonth() + 1) + dateTime.getDate() + dateTime.getHours() + dateTime.getMinutes() + dateTime.getSeconds()
        export_json_to_excel(tHeader, data, fileName)
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    // ----------以下为数据图表切换功能--------------
    changeToData () {
      this.activeName = 'dataView'
    },
    changeToChart () {
      this.activeName = 'chartView'
    },
    // 分页页码变化
    handleCurrentChange (currentPage) {
      this.getData(currentPage - 1)
    },
    // 每页大小变化
    handleSizeChange (size) {
      this.pageSize = size
      this.currentPage = 1
      this.getData(0)
    },
    // ----------以下为分页查询数据方法--------------
    getData (pageNumber) {
      const _this = this
      _this.$axios({
        method: 'get',
        url: '/airBox/findAirBoxListByPage/' + pageNumber + '/' + _this.pageSize,
        params: {
          deviceCode: this.queryDeviceCode,
          minTime: this.queryMinTime,
          maxTime: this.queryMaxTime
        }
      }).then((response) => {
        _this.pageSize = response.data.result.size
        _this.currentPage = (pageNumber + 1)
        _this.total = response.data.result.totalElements
        _this.tableData = response.data.result.content
        _this.pageShow = false
        _this.$nextTick(() => {
          _this.pageShow = true
        })
        _this.chartDateTime = []
        _this.chartDataTemperature = []
        _this.chartDataHumidity = []
        _this.chartDataCO2 = []
        _this.chartDataPM25 = []
        _this.chartDataCO = []
        _this.chartDataTVOC = []
        _this.chartDataCH2O = []
        for (let item of _this.tableData) {
          _this.chartDateTime.push(item['dateTime'])
          _this.chartDataTemperature.push(item['temperature'])
          _this.chartDataHumidity.push(item['humidity'])
          _this.chartDataCO2.push(item['co2'])
          _this.chartDataPM25.push(item['pm25'])
          _this.chartDataCO.push(item['co'])
          _this.chartDataTVOC.push(item['tvoc'])
          _this.chartDataCH2O.push(item['ch2o'])
        }
        this.activeName = 'dataView'
      }).catch((error) =>
        console.log(error)) // 请求失败返回的数据 *!/
    },
    // ----------以下为分页查询数据方法--------------
    getExportData () {
      const _this = this
      _this.$axios({
        method: 'get',
        url: '/airBox/findAirBoxList',
        params: {
          deviceCode: this.queryDeviceCode,
          minTime: this.queryMinTime,
          maxTime: this.queryMaxTime
        }
      }).then((response) => {
        _this.exportData = response.data.result.content
      }).catch((error) =>
        console.log(error)) // 请求失败返回的数据 *!/
    }
  }
}
</script>
