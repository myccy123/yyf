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
        <el-table-column label="产品信息" align="center" min-width="650px">
          <template slot-scope="scope">
            <el-row>
              <el-card :body-style="{ padding: '2px' }" shadow="never">
                <el-col :span="3">
                  <!--<img src="../../assets/upload/c669ef524f814ae6a45624c9a349f1ba.jpg" class="image">-->
                  <img :src="scope.row.imageUrl" class="image">
                </el-col>
                <el-col :span="20" align="left" >
                  <div style="padding: 6px;">
                    <span style="color: #66b1ff;font-size:14px;">产品型号：</span>
                    <span style="color: #999;font-size:14px;">{{scope.row.productCode}}</span>
                    <span style="color: #66b1ff;font-size:14px;padding-left: 20px">产品名称：</span>
                    <span style="color: #999;font-size:14px">{{scope.row.productName}}</span>
                    <div style="padding-top: 20px;">
                      <span style="color: #66b1ff;font-size:14px;">功能描述：</span>
                      <span style="color: #999;font-size:14px;">{{scope.row.memo}}</span>
                    </div>
                  </div>
                </el-col>
              </el-card>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <!--修改按钮-->
            <el-tooltip class="item" effect="dark" content="修改" placement="top" :enterable="false">
              <el-button type="primary" @click="showEditDialog(scope.row)"
                         icon="el-icon-edit" circle>
              </el-button>
            </el-tooltip>
            <!--删除按钮-->
            <el-tooltip class="item" effect="dark" content="删除" placement="top" :enterable="false">
              <el-button type="danger" @click="deleteProduct(scope.row)"
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
      <!--添加产品对话框-->
      <el-dialog title="添加产品" :visible.sync="addDialogVisible" width="520px"
                 @close="addDialogClosed">
        <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px"
                 label-position="right" size="small">
          <el-row :gutter="20" style="background: white">
            <el-col :span="10">
              <el-upload
                      class="avatar-uploader"
                      action="http://112.125.16.236:8181/product/imageUpload"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload">
                <img v-if="imgUrl" :src="imgUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-col>
            <el-col :span="14">
                <el-form-item label="产品型号" prop="productCode">
                  <el-input v-model="addForm.productCode"></el-input>
                </el-form-item>
                <el-form-item label="产品名称" prop="productName">
                  <el-input v-model="addForm.productName"></el-input>
                </el-form-item>
                <el-form-item label="功能描述" prop="memo">
                  <el-input v-model="addForm.memo" type="textarea" resize="none"></el-input>
                </el-form-item>
            </el-col>
          </el-row>
        </el-form>
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
          <el-form-item label="功能描述" prop="memo">
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

<style scoped>
  .el-table{
    font-size: 14px;
  }
  .el-table td, .el-table th{
    padding: 3px 0;
  }
  .el-dialog__body {
    padding: 0px 20px;
  }
  .image {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    border: 1px solid lightgrey;
    border-radius: 5px;
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
    width: 170px;
    height: 170px;
    line-height: 170px;
    text-align: center;
  }
  .avatar {
    width: 170px;
    height: 170px;
    display: block;
  }
</style>

<script>
export default {
  name: 'PCProductList2',
  data () {
    return {
      imgUrl: '',
      /** **************************添加对话框************************** **/
      addDialogVisible: false,
      addForm: {
        productCode: '',
        productName: '',
        imageUrl: '',
        memo: ''
      },
      tableData: [],
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
      this.imgUrl = URL.createObjectURL(file.raw)
      console.log(file.raw)
      // 监听图片上传成功的事件
      this.addForm.imageUrl = res.imgUrl
      console.log(this.addForm)
    },
    beforeAvatarUpload (file) {
      const isJPGOrPNG = file.type === 'image/jpeg' || 'image/png'
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isJPGOrPNG) {
        this.$message.error('上传头像图片只能是 JPG或PNG 格式!')
      }
      if (!isLt10M) {
        this.$message.error('上传头像图片大小不能超过 10MB!')
      }
      return isJPGOrPNG && isLt10M
    }
  }

}
</script>
