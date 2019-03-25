<!--region 封装的分页 table-->
<template>
  <div class="table">
    <el-table
      id="iTable"
      ref="mutipleTable"
      :data="pageList"
      :stripe="options.stripe"
    >
      <!--region 选择框-->
      <el-table-column v-if="options.mutiSelect" type="selection" style="width: 55px;" />
      <!--endregion-->
      <!--region 数据列-->
      <template v-for="(column, index) in columns">
        <el-table-column
          :key="column.label"
          :prop="column.prop"
          :label="column.label"
          :align="column.align"
          :width="column.width"
        >
          <template slot-scope="scope">
            <template v-if="!column.render">
              <template v-if="column.formatter">
                <span v-html="column.formatter(scope.row, column)" />
              </template>
              <template v-else>
                <span>{{ scope.row[column.prop] }}</span>
              </template>
            </template>
            <template v-else>

              <render-dom :column="column" :row="scope.row" :render="column.render" :index="index" />
            </template>
          </template>
        </el-table-column>
      </template>
      <!--endregion-->
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.pageNum"
      :limit.sync="listQuery.pageSize"
      @pagination="getList"
    />
  </div>
</template>
<!--endregion-->
<script>
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { queryList } from '@/api/baseApi'

export default {
  components: {
    Pagination,
    renderDom: {
      functional: true,
      props: {
        row: Object,
        render: Function,
        index: Number,
        click: Function,
        column: {
          type: Object,
          default: null
        }
      },
      render: (h, ctx) => {
        const params = {
          row: ctx.props.row,
          index: ctx.props.index
        }
        if (ctx.props.column) params.column = ctx.props.column
        return ctx.props.render(h, params)
      }
    }
  },
  props: {
    url: {
      type: String,
      default: function() { return '' }
    },
    method: {
      type: String,
      default: function() { return 'post' }
    },
    columns: {
      type: Array,
      default: function() { return [] }
    }, // 需要展示的列 === prop：列数据对应的属性，label：列名，align：对齐方式，width：列宽
    options: {
      type: Object,
      default: function() {
        return {
          highlightCurrentRow: false, // 是否要高亮当前行
          stripe: true, // 是否为斑马纹 table
          loading: false, // 是否添加表格loading加载动画
          mutiSelect: true // 是否支持列表项选中功能
        }
      }
    },
    queryParam: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  // 数据
  data() {
    return {
      total: 0,
      pageList: [],
      multipleSelection: [], // 多行选中
      listQuery: {
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  beforeMount: function() {
    if (this.url === '') {
      console.error('请选择查询url')
      return
    }

    this.getList()
  },
  methods: {
    getList() {
      queryList({ url: this.url, method: this.method }, this.listQuery, this.queryParam).then(response => {
        this.pageList = response.data.page.list
        this.total = response.data.page.total
      })
    }
  }
}
</script>
<style lang="scss" >

</style>
