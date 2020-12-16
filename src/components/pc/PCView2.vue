<template>
  <div>
    <el-tabs type="card" v-model="tabItem" tab-position="top">
      <el-tab-pane label="tab1" name="tab1">
        <h1>tab1</h1>
        <charts v-if="'tab1' === tabItem">tab1</charts>
      </el-tab-pane>
      <el-tab-pane label="tab2" name="tab2">
        <h1>tab2</h1>
        <charts v-if="'tab2' === tabItem">tab2</charts>
      </el-tab-pane>
      <el-tab-pane label="tab3" name="tab3">
        <h1>tab3</h1>
        <charts v-if="'tab3' === tabItem">tab3</charts>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import charts from '../pc/charts'
export default {
  name: 'PCView2',
  components: {
    charts
  },
  data () {
    return {
      tabItem: 'tab2'
    }
  }
}
</script>

<style>
</style>
