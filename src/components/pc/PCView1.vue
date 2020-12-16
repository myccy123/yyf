<template>
  <el-container style="height: 100%; border: 0 solid #eee;">
    <el-main>
      <el-form :inline="true" style=" width: 100%;height: 40px;display: flex;">
        <el-form-item label="单位" style="text-align: left">
          <el-select v-model="queryOrgCode" placeholder="请选择" style="width: 100%" size="mini" @change="reloadDevice">
            <el-option v-for="org in orgList" :key="org.orgCode" :label="org.orgName" :value="org.orgCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备" style="text-align: left">
          <el-select v-model="queryDeviceCode" placeholder="请选择" style="width: 100%" size="mini" @change="getData(0)">
            <el-option v-for="device in deviceList" :key="device.deviceCode" :label="device.deviceName" :value="device.deviceCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker size="mini" style="width: 220px"
                        v-model="value2"
                        type="datetimerange"
                        :picker-options="pickerOptions"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        align="left">
        </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" icon="el-icon-search" plain>查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" icon="el-icon-document" @click="exportToExcel" plain>导出</el-button>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="mini" v-bind:icon="iconData" plain @click="changeDataToChart">{{buttonText}}</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" :height="tableHeight"  border stripe>
        <el-table-column type="index" align="center">
        </el-table-column>
          <el-table-column prop="dateTime" label="时间" width="160" >
          </el-table-column>
          <el-table-column prop="deviceId" label="设备编号" width="120">
          </el-table-column>
          <el-table-column prop="t1" label="#T1[℃]">
          </el-table-column>
          <el-table-column prop="t2" label="#T2[℃]">
          </el-table-column>
          <el-table-column prop="t3" label="#T3[℃]">
          </el-table-column>
          <el-table-column prop="t4" label="#T4[℃]">
          </el-table-column>
          <el-table-column prop="t5" label="#T5[℃]">
          </el-table-column>
          <el-table-column prop="t6" label="#T6[℃]">
          </el-table-column>
          <el-table-column prop="t7" label="#T7[℃]">
          </el-table-column>
          <el-table-column prop="t8" label="#T8[℃]">
          </el-table-column>
          <el-table-column prop="t9" label="#T9[℃]">
          </el-table-column>
          <el-table-column prop="t10" label="#T10[℃]">
          </el-table-column>
          <el-table-column prop="t11" label="#T11[℃]">
          </el-table-column>
          <el-table-column prop="t12" label="#T12[℃]">
          </el-table-column>
          <el-table-column prop="t13" label="#T13[℃]">
          </el-table-column>
          <el-table-column prop="t14" label="#T14[℃]">
          </el-table-column>
          <el-table-column prop="t15" label="#T15[℃]">
          </el-table-column>
          <el-table-column prop="t16" label="#T16[℃]">
          </el-table-column>
          <el-table-column prop="rh1" label="#RH1[%]">
          </el-table-column>
          <el-table-column prop="rh2" label="#RH2[%]">
          </el-table-column>
          <el-table-column prop="rh3" label="#RH3[%]">
          </el-table-column>
          <el-table-column prop="rh4" label="#RH4[%]">
          </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total, sizes, prev, pager, next" @current-change="handleCurrentChange" v-if="pageShow"
        :page-size="pageSize" @size-change="handleSizeChange" align="right" style="padding-right: 50px"
        :current-page="currentPage" :page-sizes="[10, 20, 50, 100]"
        :total="total">
      </el-pagination>
    </el-main>
  </el-container>
</template>
<style>
  .el-table{
    font-size: 14px;
  }
  .el-table td, .el-table th{
    padding: 1px;
  }
</style>

<script>
import '../../excel/Blob.js'
import '../../excel/Export2Excel'
export default {
  name: 'PCView1',
  data () {
    return {
      iconData: 'el-icon-pie-chart',
      buttonText: '图表',
      queryOrgCode: '',
      queryDeviceCode: '',
      tableHeight: window.innerHeight - 135,
      pageShow: 'true',
      currentPage: '1', // 当前页
      pageSize: '20', // 每页大小
      total: '' // 总数量
    }
  },
  created () {
    this.$axios({
      method: 'get',
      url: 'org/findAllByOrgName/' + 0 + '/' + 100,
      params: {
        orgName: ''
      }
    }).then((response) => {
      this.orgList = response.data.content
      this.queryOrgCode = this.orgList[0].orgCode
      this.$axios({
        method: 'get',
        url: 'device/findDeviceByOrgCode',
        params: {
          orgCode: this.queryOrgCode
        }
      }).then((response) => {
        this.deviceList = response.data
        this.queryDeviceCode = this.deviceList[0].deviceCode
      })
    })
    this.getData(0)
  },
  methods: {
    // ----------以下为导出Excel数据功能--------------
    exportToExcel () {
      require.ensure([], () => {
        // eslint-disable-next-line camelcase
        const { export_json_to_excel } = require('../../excel/Export2Excel')
        const tHeader = ['id', '时间', '设备名称', '温度一'] // 上面设置Excel的表格第一行的标题
        const filterVal = ['id', 'dateTime', 'deviceId', 't1'] // 上面的tableData里对象的属性key值
        const list = this.tableData // 把要导出的数据tableData存到list
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '舒适度仪数据')
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    // ----------以下为数据图表切换功能--------------
    changeDataToChart () {
      if (this.iconData === 'el-icon-pie-chart') {
        this.buttonText = '数据'
        this.iconData = 'el-icon-document'
      } else {
        this.buttonText = '图表'
        this.iconData = 'el-icon-pie-chart'
      }
    },
    formatDate (row, column) {
      // 获取单元格数据
      let data = row[column.property]
      if (data == null) {
        return null
      }
      let dt = new Date(data)
      return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate() + ' ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds()
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
    // 查询数据方法
    getData (pageNumber) {
      const _this = this
      _this.$axios({
        method: 'get',
        url: '/deviceData/findAll/' + pageNumber + '/' + _this.pageSize
      }).then((response) => {
        _this.pageSize = response.data.size
        _this.currentPage = (pageNumber + 1)
        _this.total = response.data.totalElements
        _this.tableData = response.data.content
        _this.pageShow = false
        _this.$nextTick(() => {
          _this.pageShow = true
        })
      }).catch((error) =>
        console.log(error)) // 请求失败返回的数据 *!/
    },
    reloadDevice () {
      this.$axios({
        method: 'get',
        url: 'device/findDeviceByOrgCode',
        params: {
          orgCode: this.queryOrgCode
        }
      }).then((response) => {
        this.deviceList = response.data
        this.queryDeviceCode = this.deviceList[0].deviceCode
      })
    }
  }
}
</script>
