<template>
  <el-dialog
    v-model="showDialog"
    title="提示"
    :visible.sync="showDialog"
    :before-close="closeDialog"
    width="30%"
    center
  >
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="活动名称" prop="userName">
        <el-input v-model="ruleForm.userName" />
      </el-form-item>
      <el-form-item label="活动形式" prop="content">
        <el-input v-model="ruleForm.content" type="textarea" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { submit } from '@/api/baseApi'

export default {
  props: {
    showDialog: {
      type: Boolean,
      default: function() { return {} }
    }},
  data() {
    return {
      show: false,
      ruleForm: {
        userName: '',
        content: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    showDialog: function() {
      this.show = this.showDialog
    }
  },
  methods: {
    submitForm(formName) {
      const _self = this
      _self.$refs[formName].validate((valid) => {
        if (valid) {
          let url = '/demo/save'
          if (_self.ruleForm.id) { url = 'demo/update' }

          submit(url, _self.ruleForm).then(response => {
            if (response.data.success) {
              _self.$emit('input', false)
              _self.ruleForm = {}
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    closeDialog() {
      this.ruleForm = {}
      this.$emit('input', false) // 将改变通知父组件(保证父子组件数据一致
    }
  }
}
</script>
