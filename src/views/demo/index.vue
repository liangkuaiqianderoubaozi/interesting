<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        placeholder="标题"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select v-model="listQuery.type" placeholder="类型" clearable class="filter-item" style="width: 130px">
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
      :list="list"
      :options="options"
      :columns="columns"
      @handleSelectionChange="handleSelectionChange"
    />

    <edit-dialog v-model="showDialog" :show-dialog.sync="showDialog" :data="entityData" />
  </div>
</template>

<script>
import DTable from '@/components/table'
import editDialog from './edit'

import { fetchList } from '@/api/article'

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
      listQuery: {
        importance: undefined,
        title: undefined,
        type: undefined
      },
      calendarTypeOptions: [
        { key: 'CN', display_name: 'China' },
        { key: 'US', display_name: 'USA' },
        { key: 'JP', display_name: 'Japan' },
        { key: 'EU', display_name: 'Eurozone' }
      ],
      list: [
        { id: '24', title: '编号3', state: 0 },
        { id: '23', title: '编号3', state: 1 },
        { id: '23', title: '编号3', state: 2 },
        { id: '2', title: '编号3', state: 0 },
        { id: '223', title: '编号3', state: 1 },
        { id: '2444', title: '编号3', state: 1 }
      ],
      columns: [
        {
          prop: 'id',
          label: '编号',
          align: 'center'
        },
        {
          prop: 'state',
          label: '状态',
          align: 'center',
          render: (h, params) => {
            return h('el-tag', {
              props: { type: params.row.state === 0 ? 'success' : params.row.state === 1 ? 'info' : 'danger' } // 组件的props
            }, params.row.state === 0 ? '上架' : params.row.state === 1 ? '下架' : '审核中')
          }
        },
        {
          label: '操作',
          align: 'center',
          render: (h, params) => {
            const _self = this
            return h('el-button', {
              props: {
                round: true
              },
              on: {
                click: function() {
                  _self.entityData = params.row
                  _self.showDialog = true

                  fetchList({}).then(req => {
                    console.info(req)
                  })
                }
              }
            }, '按钮')
          }
        }
      ]
    }
  },
  methods: {
    handleSelectionChange(val) {
    },
    save() {},
    search() {

    },
    exportData() {}
  }
}
</script>
