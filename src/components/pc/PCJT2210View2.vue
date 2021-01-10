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
            <el-table-column prop="ch01_t" label="ch01_t[℃]" width="100">
            </el-table-column>
            <el-table-column prop="ch02_t" label="ch02_t[℃]" width="100">
            </el-table-column>
            <el-table-column prop="ch03_t" label="ch03_t[℃]" width="100">
            </el-table-column>
            <el-table-column prop="ch04_t" label="ch04_t[℃]" width="100">
            </el-table-column>
            <el-table-column prop="ch05_t" label="ch05_t[℃]" width="100">
            </el-table-column>
            <el-table-column prop="ch06_t" label="ch06_t[℃]" width="100">
            </el-table-column>
            <el-table-column prop="ch07_t" label="ch07_t[℃]" width="100">
            </el-table-column>
            <el-table-column prop="ch08_t" label="ch08_t[℃]" width="100">
            </el-table-column>
            <el-table-column prop="ch09_t" label="ch09_t[℃]" width="100">
            </el-table-column>
            <el-table-column prop="ch10_t" label="ch10_t[℃]" width="100">
            </el-table-column>
            <el-table-column prop="ch11_t" label="ch11_t[℃]" width="100">
            </el-table-column>
            <el-table-column prop="ch12_t" label="ch12_t[℃]" width="100">
            </el-table-column>
            <el-table-column prop="ch13_h" label="ch13_h[W/m2]" width="120">
            </el-table-column>
            <el-table-column prop="ch14_h" label="ch14_h[W/m2]" width="120">
            </el-table-column>
            <el-table-column prop="ch15_h" label="ch15_h[W/m2]" width="120">
            </el-table-column>
            <el-table-column prop="ch16_h" label="ch16_h[W/m2]" width="120">
            </el-table-column>
            <el-table-column prop="ch17_h" label="ch17_h[W/m2]" width="120">
            </el-table-column>
            <el-table-column prop="ch18_h" label="ch18_h[W/m2]" width="120">
            </el-table-column>
            <el-table-column prop="ch19_t" label="ch19_t[℃]" width="100">
            </el-table-column>
            <el-table-column prop="ch20_t" label="ch20_t[℃]" width="100">
            </el-table-column>
            <el-table-column prop="ch21_t" label="ch21_t[℃]" width="100">
            </el-table-column>
            <el-table-column prop="ch22_t" label="ch22_t[℃]" width="100">
            </el-table-column>
            <el-table-column prop="ch23_t" label="ch23_t[℃]" width="100">
            </el-table-column>
            <el-table-column prop="ch24_t" label="ch24_t[℃]" width="100">
            </el-table-column>
            <el-table-column prop="ch25_h" label="ch25_h[W/m2]" width="120">
            </el-table-column>
            <el-table-column prop="ch25_t" label="ch25_t[℃]" width="100">
            </el-table-column>
            <el-table-column prop="ch26_h" label="ch26_h[W/m2]" width="120">
            </el-table-column>
            <el-table-column prop="ch26_t" label="ch26_t[℃]" width="100">
            </el-table-column>
            <el-table-column prop="ch27_h" label="ch27_h[W/m2]" width="120">
            </el-table-column>
            <el-table-column prop="ch27_t" label="ch27_t[℃]" width="100">
            </el-table-column>
            <el-table-column prop="ch28_h" label="ch28_h[W/m2]" width="120">
            </el-table-column>
            <el-table-column prop="ch28_t" label="ch28_t[℃]" width="100">
            </el-table-column>
            <el-table-column prop="ch29_h" label="ch29_h[W/m2]" width="120">
            </el-table-column>
            <el-table-column prop="ch29_t" label="ch29_t[℃]" width="100">
            </el-table-column>
            <el-table-column prop="ch30_h" label="ch30_h[W/m2]" width="120">
            </el-table-column>
            <el-table-column prop="ch30_t" label="ch30_t[℃]" width="100">
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
                  <TChart chart-title="#CH01_T温度" chart-unit="℃" series-name="温度"
                          :chart-x-data="chartDateTime" :chart-y-data="chartDatach01_t"
                          v-if="'chartView' === activeName">tab1</TChart>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content-right">
                  <div><label>最新数据</label></div>
                  <div class="current_value">{{lastData.ch01_t}}</div>
                  <div class="current_unit">摄氏度[℃]</div>
                  <div class="current_date">更新时间:{{lastData.dateTime}} </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <div class="grid-content-left">
                  <TChart chart-title="#CH02_T温度" chart-unit="℃" series-name="温度"
                          :chart-x-data="chartDateTime" :chart-y-data="chartDatach02_t"
                          v-if="'chartView' === activeName">tab1</TChart>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content-right">
                  <div><label>最新数据</label></div>
                  <div class="current_value">{{lastData.ch02_t}}</div>
                  <div class="current_unit">摄氏度[℃]</div>
                  <div class="current_date">更新时间:{{lastData.dateTime}} </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <div class="grid-content-left">
                  <TChart chart-title="#CH03_T温度" chart-unit="℃" series-name="温度"
                          :chart-x-data="chartDateTime" :chart-y-data="chartDatach03_t"
                          v-if="'chartView' === activeName">tab1</TChart>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content-right">
                  <div><label>最新数据</label></div>
                  <div class="current_value">{{lastData.ch03_t}}</div>
                  <div class="current_unit">摄氏度[℃]</div>
                  <div class="current_date">更新时间:{{lastData.dateTime}} </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <div class="grid-content-left">
                  <TChart chart-title="#CH04_T温度" chart-unit="℃" series-name="温度"
                          :chart-x-data="chartDateTime" :chart-y-data="chartDatach04_t"
                          v-if="'chartView' === activeName">tab1</TChart>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content-right">
                  <div><label>最新数据</label></div>
                  <div class="current_value">{{lastData.ch04_t}}</div>
                  <div class="current_unit">摄氏度[℃]</div>
                  <div class="current_date">更新时间:{{lastData.dateTime}} </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <div class="grid-content-left">
                  <TChart chart-title="#CH05_T温度" chart-unit="℃" series-name="温度"
                          :chart-x-data="chartDateTime" :chart-y-data="chartDatach05_t"
                          v-if="'chartView' === activeName">tab1</TChart>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content-right">
                  <div><label>最新数据</label></div>
                  <div class="current_value">{{lastData.ch05_t}}</div>
                  <div class="current_unit">摄氏度[℃]</div>
                  <div class="current_date">更新时间:{{lastData.dateTime}} </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <div class="grid-content-left">
                  <TChart chart-title="#CH06_T温度" chart-unit="℃" series-name="温度"
                          :chart-x-data="chartDateTime" :chart-y-data="chartDatach06_t"
                          v-if="'chartView' === activeName">tab1</TChart>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content-right">
                  <div><label>最新数据</label></div>
                  <div class="current_value">{{lastData.ch06_t}}</div>
                  <div class="current_unit">摄氏度[℃]</div>
                  <div class="current_date">更新时间:{{lastData.dateTime}} </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <div class="grid-content-left">
                  <TChart chart-title="#CH07_T温度" chart-unit="℃" series-name="温度"
                          :chart-x-data="chartDateTime" :chart-y-data="chartDatach07_t"
                          v-if="'chartView' === activeName">tab1</TChart>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content-right">
                  <div><label>最新数据</label></div>
                  <div class="current_value">{{lastData.ch07_t}}</div>
                  <div class="current_unit">摄氏度[℃]</div>
                  <div class="current_date">更新时间:{{lastData.dateTime}} </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <div class="grid-content-left">
                  <TChart chart-title="#CH08_T温度" chart-unit="℃" series-name="温度"
                          :chart-x-data="chartDateTime" :chart-y-data="chartDatach08_t"
                          v-if="'chartView' === activeName">tab1</TChart>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content-right">
                  <div><label>最新数据</label></div>
                  <div class="current_value">{{lastData.ch08_t}}</div>
                  <div class="current_unit">摄氏度[℃]</div>
                  <div class="current_date">更新时间:{{lastData.dateTime}} </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <div class="grid-content-left">
                  <TChart chart-title="#CH09_T温度" chart-unit="℃" series-name="温度"
                          :chart-x-data="chartDateTime" :chart-y-data="chartDatach09_t"
                          v-if="'chartView' === activeName">tab1</TChart>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content-right">
                  <div><label>最新数据</label></div>
                  <div class="current_value">{{lastData.ch09_t}}</div>
                  <div class="current_unit">摄氏度[℃]</div>
                  <div class="current_date">更新时间:{{lastData.dateTime}} </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <div class="grid-content-left">
                  <TChart chart-title="#CH10_T温度" chart-unit="℃" series-name="温度"
                          :chart-x-data="chartDateTime" :chart-y-data="chartDatach10_t"
                          v-if="'chartView' === activeName">tab1</TChart>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content-right">
                  <div><label>最新数据</label></div>
                  <div class="current_value">{{lastData.ch10_t}}</div>
                  <div class="current_unit">摄氏度[℃]</div>
                  <div class="current_date">更新时间:{{lastData.dateTime}} </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <div class="grid-content-left">
                  <TChart chart-title="#CH11_T温度" chart-unit="℃" series-name="温度"
                          :chart-x-data="chartDateTime" :chart-y-data="chartDatach11_t"
                          v-if="'chartView' === activeName">tab1</TChart>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content-right">
                  <div><label>最新数据</label></div>
                  <div class="current_value">{{lastData.ch11_t}}</div>
                  <div class="current_unit">摄氏度[℃]</div>
                  <div class="current_date">更新时间:{{lastData.dateTime}} </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <div class="grid-content-left">
                  <TChart chart-title="#CH12_T温度" chart-unit="℃" series-name="温度"
                          :chart-x-data="chartDateTime" :chart-y-data="chartDatach12_t"
                          v-if="'chartView' === activeName">tab1</TChart>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content-right">
                  <div><label>最新数据</label></div>
                  <div class="current_value">{{lastData.ch12_t}}</div>
                  <div class="current_unit">摄氏度[℃]</div>
                  <div class="current_date">更新时间:{{lastData.dateTime}} </div>
                </div>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="20">
                <div class="grid-content-left">
                  <TChart chart-title="#CH13_H热流" chart-unit="W/m2" series-name="热流"
                          :chart-x-data="chartDateTime" :chart-y-data="chartDatach13_h"
                          v-if="'chartView' === activeName">tab1</TChart>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content-right">
                  <div><label>最新数据</label></div>
                  <div class="current_value">{{lastData.ch13_h}}</div>
                  <div class="current_unit">瓦/平米[W/m2]</div>
                  <div class="current_date">更新时间:{{lastData.dateTime}} </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <div class="grid-content-left">
                  <TChart chart-title="#CH14_H热流" chart-unit="W/m2" series-name="热流"
                          :chart-x-data="chartDateTime" :chart-y-data="chartDatach14_h"
                          v-if="'chartView' === activeName">tab1</TChart>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content-right">
                  <div><label>最新数据</label></div>
                  <div class="current_value">{{lastData.ch14_h}}</div>
                  <div class="current_unit">瓦/平米[W/m2]</div>
                  <div class="current_date">更新时间:{{lastData.dateTime}} </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <div class="grid-content-left">
                  <TChart chart-title="#CH15_H热流" chart-unit="W/m2" series-name="热流"
                          :chart-x-data="chartDateTime" :chart-y-data="chartDatach15_h"
                          v-if="'chartView' === activeName">tab1</TChart>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content-right">
                  <div><label>最新数据</label></div>
                  <div class="current_value">{{lastData.ch15_h}}</div>
                  <div class="current_unit">瓦/平米[W/m2]</div>
                  <div class="current_date">更新时间:{{lastData.dateTime}} </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <div class="grid-content-left">
                  <TChart chart-title="#CH16_H热流" chart-unit="W/m2" series-name="热流"
                          :chart-x-data="chartDateTime" :chart-y-data="chartDatach16_h"
                          v-if="'chartView' === activeName">tab1</TChart>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content-right">
                  <div><label>最新数据</label></div>
                  <div class="current_value">{{lastData.ch16_h}}</div>
                  <div class="current_unit">瓦/平米[W/m2]</div>
                  <div class="current_date">更新时间:{{lastData.dateTime}} </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <div class="grid-content-left">
                  <TChart chart-title="#CH17_H热流" chart-unit="W/m2" series-name="热流"
                          :chart-x-data="chartDateTime" :chart-y-data="chartDatach17_h"
                          v-if="'chartView' === activeName">tab1</TChart>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content-right">
                  <div><label>最新数据</label></div>
                  <div class="current_value">{{lastData.ch17_h}}</div>
                  <div class="current_unit">瓦/平米[W/m2]</div>
                  <div class="current_date">更新时间:{{lastData.dateTime}} </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <div class="grid-content-left">
                  <TChart chart-title="#CH18_H热流" chart-unit="W/m2" series-name="热流"
                          :chart-x-data="chartDateTime" :chart-y-data="chartDatach18_h"
                          v-if="'chartView' === activeName">tab1</TChart>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content-right">
                  <div><label>最新数据</label></div>
                  <div class="current_value">{{lastData.ch18_h}}</div>
                  <div class="current_unit">瓦/平米[W/m2]</div>
                  <div class="current_date">更新时间:{{lastData.dateTime}} </div>
                </div>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="20">
                <div class="grid-content-left">
                  <TChart chart-title="#CH19_T温度" chart-unit="℃" series-name="温度"
                          :chart-x-data="chartDateTime" :chart-y-data="chartDatach19_t"
                          v-if="'chartView' === activeName">tab1</TChart>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content-right">
                  <div><label>最新数据</label></div>
                  <div class="current_value">{{lastData.ch19_t}}</div>
                  <div class="current_unit">摄氏度[℃]</div>
                  <div class="current_date">更新时间:{{lastData.dateTime}} </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <div class="grid-content-left">
                  <TChart chart-title="#CH20_T温度" chart-unit="℃" series-name="温度"
                          :chart-x-data="chartDateTime" :chart-y-data="chartDatach20_t"
                          v-if="'chartView' === activeName">tab1</TChart>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content-right">
                  <div><label>最新数据</label></div>
                  <div class="current_value">{{lastData.ch20_t}}</div>
                  <div class="current_unit">摄氏度[℃]</div>
                  <div class="current_date">更新时间:{{lastData.dateTime}} </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <div class="grid-content-left">
                  <TChart chart-title="#CH21_T温度" chart-unit="℃" series-name="温度"
                          :chart-x-data="chartDateTime" :chart-y-data="chartDatach21_t"
                          v-if="'chartView' === activeName">tab1</TChart>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content-right">
                  <div><label>最新数据</label></div>
                  <div class="current_value">{{lastData.ch21_t}}</div>
                  <div class="current_unit">摄氏度[℃]</div>
                  <div class="current_date">更新时间:{{lastData.dateTime}} </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <div class="grid-content-left">
                  <TChart chart-title="#CH22_T温度" chart-unit="℃" series-name="温度"
                          :chart-x-data="chartDateTime" :chart-y-data="chartDatach22_t"
                          v-if="'chartView' === activeName">tab1</TChart>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content-right">
                  <div><label>最新数据</label></div>
                  <div class="current_value">{{lastData.ch22_t}}</div>
                  <div class="current_unit">摄氏度[℃]</div>
                  <div class="current_date">更新时间:{{lastData.dateTime}} </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <div class="grid-content-left">
                  <TChart chart-title="#CH23_T温度" chart-unit="℃" series-name="温度"
                          :chart-x-data="chartDateTime" :chart-y-data="chartDatach23_t"
                          v-if="'chartView' === activeName">tab1</TChart>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content-right">
                  <div><label>最新数据</label></div>
                  <div class="current_value">{{lastData.ch23_t}}</div>
                  <div class="current_unit">摄氏度[℃]</div>
                  <div class="current_date">更新时间:{{lastData.dateTime}} </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <div class="grid-content-left">
                  <TChart chart-title="#CH24_T温度" chart-unit="℃" series-name="温度"
                          :chart-x-data="chartDateTime" :chart-y-data="chartDatach24_t"
                          v-if="'chartView' === activeName">tab1</TChart>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content-right">
                  <div><label>最新数据</label></div>
                  <div class="current_value">{{lastData.ch24_t}}</div>
                  <div class="current_unit">摄氏度[℃]</div>
                  <div class="current_date">更新时间:{{lastData.dateTime}} </div>
                </div>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="20">
                <div class="grid-content-left">
                  <TChart chart-title="#CH25_H热流" chart-unit="W/m2" series-name="热流"
                          :chart-x-data="chartDateTime" :chart-y-data="chartDatach25_h"
                          v-if="'chartView' === activeName">tab1</TChart>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content-right">
                  <div><label>最新数据</label></div>
                  <div class="current_value">{{lastData.ch25_h}}</div>
                  <div class="current_unit">瓦/平米[W/m2]</div>
                  <div class="current_date">更新时间:{{lastData.dateTime}} </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <div class="grid-content-left">
                  <TChart chart-title="#CH25_T温度" chart-unit="℃" series-name="温度"
                          :chart-x-data="chartDateTime" :chart-y-data="chartDatach25_t"
                          v-if="'chartView' === activeName">tab1</TChart>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content-right">
                  <div><label>最新数据</label></div>
                  <div class="current_value">{{lastData.ch25_t}}</div>
                  <div class="current_unit">摄氏度[℃]</div>
                  <div class="current_date">更新时间:{{lastData.dateTime}} </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <div class="grid-content-left">
                  <TChart chart-title="#CH26_H热流" chart-unit="W/m2" series-name="热流"
                          :chart-x-data="chartDateTime" :chart-y-data="chartDatach26_h"
                          v-if="'chartView' === activeName">tab1</TChart>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content-right">
                  <div><label>最新数据</label></div>
                  <div class="current_value">{{lastData.ch26_h}}</div>
                  <div class="current_unit">瓦/平米[W/m2]</div>
                  <div class="current_date">更新时间:{{lastData.dateTime}} </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <div class="grid-content-left">
                  <TChart chart-title="#CH26_T温度" chart-unit="℃" series-name="温度"
                          :chart-x-data="chartDateTime" :chart-y-data="chartDatach26_t"
                          v-if="'chartView' === activeName">tab1</TChart>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content-right">
                  <div><label>最新数据</label></div>
                  <div class="current_value">{{lastData.ch26_t}}</div>
                  <div class="current_unit">摄氏度[℃]</div>
                  <div class="current_date">更新时间:{{lastData.dateTime}} </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <div class="grid-content-left">
                  <TChart chart-title="#CH27_H热流" chart-unit="W/m2" series-name="热流"
                          :chart-x-data="chartDateTime" :chart-y-data="chartDatach27_h"
                          v-if="'chartView' === activeName">tab1</TChart>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content-right">
                  <div><label>最新数据</label></div>
                  <div class="current_value">{{lastData.ch27_h}}</div>
                  <div class="current_unit">瓦/平米[W/m2]</div>
                  <div class="current_date">更新时间:{{lastData.dateTime}} </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <div class="grid-content-left">
                  <TChart chart-title="#CH27_T温度" chart-unit="℃" series-name="温度"
                          :chart-x-data="chartDateTime" :chart-y-data="chartDatach27_t"
                          v-if="'chartView' === activeName">tab1</TChart>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content-right">
                  <div><label>最新数据</label></div>
                  <div class="current_value">{{lastData.ch27_t}}</div>
                  <div class="current_unit">摄氏度[℃]</div>
                  <div class="current_date">更新时间:{{lastData.dateTime}} </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <div class="grid-content-left">
                  <TChart chart-title="#CH28_H热流" chart-unit="W/m2" series-name="热流"
                          :chart-x-data="chartDateTime" :chart-y-data="chartDatach28_h"
                          v-if="'chartView' === activeName">tab1</TChart>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content-right">
                  <div><label>最新数据</label></div>
                  <div class="current_value">{{lastData.ch28_h}}</div>
                  <div class="current_unit">瓦/平米[W/m2]</div>
                  <div class="current_date">更新时间:{{lastData.dateTime}} </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <div class="grid-content-left">
                  <TChart chart-title="#CH28_T温度" chart-unit="℃" series-name="温度"
                          :chart-x-data="chartDateTime" :chart-y-data="chartDatach28_t"
                          v-if="'chartView' === activeName">tab1</TChart>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content-right">
                  <div><label>最新数据</label></div>
                  <div class="current_value">{{lastData.ch28_t}}</div>
                  <div class="current_unit">摄氏度[℃]</div>
                  <div class="current_date">更新时间:{{lastData.dateTime}} </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <div class="grid-content-left">
                  <TChart chart-title="#CH29_H热流" chart-unit="W/m2" series-name="热流"
                          :chart-x-data="chartDateTime" :chart-y-data="chartDatach29_h"
                          v-if="'chartView' === activeName">tab1</TChart>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content-right">
                  <div><label>最新数据</label></div>
                  <div class="current_value">{{lastData.ch29_h}}</div>
                  <div class="current_unit">瓦/平米[W/m2]</div>
                  <div class="current_date">更新时间:{{lastData.dateTime}} </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <div class="grid-content-left">
                  <TChart chart-title="#CH29_T温度" chart-unit="℃" series-name="温度"
                          :chart-x-data="chartDateTime" :chart-y-data="chartDatach29_t"
                          v-if="'chartView' === activeName">tab1</TChart>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content-right">
                  <div><label>最新数据</label></div>
                  <div class="current_value">{{lastData.ch29_t}}</div>
                  <div class="current_unit">摄氏度[℃]</div>
                  <div class="current_date">更新时间:{{lastData.dateTime}} </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <div class="grid-content-left">
                  <TChart chart-title="#CH30_H热流" chart-unit="W/m2" series-name="热流"
                          :chart-x-data="chartDateTime" :chart-y-data="chartDatach30_h"
                          v-if="'chartView' === activeName">tab1</TChart>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content-right">
                  <div><label>最新数据</label></div>
                  <div class="current_value">{{lastData.ch30_h}}</div>
                  <div class="current_unit">瓦/平米[W/m2]</div>
                  <div class="current_date">更新时间:{{lastData.dateTime}} </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <div class="grid-content-left">
                  <TChart chart-title="#CH30_T温度" chart-unit="℃" series-name="温度"
                          :chart-x-data="chartDateTime" :chart-y-data="chartDatach30_t"
                          v-if="'chartView' === activeName">tab1</TChart>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content-right">
                  <div><label>最新数据</label></div>
                  <div class="current_value">{{lastData.ch30_t}}</div>
                  <div class="current_unit">摄氏度[℃]</div>
                  <div class="current_date">更新时间:{{lastData.dateTime}} </div>
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
  name: 'PCJT2210View2',
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
      queryProductCode: 'JT2210',
      queryDeviceCode: this.$route.query.deviceCode,
      queryDialogVisible: false,
      activeName: 'dataView',
      iconData: 'el-icon-pie-chart',
      buttonText: '图表',
      tableHeight: window.innerHeight - 135,
      pageShow: 'true',

      currentPage: 1, // 当前页
      pageSize: 50, // 每页大小
      total: 0, // 总数量
      tableData: [],
      chartDateTime: [],
      chartDatach01_t: [],
      chartDatach02_t: [],
      chartDatach03_t: [],
      chartDatach04_t: [],
      chartDatach05_t: [],
      chartDatach06_t: [],
      chartDatach07_t: [],
      chartDatach08_t: [],
      chartDatach09_t: [],
      chartDatach10_t: [],
      chartDatach11_t: [],
      chartDatach12_t: [],
      chartDatach13_h: [],
      chartDatach14_h: [],
      chartDatach15_h: [],
      chartDatach16_h: [],
      chartDatach17_h: [],
      chartDatach18_h: [],
      chartDatach19_t: [],
      chartDatach20_t: [],
      chartDatach21_t: [],
      chartDatach22_t: [],
      chartDatach23_t: [],
      chartDatach24_t: [],
      chartDatach25_h: [],
      chartDatach25_t: [],
      chartDatach26_h: [],
      chartDatach26_t: [],
      chartDatach27_h: [],
      chartDatach27_t: [],
      chartDatach28_h: [],
      chartDatach28_t: [],
      chartDatach29_h: [],
      chartDatach29_t: [],
      chartDatach30_h: [],
      chartDatach30_t: [],
      lastData: {}
    }
  },
  created () {
    this.getData(0);
    this.getCurrentData();
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
        const tHeader = ['时间', 'ch01_t[℃]', 'ch02_t[℃]', 'ch03_t[℃]', 'ch04_t[℃]', 'ch05_t[℃]', 'ch06_t[℃]', 'ch07_t[℃]', 'ch08_t[℃]', 'ch09_t[℃]', 'ch10_t[℃]', 'ch11_t[℃]', 'ch12_t[℃]', 'ch13_h[W/m2]', 'ch14_h[W/m2]', 'ch15_h[W/m2]', 'ch16_h[W/m2]', 'ch17_h[W/m2]', 'ch18_h[W/m2]', 'ch19_t[℃]', 'ch20_t[℃]', 'ch21_t[℃]', 'ch22_t[℃]', 'ch23_t[℃]', 'ch24_t[℃]', 'ch25_h[W/m2]', 'ch25_t[℃]', 'ch26_h[W/m2]', 'ch26_t[℃]', 'ch27_h[W/m2]', 'ch27_t[℃]', 'ch28_h[W/m2]', 'ch28_t[℃]', 'ch29_h[W/m2]', 'ch29_t[℃]', 'ch30_h[W/m2]', 'ch30_t[℃]'] // 上面设置Excel的表格第一行的标题
        const filterVal = ['dateTime', 'ch01_t', 'ch02_t', 'ch03_t', 'ch04_t', 'ch05_t', 'ch06_t', 'ch07_t', 'ch08_t', 'ch09_t', 'ch10_t', 'ch11_t', 'ch12_t', 'ch13_h', 'ch14_h', 'ch15_h', 'ch16_h', 'ch17_h', 'ch18_h', 'ch19_t', 'ch20_t', 'ch21_t', 'ch22_t', 'ch23_t', 'ch24_t', 'ch25_h', 'ch25_t', 'ch26_h', 'ch26_t', 'ch27_h', 'ch27_t', 'ch28_h', 'ch28_t', 'ch29_h', 'ch29_t', 'ch30_h', 'ch30_t'] // 上面的tableData里对象的属性key值
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
    getCurrentData() {
      let url = '/JT2210/findLatestData';
      let params = {deviceCode: this.queryDeviceCode};
      this.$axios.get(url, {params: params}).then(res=>{
        let data = res.data;

        this.lastData.ch01_t = data.ch01_t;
        this.lastData.ch02_t = data.ch02_t;
        this.lastData.ch03_t = data.ch03_t;
        this.lastData.ch04_t = data.ch04_t;
        this.lastData.ch05_t = data.ch05_t;
        this.lastData.ch06_t = data.ch06_t;
        this.lastData.ch07_t = data.ch07_t;
        this.lastData.ch08_t = data.ch08_t;
        this.lastData.ch09_t = data.ch09_t;
        this.lastData.ch10_t = data.ch10_t;
        this.lastData.ch11_t = data.ch11_t;
        this.lastData.ch12_t = data.ch12_t;
        this.lastData.ch13_h = data.ch13_h;
        this.lastData.ch14_h = data.ch14_h;
        this.lastData.ch15_h = data.ch15_h;
        this.lastData.ch16_h = data.ch16_h;
        this.lastData.ch17_h = data.ch17_h;
        this.lastData.ch18_h = data.ch18_h;
        this.lastData.ch19_t = data.ch19_t;
        this.lastData.ch20_t = data.ch20_t;
        this.lastData.ch21_t = data.ch21_t;
        this.lastData.ch22_t = data.ch22_t;
        this.lastData.ch23_t = data.ch23_t;
        this.lastData.ch24_t = data.ch24_t;
        this.lastData.ch25_h = data.ch25_h;
        this.lastData.ch25_t = data.ch25_t;
        this.lastData.ch26_h = data.ch26_h;
        this.lastData.ch26_t = data.ch26_t;
        this.lastData.ch27_h = data.ch27_h;
        this.lastData.ch27_t = data.ch27_t;
        this.lastData.ch28_h = data.ch28_h;
        this.lastData.ch28_t = data.ch28_t;
        this.lastData.ch29_h = data.ch29_h;
        this.lastData.ch29_t = data.ch29_t;
        this.lastData.ch30_h = data.ch30_h;
        this.lastData.ch30_t = data.ch30_t;
        this.lastData.dateTime = data.dateTime;


      }).catch(err=>{
        console.log(err)
      })

    },
    // ----------以下为分页查询数据方法--------------
    getData (pageNumber) {
      const _this = this
      _this.$axios({
        method: 'get',
        url: '/JT2210/findJT2210ListByPage/' + pageNumber + '/' + _this.pageSize,
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
        _this.chartDatach01_t = []
        _this.chartDatach02_t = []
        _this.chartDatach03_t = []
        _this.chartDatach04_t = []
        _this.chartDatach05_t = []
        _this.chartDatach06_t = []
        _this.chartDatach07_t = []
        _this.chartDatach08_t = []
        _this.chartDatach09_t = []
        _this.chartDatach10_t = []
        _this.chartDatach11_t = []
        _this.chartDatach12_t = []
        _this.chartDatach13_h = []
        _this.chartDatach14_h = []
        _this.chartDatach15_h = []
        _this.chartDatach16_h = []
        _this.chartDatach17_h = []
        _this.chartDatach18_h = []
        _this.chartDatach19_t = []
        _this.chartDatach20_t = []
        _this.chartDatach21_t = []
        _this.chartDatach22_t = []
        _this.chartDatach23_t = []
        _this.chartDatach24_t = []

        _this.chartDatach25_h = []
        _this.chartDatach25_t = []
        _this.chartDatach26_h = []
        _this.chartDatach26_t = []
        _this.chartDatach27_h = []
        _this.chartDatach27_t = []
        _this.chartDatach28_h = []
        _this.chartDatach28_t = []
        _this.chartDatach29_h = []
        _this.chartDatach29_t = []
        _this.chartDatach30_h = []
        _this.chartDatach30_t = []

        for (let item of _this.tableData) {
          _this.chartDateTime.push(item['dateTime'])
          _this.chartDatach01_t.push(item['ch01_t'])
          _this.chartDatach02_t.push(item['ch02_t'])
          _this.chartDatach03_t.push(item['ch03_t'])
          _this.chartDatach04_t.push(item['ch04_t'])
          _this.chartDatach05_t.push(item['ch05_t'])
          _this.chartDatach06_t.push(item['ch06_t'])

          _this.chartDatach07_t.push(item['ch07_t'])
          _this.chartDatach08_t.push(item['ch08_t'])
          _this.chartDatach09_t.push(item['ch09_t'])
          _this.chartDatach10_t.push(item['ch10_t'])
          _this.chartDatach11_t.push(item['ch11_t'])
          _this.chartDatach12_t.push(item['ch12_t'])

          _this.chartDatach13_h.push(item['ch13_h'])
          _this.chartDatach14_h.push(item['ch14_h'])
          _this.chartDatach15_h.push(item['ch15_h'])
          _this.chartDatach16_h.push(item['ch16_h'])
          _this.chartDatach17_h.push(item['ch17_h'])
          _this.chartDatach18_h.push(item['ch18_h'])

          _this.chartDatach19_t.push(item['ch19_t'])
          _this.chartDatach20_t.push(item['ch20_t'])
          _this.chartDatach21_t.push(item['ch21_t'])
          _this.chartDatach22_t.push(item['ch22_t'])
          _this.chartDatach23_t.push(item['ch23_t'])
          _this.chartDatach24_t.push(item['ch24_t'])

          _this.chartDatach25_h.push(item['ch25_h'])
          _this.chartDatach25_t.push(item['ch25_t'])
          _this.chartDatach26_h.push(item['ch26_h'])
          _this.chartDatach26_t.push(item['ch26_t'])
          _this.chartDatach27_h.push(item['ch27_h'])
          _this.chartDatach27_t.push(item['ch27_t'])
          _this.chartDatach28_h.push(item['ch28_h'])
          _this.chartDatach28_t.push(item['ch28_t'])
          _this.chartDatach29_h.push(item['ch29_h'])
          _this.chartDatach29_t.push(item['ch29_t'])
          _this.chartDatach30_h.push(item['ch30_h'])
          _this.chartDatach30_t.push(item['ch30_t'])
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
        url: '/JT2210/findJT2210List',
        params: {
          deviceCode: this.queryDeviceCode,
          minTime: this.queryMinTime,
          maxTime: this.queryMaxTime
        }
      }).then((response) => {
        _this.exportData = response.data.result.content
      }).catch((error) =>
        console.log(error)) // 请求失败返回的数据 *!/
    },
    // ----------以下为重新选择设备名称后的操作--------------
    reloadDevice () {
      this.$axios({
        method: 'get',
        url: 'device/findDeviceByOrgAndProduct',
        params: {
          orgCode: this.queryOrgCode,
          productCode: this.queryProductCode
        }
      }).then((response) => {
        this.deviceList = response.data
        this.queryDeviceCode = this.deviceList.length > 0 ? this.deviceList[0].deviceCode : ''
        this.getData(0)
      })
    }
  }
}
</script>
