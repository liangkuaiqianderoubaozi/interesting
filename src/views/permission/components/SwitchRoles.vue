<template>
  <div>
    <div style="margin-bottom:15px;">{{ permission.roles }}： {{ roles }}</div>
    {{ permission.switchRoles }}：
    <el-radio-group v-model="switchRoles">
      <el-radio-button label="editor" />
      <el-radio-button label="admin" />
    </el-radio-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      permission: {
        addRole: '新增角色',
        editPermission: '编辑权限',
        roles: '你的权限',
        switchRoles: '切换权限',
        tips: '在某些情况下，不适合使用 v-permission。例如：Element-UI 的 Tab 组件或 el-table-column 以及其它动态渲染 dom 的场景。你只能通过手动设置 v-if 来实现。',
        delete: '删除',
        confirm: '确定',
        cancel: '取消'
      }
    }
  },
  computed: {
    roles() {
      return this.$store.getters.roles
    },
    switchRoles: {
      get() {
        return this.roles[0]
      },
      set(val) {
        this.$store.dispatch('ChangeRoles', val).then(() => {
          this.$emit('change')
        })
      }
    }
  }
}
</script>
