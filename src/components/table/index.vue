<!--region 封装的分页 table-->
<template>
  <div class="table">
    <el-table
      id="iTable"
      ref="mutipleTable"
      :data="list"
      :stripe="options.stripe"
      @selection-change="handleSelectionChange"
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
      <!--region 按钮操作组-->
      <el-table-column
        v-if="buttons.list.filter(_x=>_x.show === true).length > 0"
        ref="fixedColumn"
        label="操作"
        align="center"
        :width="buttons.width"
        :fixed="buttons.fixed"
      >
        <template slot-scope="scope">
          <div class="operate-group">
            <template v-for="(btn, index) in buttons.list">
              <div v-if="btn.show" :key="index" class="item">
                <el-button
                  :type="btn.type"
                  size="mini"
                  :icon="btn.icon"
                  :disabled="btn.disabled"
                  :plain="btn.plain"
                  @click.native.prevent="btn.method(key,scope.row)"
                >{{ btn.label }}
                </el-button>
              </div>
            </template>
          </div>
        </template>
      </el-table-column>
      <!--endregion-->
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>
<!--endregion-->
<script>
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { fetchList } from '@/api/article'

export default {
  components: {
    Pagination,
    renderDom: {
      functional: true,
      props: {
        row: Object,
        render: Function,
        index: Number,
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
    list: {
      type: Array,
      default: function() { return [] }
    }, // 数据列表
    columns: {
      type: Array,
      default: function() { return [] }
    }, // 需要展示的列 === prop：列数据对应的属性，label：列名，align：对齐方式，width：列宽
    buttons: {
      type: Object,
      default: function() { return {} }
    }, // 操作按钮组 === label: 文本，type :类型（primary / success / warning / danger / info / text），show：是否显示，icon：按钮图标，plain：是否朴素按钮，disabled：是否禁用，method：回调方法
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
    } // table 表格的控制参数
  },
  // 数据
  data() {
    return {
      total: 0,
      multipleSelection: [], // 多行选中
      listQuery: {
        page: 1,
        limit: 20,
        sort: '+id'
      }
    }
  },
  computed: {
  },
  mounted() {
  },
  methods: {
    // 多行选中
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.$emit('handleSelectionChange', val)
    },
    // 显示 表格操作弹窗
    showActionTableDialog() {
      console.log(4444)
      this.$emit('handelAction')
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    }
  }
}
</script>
<style lang="scss" >

</style>
