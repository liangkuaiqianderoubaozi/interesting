<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
    <el-form-item label="活动名称" prop="userName">
      <el-input v-model="ruleForm.userName" />
    </el-form-item>
    <el-form-item label="活动形式" prop="content">
      <el-input v-model="ruleForm.content" type="textarea" />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
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
  created: function() {
    const _self = this
    console.info(_self.$router.currentRoute.params)
    console.info(this.$router.currentRoute)
  }
}
</script>
