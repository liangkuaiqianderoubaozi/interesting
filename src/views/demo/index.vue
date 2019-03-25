<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="queryParam.userName"
        placeholder="标题"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select v-model="queryParam.content" placeholder="类型" clearable class="filter-item" style="width: 130px">
        <el-option
          v-for="item in calendarTypeOptions"
          :key="item.key"
          :label="item.display_name+'('+item.key+')'"
          :value="item.key"
        />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="save">添加 </el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-download" @click="exportData">导出 </el-button>
    </div>

    <!--表单组件-->
    <d-table
      ref="resultTable"
      :url="url"
      :options="options"
      :columns="columns"
      :query-param="queryParam"
    />

    <edit-dialog v-model="showDialog" :show-dialog.sync="showDialog" :data="entityData" />

  </div>
</template>

<script>
import DTable from '@/components/table'
import editDialog from './edit'
import { confirm } from '@/components/MessageBox/messageBox'

export default {
  components: {
    'd-table': DTable,
    'edit-dialog': editDialog
  },
  data() {
    return {
      options: { mutiSelect: true },
      showDialog: false,
      entityData: {},
      url: '/queryPage',
      method: 'post',
      queryParam: {
        content: '',
        userName: ''
      },
      calendarTypeOptions: [
        { key: 'CN', display_name: 'China' },
        { key: 'US', display_name: 'USA' },
        { key: 'JP', display_name: 'Japan' },
        { key: 'EU', display_name: 'Eurozone' }
      ],
      columns: [
        {
          prop: 'userName',
          label: '编号',
          align: 'center'
        },
        {
          prop: 'content',
          label: '状态',
          align: 'center'
        },
        {
          label: '操作',
          align: 'center',
          render: (h, params) => {
            const _self = this
            return h('span', [
              h('el-button',
                { props: { round: true },
                  on: {
                    click: function() {
                      _self.entityData = params.row
                      _self.showDialog = true
                    }
                  }
                }, '修改'),
              h('el-button',
                { props: { round: true },
                  on: {
                    click: function() {
                      confirm({ title: '删除确认', message: '是否确定删除,删除后数据无法恢复' }, function() {
                        console.info(params)
                      })
                    }
                  }
                }, '删除')
            ])
          }
        }
      ]
    }
  },
  methods: {
    save() {
      this.entityData = {}
      this.showDialog = true
    },
    search() {
      this.$refs.resultTable.getList()
    },
    exportData() {}
  }
}
</script>
