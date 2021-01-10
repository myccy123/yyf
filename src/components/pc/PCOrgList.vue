<template>
  <el-container style="height: 100%; border: 0 solid #eee;">
    <el-main>
      <el-form :inline="true" style="width: 100%;height: 40px;display: flex;">
        <el-form-item>
          <el-input v-model="queryOrgName" placeholder="请输入单位名称搜索" style="margin-block: 7px;" size="mini" clearable @clear="getOrgList(0)">
            <el-button @click="getOrgList(0)" slot="append" icon="el-icon-search" size="mini"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <!--添加按钮-->
          <el-button @click="addDialogVisible = true" type="primary" size="mini" icon="el-icon-circle-plus-outline" style="line-height: 0;">添加</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" :height="tableHeight"  border stripe>
        <el-table-column type="index" align="center">
        </el-table-column>
        <!--<el-table-column prop="orgcode" label="单位编码" width="100" hidden>
        </el-table-column>-->
        <el-table-column prop="orgName" label="单位名称" width="150">
        </el-table-column>
        <el-table-column prop="linkman" label="联系人" width="100">
        </el-table-column>
        <el-table-column prop="tel" label="联系电话" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址" width="180">
        </el-table-column>
        <el-table-column prop="memo" label="备注" width="250">
        </el-table-column>
        <el-table-column label="操作" align="center" width="200px">
          <template slot-scope="scope">
            <!--修改按钮-->
            <el-tooltip class="item" effect="dark" content="修改" placement="top" :enterable="false">
              <el-button type="primary" size="mini" @click="showEditDialog(scope.row)"
                         icon="el-icon-edit" circle>
              </el-button>
            </el-tooltip>
            <!--删除按钮-->
            <el-tooltip class="item" effect="dark" content="删除" placement="top" :enterable="false">
              <el-button size="mini" type="danger" @click="deleteOrg(scope.row)"
                         icon="el-icon-delete" circle>
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
      <!--添加用户对话框-->
      <el-dialog title="添加单位" :visible.sync="addDialogVisible" width="30%"
                 @close="addDialogClosed">
        <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px"
                 label-position="right" size="small">
          <el-form-item label="单位编码" prop="orgCode" hidden>
            <el-input v-model="addForm.orgCode"></el-input>
          </el-form-item>
          <el-form-item label="单位名称" prop="orgName">
            <el-input v-model="addForm.orgName"></el-input>
          </el-form-item>
          <el-form-item label="联系人" prop="linkman">
            <el-input v-model="addForm.linkman"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="tel">
            <el-input v-model="addForm.tel" οninput="value=value.replace(/[^\d]/g,'')"></el-input>
          </el-form-item>
          <el-form-item label="单位地址" prop="address">
            <el-input v-model="addForm.address" type="textarea" resize="none"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="memo">
            <el-input v-model="addForm.memo" type="textarea" resize="none"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="addUser" size="mini">确 定</el-button>
        </span>
      </el-dialog>
      <!--修改用户对话框-->
      <el-dialog title="修改单位" :visible.sync="editDialogVisible" width="30%"
                 @close="editDialogClosed">
        <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="80px"
                 label-position="right" size="small">
          <!--
          <el-form-item label="单位编码" prop="orgcode" hidden>
            <el-input v-model="editForm.orgcode"></el-input>
          </el-form-item>
          -->
          <el-form-item label="单位名称" prop="orgName">
            <el-input v-model="editForm.orgName"></el-input>
          </el-form-item>
          <el-form-item label="联系人" prop="linkman">
            <el-input v-model="editForm.linkman"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="tel">
            <el-input v-model="editForm.tel"></el-input>
          </el-form-item>
          <el-form-item label="单位地址" prop="address">
            <el-input v-model="editForm.address" type="textarea" resize="none"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="memo">
            <el-input v-model="editForm.memo" type="textarea" resize="none"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="editUser" size="mini">确 定</el-button>
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
export default {
  name: 'PCOrgInfo',
  data () {
    // 验证手机号规则
    var checkMobile = (rule, value, callback) => {
      const phoneReg = /^1[34578]\d{9}$$/
      /* if (!value) {
        return callback(new Error('手机号码不能为空'))
      } */
      setTimeout(() => {
        // Number.isInteger是es6验证数字是否为整数的方法,实际输入的数字总是识别成字符串
        // 所以在前面加了一个+实现隐式转换
        if (!Number.isInteger(+value)) {
          callback(new Error('请输入数字值！'))
        } else {
          if (phoneReg.test(value)) {
            callback()
          } else {
            callback(new Error('手机号码格式不正确！'))
          }
        }
      }, 100)
    }
    return {
      /** **************************添加单位对话框************************** **/
      addDialogVisible: false,
      addForm: {
        orgCode: '',
        orgName: '',
        linkman: '',
        tel: '',
        address: '',
        memo: ''
      },
      addFormRules: {
        orgCode: [
          {required: true, message: '请输入单位编码', trigger: 'blur'},
          {min: 3, max: 10, message: '单位编码长度在3~10个字符之间', trigger: 'blur'}
        ],
        orgName: [
          {required: true, message: '请输入单位名称', trigger: 'blur'},
          {min: 3, max: 10, message: '单位名称长度在3~10个字符之间', trigger: 'blur'}
        ],
        tel: [
          {required: true, message: '请输入联系电话', trigger: 'blur'},
          {validator: checkMobile, trigger: 'blur'}
        ],
        linkman: [
          {required: true, message: '联系人', trigger: 'blur'}
        ]
      },
      /** **************************修改用户对话框************************** **/
      editDialogVisible: false,
      editForm: {
        orgCode: '',
        orgName: '',
        linkman: '',
        tel: '',
        address: '',
        memo: ''
      },
      editFormRules: {
        orgName: [
          {required: true, message: '请输入单位名称', trigger: 'blur'},
          {min: 3, max: 10, message: '单位名称长度在3~10个字符之间', trigger: 'blur'}
        ],
        tel: [
          {required: true, message: '请输入联系电话', trigger: 'blur'},
          {validator: checkMobile, trigger: 'blur'}
        ],
        linkman: [
          {required: true, message: '请输入联系人', trigger: 'blur'}
        ]
      },
      /** **************************分页查询参数************************** **/
      queryOrgName: '', // 用于模糊查询的 queryOrgName
      pageShow: 'true',
      currentPage: '1', // 当前页
      pageSize: '20', // 每页大小
      total: '', // 总数量
      tableHeight: window.innerHeight - 135
    }
  },
  created () {
    this.getOrgList(0)
  },
  methods: {
    /** **************************查询数据分页方法************************** **/
    // 分页页码变化
    handleCurrentChange (currentPage) {
      this.getOrgList(currentPage - 1)
    },
    // 每页大小变化
    handleSizeChange (newSize) {
      this.pageSize = newSize
      this.currentPage = 1
      this.getOrgList(0)
    },
    // 查询数据方法
    getOrgList (pageNumber) {
      const _this = this
      _this.$axios({
        method: 'get',
        url: 'org/findAllByOrgName/' + pageNumber + '/' + _this.pageSize,
        params: {
          orgName: _this.queryOrgName
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
    /** **************************添加单位方法************************** **/
    // 关闭添加单位对话框
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    // 添加单位方法
    addUser () {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) {
          return false
        }
        const {data: res} = await this.$axios.post('/org/save', this.addForm)
        if (res.status === 201) {
          this.$message.success('添加单位成功！')
          this.addDialogVisible = false
          this.getOrgList(0)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    /** **************************修改单位方法************************** **/
    // 打开修改对话框
    async showEditDialog (row) {
      const {data: res} = await this.$axios.get('/org/' + row.orgCode)
      if (res.status === 200) {
        this.editForm = res.org
        this.editDialogVisible = true
      } else {
        this.$message.error(res.message)
      }
    },
    // 关闭修改单位对话框
    editDialogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    // 修改用户方法
    async editUser () {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) {
          return false
        }
        const {data: res} = await this.$axios.put('/org/update', this.editForm)
        if (res.status === 200) {
          this.editDialogVisible = false
          this.getOrgList(0)
          this.$message.success('修改单位信息成功！')
        } else {
          this.$message.error(res.message)
        }
      })
    },
    /** **************************删除单位方法************************** **/
    async deleteOrg (row) {
      const confirmResult = await this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // 如果用户确认删除，返回值为字符串 confirm
      // 如果用户取消删除，返回值为字符串 cancel
      if (confirmResult === 'confirm') {
        const {data: res} = await this.$axios.delete('/org/deleteOrg?orgCode=' + row.orgCode)
        if (res.status === 200) {
          this.getOrgList(0)
          this.$message.success('删除单位信息成功！')
        } else {
          return this.$message.error(res.message)
        }
      }
    }
  }
}
</script>
