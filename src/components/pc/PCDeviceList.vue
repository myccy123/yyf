<template>
  <el-container style="height: 100%; border: 0 solid #eee;">
    <el-main>
      <el-form :inline="true" style="width: 100%;height: 40px;display: flex;">
        <el-form-item>
          <el-input v-model="queryDeviceName" placeholder="请输入设备名称" style="margin-block: 7px;" size="mini" clearable @clear="getDeviceList(0)">
            <el-button @click="getDeviceList(0)" slot="append" icon="el-icon-search" size="mini"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <!--添加按钮-->
          <el-button @click="addDialogVisible = true" type="primary" size="mini" icon="el-icon-circle-plus-outline" style="line-height: 0;">添加</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" :height="tableHeight"  border stripe>
        <el-table-column type="index" align="center" label="#" >
        </el-table-column>
        <el-table-column prop="image" label="图片" width="70" align="center">
          <!-- 图片的显示 -->
          <template slot-scope="scope">
            <img src="../../assets/img/JTlogo.png" style="vertical-align:middle;width: 50px;height: 50px;" alt=""/>
            <!--<img :src="scope.row.image"  width="70" height="70"  alt=""/>-->
          </template>
        </el-table-column>
        <el-table-column prop="deviceCode" label="设备编码" width="220">
        </el-table-column>
        <el-table-column prop="deviceCode" label="设备编码" width="180">
          <template slot-scope="scope">
            <router-link :to="{path:scope.row.productCode, query: {deviceCode:scope.row.deviceCode}}">{{ scope.row.deviceCode}}</router-link>
          </template>
        </el-table-column>
        <el-table-column prop="deviceName" label="设备名称" width="150">
        </el-table-column>
        <el-table-column prop="memo" label="备注" >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!--修改按钮-->
            <el-button type="primary" size="mini" @click="showEditDialog(scope.row)"
                       icon="el-icon-edit" circle>
            </el-button>
            <!--删除按钮-->
            <el-button size="mini" type="danger" @click="deleteDevice(scope.row)"
                       icon="el-icon-delete" circle>
            </el-button>
            <!--分享设备按钮-->
            <el-tooltip class="item" effect="dark" content="分享设备" placement="top" :enterable="false">
              <el-button size="mini" type="success" @click="showShareDialog(scope.row)"
                         icon="el-icon-share" circle>
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total, sizes, prev, pager, next"  v-if="pageShow" align="left"
        :total="total" :page-size="pageSize" :current-page="currentPage" :page-sizes="[20, 50, 100]"
        @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
      <!--添加设备对话框-->
      <el-dialog title="添加设备" :visible.sync="addDialogVisible" width="30%"
                 @close="addDialogClosed">
        <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px"
                 label-position="right" size="small">
          <el-form-item label="设备编码" prop="deviceCode">
            <el-input v-model="addForm.deviceCode"></el-input>
          </el-form-item>
          <el-form-item label="设备名称" prop="deviceName">
            <el-input v-model="addForm.deviceName"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="memo">
            <el-input v-model="addForm.memo" type="textarea" resize="none"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="addDevice" size="mini">确 定</el-button>
        </span>
      </el-dialog>
      <!--修改设备对话框-->
      <el-dialog title="修改设备" :visible.sync="editDialogVisible" width="30%"
                 @close="editDialogClosed">
        <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="80px"
                 label-position="right" size="small">
          <el-form-item label="设备名称" prop="deviceName">
            <el-input v-model="editForm.deviceName"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="memo">
            <el-input v-model="editForm.memo" type="textarea" resize="none"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="editDevice" size="mini">确 定</el-button>
        </span>
      </el-dialog>
      <!--分享设备对话框-->
      <el-dialog title="分享设备" :visible.sync="shareDialogVisible" width="300px" @opened="ShowQRCode"
                 @close="shareDialogClosed">
        <!--写在vue对应的元素里-->
        <div id="qrcode" class="qrcode" ref="qrcodeContainer" style="padding: 40px 20px;display: flex;justify-content: center"></div>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<style>
  .el-table{
    font-size: 14px;
  }
  .el-table td, .el-table th{
    padding: 3px 0;
  }
  .el-dialog__body {
    padding: 0px 20px;
  }
</style>

