<template>
  <el-container style="height: 100%; border: 0 solid #eee;">
    <el-main>
      <el-form :inline="true" style="width: 100%;height: 40px;display: flex;">
        <el-form-item>
          <el-input v-model="queryUserId" placeholder="请输入用户ID" style="margin-block: 7px;" size="mini" clearable @clear="getData(0)">
            <el-button @click="getData(0)" slot="append" icon="el-icon-search" size="mini"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <!--添加按钮-->
          <el-button @click="showAddDialog" type="primary" size="mini" icon="el-icon-circle-plus-outline" style="line-height: 0;">添加</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" :height="tableHeight"  border stripe>
        <el-table-column type="index" align="center">
        </el-table-column>
        <el-table-column prop="userId" label="用户ID" width="120">
        </el-table-column>
        <el-table-column prop="userName" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180">
        </el-table-column>
        <el-table-column prop="mobile" label="电话" width="120">
        </el-table-column>
        <el-table-column prop="tag" label="用户权限" width="120" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.grade === 1 ? 'danger' : 'success'" size="mini"
              disable-transitions>{{scope.row.grade=== 1 ?'管理员':'普通用户'}}</el-tag>
          </template>
        </el-table-column>
        <!--<el-table-column prop="tag" label="用户权限" width="120" align="center"
          :filters="[{ text: '普通用户', value: 0 }, { text: '管理员', value: 1 }]"
          :filter-method="filterTag" filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.grade === 1 ? 'danger' : 'success'" size="medium"
              disable-transitions>{{scope.row.grade=== 1 ?'管理员':'普通用户'}}</el-tag>
          </template>
        </el-table-column>-->
        <el-table-column label="状态" width="120" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.state" active-color="#13ce66" @change="userStateChanged(scope.row)">
            </el-switch>
          </template>
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
              <el-button size="mini" type="danger" @click="deleteUser(scope.row)" icon="el-icon-delete" circle>
              </el-button>
            </el-tooltip>
            <!--权限分配按钮-->
            <el-tooltip class="item" effect="dark" content="分配权限" placement="top" :enterable="false">
              <el-button size="mini" type="warning" @click="showUpdateGradeDialog(scope.row)" icon="el-icon-setting" circle>
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
      <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="30%"
                 @close="addDialogClosed">
        <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px"
                 label-position="right" size="small">
          <el-form-item label="用户ID" prop="userId">
            <el-input v-model="addForm.userId"></el-input>
          </el-form-item>
          <el-form-item label="用户名称" prop="userName">
            <el-input v-model="addForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password2">
            <el-input v-model="addForm.password2" type="password"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="addForm.mobile"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>
          <el-form-item label="所属单位" prop="orgCode" style="text-align: left">
            <el-select v-model="addForm.orgCode" placeholder="请选择" style="width: 100%">
              <el-option v-for="org in orgList" :key="org.orgCode" :label="org.orgName" :value="org.orgCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="addUser" size="mini">确 定</el-button>
        </span>
      </el-dialog>
      <!--修改用户对话框-->
      <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="30%"
                 @close="editDialogClosed">
        <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="80px"
                 label-position="right" size="small" label="right">
          <el-form-item label="用户ID" prop="userId">
            <el-input v-model="editForm.userId" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户名称" prop="userName">
            <el-input v-model="editForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="editForm.mobile"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editForm.email"></el-input>
          </el-form-item>
          <el-form-item label="所属单位" prop="orgCode" style="text-align: left">
            <el-select v-model="editForm.orgCode" placeholder="请选择" disabled style="width: 100%">
              <el-option
                v-for="org in orgList"
                :key="org.orgCode"
                :label="org.orgName"
                :value="org.orgCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="editUser" size="mini">确 定</el-button>
        </span>
      </el-dialog>
      <!--更改用户权限对话框-->
      <el-dialog title="设置用户权限" :visible.sync="updGradeDialogVisible" width="25%" @close="updGradeDialogClosed">
        <el-form :model="updGradeForm" ref="updGradeFormRef" label-width="80px" label-position="right" size="small">
          <el-form-item label="用户名称">
            <el-input v-model="updGradeForm.userName" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户级别" style="text-align: left">
            <el-select v-model="value" placeholder="请选择" style="width: 100%">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="updGradeDialogVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="updateUserGrade" size="mini">确 定</el-button>
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
    padding: 0 20px;
  }
</style>

