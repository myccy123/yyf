<template>
  <el-container style="height: 100%; border: 0 solid #eee;">
    <el-main>
      <el-form :inline="true" style="width: 100%;height: 40px;display: flex;">
        <el-form-item>
          <!--添加按钮-->
          <el-button @click="showAddDialog" type="primary" size="mini" icon="el-icon-circle-plus-outline" style="line-height: 0;">生成二维码</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" :height="tableHeight"  border stripe>
        <el-table-column type="index" align="center" label="#">
        </el-table-column>
        <el-table-column prop="productCode" label="产品型号" width="120">
        </el-table-column>
        <el-table-column prop="deviceName" label="设备名称" width="200">
        </el-table-column>
        <el-table-column prop="deviceCode" label="设备二维码" width="250">
        </el-table-column>
        <el-table-column prop="memo" label="备注信息" >
        </el-table-column>
        <el-table-column prop="dateTime" label="创建时间" >
        </el-table-column>
        <el-table-column label="操作" align="center" width="200px">
          <template slot-scope="scope">
            <!--修改按钮-->
            <el-button type="primary" size="mini" @click="showEditDialog(scope.row)"
                       icon="el-icon-edit" circle>
            </el-button>
            <!--删除按钮-->
            <el-button size="mini" type="danger" @click="deleteDeviceQRCode(scope.row)"
                       icon="el-icon-delete" circle>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total, sizes, prev, pager, next"  v-if="pageShow" align="left"
        :total="total" :page-size="pageSize" :current-page="currentPage" :page-sizes="[20, 50, 100]"
        @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
      <!--选择产品型号对话框-->
      <el-dialog title="选择产品类型" :visible.sync="addDialogVisible" width="30%"
                 @close="addDialogClosed">
        <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px"
                 label-position="right" size="small">
          <el-form-item label="产品型号" style="text-align: left">
            <el-select v-model="addForm.productCode" placeholder="请选择" style="width: 100%" size="mini" >
              <el-option v-for="product in productList" :key="product.productCode" :label="product.productCode+' '+product.productName" :value="product.productCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false" size="mini">取 消</el-button>
          <el-button @click="showCreateDialog" type="primary" size="mini">生 成</el-button>
        </span>
      </el-dialog>
      <!--生成设备二维码对话框-->
      <el-dialog title="设备二维码" :visible.sync="createDialogVisible" width="520px"
                 @opened="ShowQRCode" @close="createDialogClosed">
        <el-row :gutter="20">
          <el-col :span="10">
            <div id="qrcode" ref="qrcodeContainer"
                 style="padding: 5px 5px;display: flex;justify-content: center;">
          </div>
          </el-col>
          <el-col :span="14">
              <el-form :model="createForm" :rules="createFormRules" ref="createFormRef" label-width="110px"
                       label-position="right" size="small" style="padding-top: 0;padding-left: 0;">
                <el-form-item label="【产品型号】" >
                  <el-input v-model="createForm.productCode" size="mini" style="padding: 0;" disabled>
                  </el-input>
                </el-form-item>
                <el-form-item label="【设备编码】" prop="deviceCode" >
                  <el-input v-model="createForm.deviceCode" size="mini" disabled>
                  </el-input>
                </el-form-item>
                <el-form-item label="【设备名称】" prop="deviceName">
                  <el-input v-model="createForm.deviceName" size="mini" >
                  </el-input>
                </el-form-item>
                <el-form-item label="【备注信息】" prop="memo">
                  <el-input v-model="createForm.memo" size="mini" ></el-input>
                </el-form-item>
              </el-form>
          </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="createDialogVisible = false" size="mini">取 消</el-button>
          <el-button @click="saveDeviceQRCode" type="primary" size="mini">保 存</el-button>
        </span>
      </el-dialog>
      <!--修改设备对话框-->
      <el-dialog title="修改产品" :visible.sync="editDialogVisible" width="520px"
                 @opened="ShowEditQRCode" @close="editDialogClosed">
        <el-row :gutter="20">
          <el-col :span="10">
            <div id="qrCodeEdit" ref="qrcodeContainerEdit"
                 style="padding: 5px 5px;display: flex;justify-content: center;">
            </div>
          </el-col>
          <el-col :span="14">
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="110px"
                     label-position="right" size="small" style="padding-top: 0;padding-left: 0;">
              <el-form-item label="【产品型号】" >
                <el-input v-model="editForm.productCode" size="mini" style="padding: 0;" disabled>
                </el-input>
              </el-form-item>
              <el-form-item label="【设备编码】" >
                <el-input v-model="editForm.deviceCode" size="mini">
                </el-input>
              </el-form-item>
              <el-form-item label="【设备名称】" prop="deviceName">
                <el-input v-model="editForm.deviceName" size="mini" >
                </el-input>
              </el-form-item>
              <el-form-item label="【备注信息】" prop="memo">
                <el-input v-model="editForm.memo" size="mini" ></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="editDeviceQRCode" size="mini">确 定</el-button>
        </span>
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
  name: 'PCDeviceQRCodeList',
  data () {
    return {
      /** **************************选择产品型号对话框************************** **/
      addDialogVisible: false,
      addForm: {
        productCode: ''
      },
      addFormRules: {
        productCode: [
          {required: true, message: '请输入产品型号', trigger: 'blur'}
        ]
      },
      /** **************************生成设备二维码对话框************************** **/
      createDialogVisible: false,
      createForm: {
        deviceCode: '',
        deviceName: '',
        productCode: '',
        memo: ''
      },
      createFormRules: {
        productCode: [
          {required: true, message: '请输入产品型号', trigger: 'blur'}
        ],
        deviceName: [
          {required: true, message: '请输入设备名称', trigger: 'blur'},
          {min: 3, max: 20, message: '名称长度在3~10个字符之间', trigger: 'blur'}
        ]
      },
      /** **************************修改对话框************************** **/
      editDialogVisible: false,
      editForm: {
        deviceName: '',
        memo: ''
      },
      editFormRules: {
        deviceName: [
          {required: true, message: '请输入产品名称', trigger: 'blur'},
          {min: 3, max: 20, message: '名称长度在3~10个字符之间', trigger: 'blur'}
        ]
      },
      /** **************************分页查询参数************************** **/
      pageShow: 'true',
      currentPage: '1', // 当前页
      pageSize: '20', // 每页大小
      total: '', // 总数量
      tableHeight: window.innerHeight - 135
    }
  },
  created () {
    this.getDeviceQRCodeList(0)
  },
  methods: {
    /** **************************查询数据分页方法************************** **/
    // 分页页码变化
    handleCurrentChange (currentPage) {
      this.getDeviceQRCodeList(currentPage - 1)
    },
    // 每页大小变化
    handleSizeChange (newSize) {
      this.pageSize = newSize
      this.currentPage = 1
      this.getDeviceQRCodeList(0)
    },
    // 查询数据方法
    getDeviceQRCodeList (pageNumber) {
      const _this = this
      _this.$axios({
        method: 'get',
        url: 'deviceQRCode/findAllDeviceQRCode/' + pageNumber + '/' + _this.pageSize
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
    /** **************************选择产品型号************************** **/
    // 打开选择产品型号对话框
    showAddDialog () {
      this.$axios({
        method: 'get',
        url: 'product/findAllProducts/' + 0 + '/' + 100,
        params: {
        }
      }).then((response) => {
        this.productList = response.data.content
        this.addForm.productCode = this.productList[0].productCode
      })
      this.addDialogVisible = true
    },
    // 关闭添加对话框
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    /** **************************生成二维码************************** **/
    // 打开生成二维码对话框
    showCreateDialog () {
      // 生成uuid
      this.creatUuid()
      this.createForm.productCode = this.addForm.productCode

      this.createDialogVisible = true
    },
    // 保存二维码方法
    saveDeviceQRCode () {
      this.$refs.createFormRef.validate(async valid => {
        if (!valid) {
          return false
        }
        const {data: res} = await this.$axios.post('/deviceQRCode/save', this.createForm)
        if (res.status === 201) {
          this.$message.success('添加设备二维码成功！')
          this.createDialogVisible = false
          this.getDeviceQRCodeList(0)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 关闭分享设备对话框
    createDialogClosed () {
      document.getElementById('qrcode').innerHTML = ''
      this.createForm.deviceName = ''
      this.$refs.createFormRef.resetFields()
    },
    // 生成设备二维码uuid
    creatUuid () {
      const s = []
      const hexDigits = '0123456789abcdef'
      for (let i = 0; i < 24; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
      }
      s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
      // s[8] = s[13] = s[18] = '-'
      this.createForm.deviceCode = s.join('')
    },
    ShowQRCode: function () {
      // eslint-disable-next-line no-new
      new QRCode(this.$refs.qrcodeContainer, {
        width: 200, // 二维码宽度，单位像素
        height: 200, // 二维码高度，单位像素
        background: '#fff4', // 二维码的后景色
        foreground: '#000000', // 二维码的前景色
        text: this.createForm.deviceCode, // 生成二维码的链接
        correctLevel: QRCode.CorrectLevel.H // 容错率，L/M/H
      })
    },
    /** **************************修改方法************************** **/
    // 打开修改对话框
    async showEditDialog (row) {
      const {data: res} = await this.$axios.get('/deviceQRCode/' + row.deviceCode)
      if (res.status === 200) {
        this.editForm = res.deviceQRCode
        this.editDialogVisible = true
      } else {
        this.$message.error(res.message)
      }
    },
    // 关闭修改对话框
    editDialogClosed () {
      document.getElementById('qrCodeEdit').innerHTML = ''
      this.$refs.editFormRef.resetFields()
    },
    ShowEditQRCode: function () {
      // eslint-disable-next-line no-new
      new QRCode(this.$refs.qrcodeContainerEdit, {
        width: 200, // 二维码宽度，单位像素
        height: 200, // 二维码高度，单位像素
        background: '#fff4', // 二维码的后景色
        foreground: '#000000', // 二维码的前景色
        text: this.editForm.deviceCode, // 生成二维码的链接
        correctLevel: QRCode.CorrectLevel.H // 容错率，L/M/H
      })
    },
    // 修改方法
    async editDeviceQRCode () {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) {
          return false
        }
        const {data: res} = await this.$axios.put('/deviceQRCode/update', this.editForm)
        if (res.status === 200) {
          this.editDialogVisible = false
          this.getDeviceQRCodeList(0)
          this.$message.success('修改设备信息成功！')
        } else {
          this.$message.error(res.message)
        }
      })
    },
    /** **************************删除方法************************** **/
    async deleteDeviceQRCode (row) {
      const confirmResult = await this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // 如果用户确认删除，返回值为字符串 confirm
      // 如果用户取消删除，返回值为字符串 cancel
      if (confirmResult === 'confirm') {
        const {data: res} = await this.$axios.delete('/deviceQRCode/deleteDeviceQRCode?deviceCode=' + row.deviceCode)
        if (res.status === 200) {
          this.getDeviceQRCodeList(0)
          this.$message.success('删除设备信息成功！')
        } else {
          return this.$message.error(res.message)
        }
      }
    }
  }
}
</script>
