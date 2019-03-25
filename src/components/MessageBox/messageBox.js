import { MessageBox } from 'element-ui'

export function confirm({ title, message }, callback) {
  MessageBox.alert(message, title, {
    confirmButtonText: '确定',
    showCancelButton: true,
    cancelButtonText: '取消',
    type: 'warning',
    callback: function(action, instance) {
      if (action === 'confirm') { callback() }
    }
  })
}