<script>
export default {
  name: 'PCUserInfo',
  data () {
    /** **************************Form表单验证规则************************** **/
    // 验证邮箱规则
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!value) {
        return callback(new Error('请输入邮箱!'))
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式！'))
        }
      }, 100)
    }
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
    // 验证两次输入密码一致性
    var checkTwoPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码!'))
      } else if (value !== this.addForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      /** **************************更改用户权限对话框************************** **/
      updGradeDialogVisible: false,
      options: [{
        value: 0,
        label: '普通用户'
      }, {
        value: 1,
        label: '系统管理员'
      }],
      value: 0,
      updGradeForm: {
        userId: '',
        userName: '',
        grade: ''
      },
      /** **************************添加用户对话框************************** **/
      orgList: [],
      addDialogVisible: false,
      addForm: {
        userId: 'renyue',
        userName: '任跃',
        password: '123456',
        password2: '123456',
        mobile: '13523456547',
        email: 'renyue@bjjttec.com',
        orgCode: '',
        rid: 0,
        grade: 0
      },
      addFormRules: {
        userId: [
          {required: true, message: '请输入用户ID', trigger: 'blur'},
          {min: 3, max: 10, message: '用户名称长度在3~10个字符之间', trigger: 'blur'}
        ],
        userName: [
          {required: true, message: '请输入用户名称', trigger: 'blur'},
          {min: 2, max: 10, message: '用户名称长度在2~10个字符之间', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 15, message: '用户名称长度在6~15个字符之间', trigger: 'blur'}
        ],
        password2: [
          {required: true, message: '请再次输入密码', trigger: 'blur'},
          {validator: checkTwoPassword, trigger: 'blur'}
        ],
        mobile: [
          {required: true, message: '请输入手机号码', trigger: 'blur'},
          {validator: checkMobile, trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {validator: checkEmail, trigger: 'blur'}
        ],
        orgCode: [
          {required: true, message: '请选择所属单位', trigger: 'blur'}
        ]
      },
      /** **************************修改用户对话框************************** **/
      editDialogVisible: false,
      editForm: {
        userId: '',
        userName: '',
        mobile: '',
        email: '',
        orgCode: ''
      },
      editFormRules: {
        userName: [
          {required: true, message: '请输入用户名称', trigger: 'blur'},
          {min: 2, max: 10, message: '用户名称长度在2~10个字符之间', trigger: 'blur'}
        ],
        mobile: [
          {required: true, message: '请输入手机号码', trigger: 'blur'},
          {validator: checkMobile, trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {validator: checkEmail, trigger: 'blur'}
        ],
        orgCode: [
          {required: true, message: '请选择所属单位', trigger: 'blur'}
        ]
      },
      /** **************************分页查询参数************************** **/
      queryUserId: '', // 用于模糊查询的 userId
      pageShow: 'true',
      currentPage: '1', // 当前页
      pageSize: '20', // 每页大小
      total: '', // 总数量
      tableHeight: window.innerHeight - 135
    }
  },
  created () {
    this.getData(0)
  },
  methods: {
    filterTag (value, row) {
      return row.grade === value
    },
    /** **************************查询数据分页方法************************** **/
    // 分页页码变化
    handleCurrentChange (currentPage) {
      this.getData(currentPage - 1)
    },
    // 每页大小变化
    handleSizeChange (newSize) {
      this.pageSize = newSize
      this.currentPage = 1
      this.getData(0)
    },
    // 查询数据方法
    getData (pageNumber) {
      const _this = this
      _this.$axios({
        method: 'get',
        url: '/user/findAllByUserId/' + pageNumber + '/' + _this.pageSize,
        params: {
          userId: _this.queryUserId
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
    /** **************************添加用户方法************************** **/
    // 打开添加对话框
    async showAddDialog () {
      this.$axios({
        method: 'get',
        url: 'org/findAllByOrgName/' + 0 + '/' + 100,
        params: {
          orgName: ''
        }
      }).then((response) => {
        this.orgList = response.data.content
        this.addForm.orgCode = this.orgList[0].orgCode
      })
      this.addDialogVisible = true
    },
    // 关闭添加用户对话框
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    // 添加用户方法
    addUser () {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) {
          return false
        }
        const {data: res} = await this.$axios.post('/user/save', this.addForm)
        if (res.status === 201) {
          this.$message.success('添加用户成功！')
          this.addDialogVisible = false
          this.getData(0)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    /** **************************修改用户方法************************** **/
    // 打开修改对话框
    async showEditDialog (row) {
      this.$axios({
        method: 'get',
        url: 'org/findAllByOrgName/' + 0 + '/' + 100,
        params: {
          orgName: ''
        }
      }).then((response) => {
        this.orgList = response.data.content
      })
      const {data: res} = await this.$axios.get('/user/' + row.userId)
      if (res.status === 200) {
        this.editForm = res.user
        this.editDialogVisible = true
      } else {
        this.$message.error(res.message)
      }
    },
    // 关闭修改用户对话框
    editDialogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    // 修改用户方法
    async editUser () {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) {
          return false
        }
        const {data: res} = await this.$axios.put('/user/update', this.editForm)
        if (res.status === 200) {
          this.editDialogVisible = false
          this.getData(0)
          this.$message.success('修改用户信息成功！')
        } else {
          this.$message.error(res.message)
        }
      })
    },
    /** **************************删除用户方法************************** **/
    async deleteUser (row) {
      const confirmResult = await this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // 如果用户确认删除，返回值为字符串 confirm
      // 如果用户取消删除，返回值为字符串 cancel
      if (confirmResult === 'confirm') {
        const {data: res} = await this.$axios.delete('/user/deleteUser?userId=' + row.userId)
        if (res.status === 200) {
          this.getData(0)
          this.$message.success('删除用户信息成功！')
        } else {
          return this.$message.error(res.message)
        }
      }
    },
    /** ******************监听switch开关,更改用户状态******************** **/
    async userStateChanged (userInfo) {
      // this.$axios.put('/user/updateUserState2?userId=' + userInfo.userId + '&state=' + userInfo.state)
      const {data: res} = await this.$axios.put('/user/updateUserState',
        {
          userId: userInfo.userId,
          state: userInfo.state
        })
      if (res.status !== 200) {
        userInfo.state = !userInfo.state
        return this.$message.error(res.message)
      }
      this.$message.success('更新用户状态成功!')
    },
    /** ******************更改用户权限********************************** **/
    async showUpdateGradeDialog (row) {
      this.updGradeForm.userId = row.userId
      this.updGradeForm.userName = row.userName
      this.updGradeForm.grade = row.grade
      this.value = this.updGradeForm.grade
      this.updGradeDialogVisible = true
    },
    async updateUserGrade () {
      const {data: res} = await this.$axios.put('/user/updateUserGrade',
        {
          userId: this.updGradeForm.userId,
          grade: this.value
        })
      if (res.status !== 200) {
        return this.$message.error(res.message)
      }
      this.updGradeDialogVisible = false
      this.getData(0)
      this.$message.success('更新用户权限成功!')
    }
  }
}
</script>
