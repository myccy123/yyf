<template>
  <el-container style="height: 100%; border: 0 solid #eee;">
    <el-main>
      <el-form :inline="true" style="width: 100%;height: 40px;display: flex;">
        <el-form-item>
          <!--添加按钮-->
          <el-button @click="addDialogVisible = true" type="primary" size="mini" icon="el-icon-circle-plus-outline" style="line-height: 0;">添加</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" :height="tableHeight"  border stripe>
        <el-table-column type="index" align="center" label="#">
        </el-table-column>
        <el-table-column prop="image" label="图片" width="70" align="center">
          <!-- 图片的显示 -->
          <template slot-scope="scope">
            <img src="../../assets/img/JTlogo.png" style="vertical-align:middle;width: 50px;height: 50px;" alt=""/>
            <!--<img :src="scope.row.image"  width="70" height="70"  alt=""/>-->
          </template>
        </el-table-column>
        <el-table-column prop="productCode" label="产品型号" width="150">
        </el-table-column>
        <el-table-column prop="productName" label="产品名称" width="150">
        </el-table-column>
        <el-table-column prop="memo" label="产品信息" >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!--修改按钮-->
            <el-button type="primary" size="mini" @click="showEditDialog(scope.row)"
                       icon="el-icon-edit" >
            </el-button>
            <!--删除按钮-->
            <el-button size="mini" type="danger" @click="deleteProduct(scope.row)"
                       icon="el-icon-delete" >
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
      <!--添加产品对话框-->
      <el-dialog title="添加产品" :visible.sync="addDialogVisible" width="520px"
                 @close="addDialogClosed">
        <el-row :gutter="20" style="background: white">
          <el-col :span="10">
            <el-upload
              class="avatar-uploader"
              action="#"
              :auto-upload="false"
              :show-file-list="false">
              <div v-if="file.url" slot="file" slot-scope="{file}">
              <img :src="file.url" class="avatar">
              </div>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-col>
          <el-col :span="14">
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px"
                     label-position="right" size="small">
              <el-form-item label="产品型号" prop="productCode">
                <el-input v-model="addForm.productCode"></el-input>
              </el-form-item>
              <el-form-item label="产品名称" prop="productName">
                <el-input v-model="addForm.productName"></el-input>
              </el-form-item>
              <el-form-item label="产品信息" prop="memo">
                <el-input v-model="addForm.memo" type="textarea" resize="none"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="addProduct" size="mini">确 定</el-button>
        </span>
      </el-dialog>
      <!--修改设备对话框-->
      <el-dialog title="修改产品" :visible.sync="editDialogVisible" width="30%"
                 @close="editDialogClosed">
        <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="80px"
                 label-position="right" size="small">
          <el-form-item label="产品型号" prop="productCode">
            <el-input v-model="editForm.productCode" disabled></el-input>
          </el-form-item>
          <el-form-item label="产品名称" prop="productName">
            <el-input v-model="editForm.productName"></el-input>
          </el-form-item>
          <el-form-item label="产品信息" prop="memo">
            <el-input v-model="editForm.memo" type="textarea" resize="none"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="editProduct" size="mini">确 定</el-button>
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<script>
export default {
  name: 'PCProductList',
  data () {
    return {
      imageUrl: '',
      /** **************************添加对话框************************** **/
      addDialogVisible: false,
      addForm: {
        productCode: '',
        productName: '',
        memo: ''
      },
      addFormRules: {
        productCode: [
          {required: true, message: '请输入产品型号', trigger: 'blur'},
          {min: 3, max: 10, message: '产品型号长度有误！', trigger: 'blur'}
        ],
        productName: [
          {required: true, message: '请输入产品名称', trigger: 'blur'},
          {min: 3, max: 10, message: '名称长度在3~10个字符之间', trigger: 'blur'}
        ]
      },
      /** **************************修改对话框************************** **/
      editDialogVisible: false,
      editForm: {
        productName: '',
        memo: ''
      },
      editFormRules: {
        productName: [
          {required: true, message: '请输入产品名称', trigger: 'blur'},
          {min: 3, max: 10, message: '名称长度在3~10个字符之间', trigger: 'blur'}
        ]
      },
      /** **************************分页查询参数************************** **/
      pageShow: 'true',
      currentPage: 1, // 当前页
      pageSize: 20, // 每页大小
      total: 0, // 总数量
      tableHeight: window.innerHeight - 135
    }
  },
  created () {
    this.getProductList(0)
  },
  methods: {
    /** **************************查询数据分页方法************************** **/
    // 分页页码变化
    handleCurrentChange (currentPage) {
      this.getProductList(currentPage - 1)
    },
    // 每页大小变化
    handleSizeChange (newSize) {
      this.pageSize = newSize
      this.currentPage = 1
      this.getProductList(0)
    },
    // 查询数据方法
    getProductList (pageNumber) {
      const _this = this
      _this.$axios({
        method: 'get',
        url: 'product/findAllProducts/' + pageNumber + '/' + _this.pageSize
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
    /** **************************添加方法************************** **/
    // 关闭添加对话框
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    // 添加产品方法
    addProduct () {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) {
          return false
        }
        const {data: res} = await this.$axios.post('/product/save', this.addForm)
        if (res.status === 201) {
          this.$message.success('添加产品成功！')
          this.addDialogVisible = false
          this.getProductList(0)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    /** **************************修改方法************************** **/
    // 打开修改对话框
    async showEditDialog (row) {
      const {data: res} = await this.$axios.get('/product/' + row.productCode)
      if (res.status === 200) {
        this.editForm = res.product
        this.editDialogVisible = true
      } else {
        this.$message.error(res.message)
      }
    },
    // 关闭修改对话框
    editDialogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    // 修改方法
    async editProduct () {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) {
          return false
        }
        const {data: res} = await this.$axios.put('/product/update', this.editForm)
        if (res.status === 200) {
          this.editDialogVisible = false
          this.getProductList(0)
          this.$message.success('修改产品信息成功！')
        } else {
          this.$message.error(res.message)
        }
      })
    },
    /** **************************删除方法************************** **/
    async deleteProduct (row) {
      const confirmResult = await this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // 如果用户确认删除，返回值为字符串 confirm
      // 如果用户取消删除，返回值为字符串 cancel
      if (confirmResult === 'confirm') {
        const {data: res} = await this.$axios.delete('/product/deleteProduct?productCode=' + row.productCode)
        if (res.status === 200) {
          this.getProductList(0)
          this.$message.success('删除产品成功！')
        } else {
          return this.$message.error(res.message)
        }
      }
    },
    /** **************************上传图片方法************************** **/
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>