<script>
import QRCode from 'qrcodejs2'
export default {
  name: 'PCDeviceInfo',
  data () {
    return {
      /** **************************添加设备对话框************************** **/
      addDialogVisible: false,
      addForm: {
        deviceCode: '',
        deviceName: '',
        memo: ''
      },
      addFormRules: {
        deviceCode: [
          {required: true, message: '请输入设备编码', trigger: 'blur'},
          {min: 16, max: 24, message: '设备编码长度有误！', trigger: 'blur'}
        ],
        deviceName: [
          {required: true, message: '请输入设备名称', trigger: 'blur'},
          {min: 3, max: 10, message: '设备名称长度在3~10个字符之间', trigger: 'blur'}
        ]
      },
      /** **************************修改设备对话框************************** **/
      editDialogVisible: false,
      editForm: {
        deviceName: '',
        memo: ''
      },
      editFormRules: {
        deviceName: [
          {required: true, message: '请输入设备名称', trigger: 'blur'},
          {min: 3, max: 10, message: '设备名称长度在3~10个字符之间', trigger: 'blur'}
        ]
      },
      /** **************************分享设备对话框************************** **/
      shareDialogVisible: false,
      shareDeviceID: '',
      /** **************************分页查询参数************************** **/
      queryDeviceName: '', // 用于模糊查询的 DeviceName
      pageShow: 'true',
      currentPage: '1', // 当前页
      pageSize: '20', // 每页大小
      total: '', // 总数量
      tableHeight: window.innerHeight - 135
    }
  },
  created () {
    this.getDeviceList(0)
  },
  methods: {
    /** **************************查询数据分页方法************************** **/
    // 分页页码变化
    handleCurrentChange (currentPage) {
      this.getDeviceList(currentPage - 1)
    },
    // 每页大小变化
    handleSizeChange (newSize) {
      this.pageSize = newSize
      this.currentPage = 1
      this.getDeviceList(0)
    },
    // 查询数据方法
    getDeviceList (pageNumber) {
      const _this = this
      _this.$axios({
        method: 'get',
        url: 'device/findAllByDeviceName/' + pageNumber + '/' + _this.pageSize,
        params: {
          deviceName: _this.queryDeviceName
        }
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
    /** **************************添加设备方法************************** **/
    // 关闭添加用户对话框
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    // 添加用户方法
    addDevice () {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) {
          return false
        }
        const {data: res} = await this.$axios.post('/device/save', this.addForm)
        if (res.status === 201) {
          this.$message.success('添加设备成功！')
          this.addDialogVisible = false
          this.getDeviceList(0)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    /** **************************修改设备方法************************** **/
    // 打开修改对话框
    async showEditDialog (row) {
      const {data: res} = await this.$axios.get('/device/' + row.deviceCode)
      if (res.status === 200) {
        this.editForm = res.device
        this.editDialogVisible = true
      } else {
        this.$message.error(res.message)
      }
    },
    // 关闭修改设备对话框
    editDialogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    // 修改设备方法
    async editDevice () {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) {
          return false
        }
        const {data: res} = await this.$axios.put('/device/update', this.editForm)
        if (res.status === 200) {
          this.editDialogVisible = false
          this.getDeviceList(0)
          this.$message.success('修改设备信息成功！')
        } else {
          this.$message.error(res.message)
        }
      })
    },
    /** **************************删除设备方法************************** **/
    async deleteDevice (row) {
      const confirmResult = await this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // 如果用户确认删除，返回值为字符串 confirm
      // 如果用户取消删除，返回值为字符串 cancel
      if (confirmResult === 'confirm') {
        const {data: res} = await this.$axios.delete('/device/deleteDevice?deviceCode=' + row.deviceCode)
        if (res.status === 200) {
          this.getDeviceList(0)
          this.$message.success('删除设备信息成功！')
        } else {
          return this.$message.error(res.message)
        }
      }
    },
    /** **************************分享设备方法************************** **/
    // 打开分享设备对话框
    showShareDialog (row) {
      this.shareDeviceID = row.deviceCode
      this.shareDialogVisible = true
    },
    // 关闭分享设备对话框
    shareDialogClosed () {
      document.getElementById('qrcode').innerHTML = ''
    },
    // vue对象的一个method
    ShowQRCode: function () {
      // eslint-disable-next-line no-new
      new QRCode(this.$refs.qrcodeContainer, {
        width: 200, // 二维码宽度，单位像素
        height: 200, // 二维码高度，单位像素
        background: '#fff4', // 二维码的后景色
        foreground: '#000000', // 二维码的前景色
        text: this.shareDeviceID, // 生成二维码的链接
        correctLevel: QRCode.CorrectLevel.H // 容错率，L/M/H
      })
    },
    toDataPage () {
      alert('123456789')
    }
  }
}
</script>
