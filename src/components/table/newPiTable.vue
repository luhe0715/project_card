<template>
  <div class="pi-table" v-loading="tableLoad">
    <el-table
      border
      default-expand-all
      ref="piTable"
      :class="{ border }"
      style="width: 100%"
      :height="tableHeight"
      :data="Data.showData"
      table-layout="fixed"
      :row-key="rowKey"
      :tree-props="defaultProps"
      :stripe="stripe"
      :scrollbar-always-on="true"
      :cell-style="columnStyle"
      :row-class-name="tableRowClassName"
      :cell-class-name="tableCellClassName"
      :span-method="arraySpanMethod"
      :summary-method="getSummaries"
      :show-summary="showSummary"
      :highlight-current-row="highlightCurrentRow"
      @current-change="handleCurrentChange"
      @row-click="clickRow"
      @row-contextmenu="rightClickRow"
      @select="tableSelect"
      @select-all="selectAll"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="selectable" :selectable="isSelectFun" type="selection" width="55" />
      <slot></slot>
      <el-table-column v-if="isIndex" type="index" label="序列" width="80" />
      <el-table-column
        v-for="item in Data.showColumns"
        :label="item.title"
        :prop="item.dataIndex"
        :width="item.width"
        :min-width="item.minWidth || item.width"
        :show-overflow-tooltip="item.ellipsis"
        :column-key="item.filters"
        :key="item.dataIndex"
        :fixed="item.fixed"
      >
        <!-- 表头筛选 -->
        <template #header="scope" v-if="item.filters || item.onlySort">
          <el-text v-if="item.required" type="danger" style="margin-right: 4px">*</el-text>
          <span>{{ scope.column.label }}</span>
          <el-popover placement="bottom-start" :width="264" :hide-after="10" trigger="click">
            <!-- <template #reference>
              <el-link class="filter-btn" :underline="false">
                <el-icon size="12">
                  <svg><use xlink:href="#icon-filter"></use></svg>
                </el-icon>
              </el-link>
            </template> -->
            <template #reference>
              <el-link class="filter-btn" :underline="false">
                <el-icon><Filter /></el-icon>
              </el-link>
            </template>
            <div class="table-filter-box">
              <div class="filter-top">
                <div class="sub-title">快捷操作</div>
                <el-link class="block-btn" @click="onSort(scope.column, 'up')" :underline="false">
                  <el-icon><SortUp /></el-icon>
                  升序排列
                </el-link>
                <el-link @click="onSort(scope.column, 'down')" :underline="false">
                  <el-icon><SortDown /></el-icon>
                  降序排列
                </el-link>
              </div>
              <div class="filter-bottom" v-if="!item.onlySort">
                <div class="sub-title">
                  筛选条件
                  <el-link class="title-btn" type="primary" :underline="false" @click="clearFilter(scope.column, item, item.filters)">清空</el-link>
                </div>
                <div class="sub-section">{{ scope.column.label }}选择</div>
                <!-- 选择 -->

                <el-select
                  v-if="item.filters === 'select' && item.filterList.length > 0"
                  multiple
                  :teleported="false"
                  filterable
                  @change="changeFilter(scope.column, item, item.filters)"
                  v-model="scope.column.filteredValue"
                >
                  <el-option v-for="(val, index) in item.filterList" :key="index" :value="val" :label="val" />
                </el-select>
                <!-- 时间 -->
                <el-date-picker
                  v-if="item.filters === 'date'"
                  type="daterange"
                  style="width: 90%"
                  :teleported="false"
                  v-model="scope.column.filteredValue"
                  @change="changeFilter(scope.column, item, item.filters)"
                />
                <!-- input -->
                <el-input
                  v-if="item.filters === 'input' || item.filters === 'number'"
                  :placeholder="'请输入' + item.title"
                  @input="inputSearch(scope.column, item, item.filters)"
                  v-model="scope.column.filteredValue"
                ></el-input>
              </div>
            </div>
          </el-popover>
        </template>
        <template #header="scope" v-else>
          <div class="columnTitle">
            <el-text v-if="item.required" type="danger" style="margin-right: 4px">*</el-text>
            <span :ref="'refName' + scope.$index">{{ item.title }}</span>
          </div>
        </template>

        <!-- slot插槽 -->
        <template #default="scope">
          <slot :name="item.dataIndex" v-bind="scope">
            {{ getDisplay(scope, item) }}
          </slot>
        </template>
      </el-table-column>
      <!-- 设置按钮列 -->
      <el-table-column v-if="isShowSetting" :width="45" fixed="right" align="right">
        <template #header>
          <el-link :style="{ fontSize: '16px' }" :underline="false" @click="setHeader">
            <el-icon>
              <Setting />
            </el-icon>
          </el-link>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      v-if="pagination"
      v-model:current-page.sync="Data.page"
      v-model:page-size.sync="Data.range"
      layout="total, sizes, prev, pager, next"
      background
      small
      :page-sizes="[5, 10, 20, 50, 100]"
      :total="Data.total"
    />
    <headerSetting
      v-model:isShow="Data.showHeaderSetting"
      @confirm="confirmHeader"
      @changeType="changeType"
      :columns="columns"
      :allColumns="allColumns"
      :selectedList="Data.showColumns"
      :tableName="tableName"
      :pageLabelName="pageLabelName"
      :isProjectList="isProjectList"
      :optionList="optionList"
      :taskColumns="taskColumns"
    ></headerSetting>
  </div>
</template>

<script setup>
import headerSetting from './HeaderSetting.vue'
import * as _ from 'lodash'
const { proxy } = getCurrentInstance()
const piTable = ref(null)
const props = defineProps({
  // 是否单选
  isSingleSelect: {
    type: Boolean,
    default: false,
  },
  mutiSelect: {
    type: Boolean,
    default: false,
  },
  /** 树状参数 */
  defaultProps: {
    type: Object,
    default: () => {},
  },
  /**斑马线 */
  stripe: {
    type: Boolean,
    default: false,
  },
  /**是否边框 */
  border: {
    type: Boolean,
    default: false,
  },
  /**接收父组件表格数据 */
  data: {
    type: Array,
    default: () => [],
  },
  /**接收父组件表头 */
  columns: {
    type: Array,
    default: () => [],
  },
  /**所有表头 */
  allColumns: {
    type: Array,
    default: () => [],
  },
  //是否需要勾选
  selectable: {
    type: Boolean,
    default: false,
  },
  //是否需要序列
  isIndex: {
    type: Boolean,
    default: false,
  },
  /**唯一值 */
  rowKey: {
    type: String,
    default: 'oid',
  },
  /**loading */
  tableLoad: {
    type: Boolean,
    default: false,
  },
  /**是否显示表头设置 */
  isShowSetting: {
    type: Boolean,
    default: false,
  },
  /**设置表头内布值 */
  tableName: {
    type: String,
    default: '',
  },
  /**是否分页 */
  pagination: {
    type: Boolean,
    default: false,
  },
  /**分页-当前页码 */
  currentPage: {
    type: Number,
    default: 1,
  },
  /**分页-每页显示数量 ***前端分页的时候必填*** */
  pageSize: {
    type: Number,
    default: 10,
  },
  /**分页-总数 */
  total: {
    type: Number,
    default: 0,
  },
  /**是否前台分页 */
  isWebPagination: {
    type: Boolean,
    default: false,
  },
  /**表格高度 */
  tableHeight: {
    type: [String, Number],
    default: 'auto',
  },
  pageLabelName: String,
  /**是否需要右键 */
  isrightClick: {
    type: Boolean,
    default: false,
  },
  CssColumn: {
    type: Array,
    default: () => [],
  },
  // 合并的列
  mergeColumn: {
    type: Array,
    default: () => [],
  },
  // 第几列需要添加背景色
  columnIndex: {
    type: Number,
    default: 0,
  },
  isProjectList: {
    type: Boolean,
    default: false,
  },
  optionList: {
    type: Array,
    default: () => [],
  },
  isDeep: {
    type: Boolean,
    default: false,
  },
  taskColumns: {
    type: Object,
    default: () => {},
  },
  // 是否尾部合并计算
  showSummary: {
    type: Boolean,
    default: false,
  },
  // 点击表格显示选中
  highlightCurrentRow: {
    type: Boolean,
    default: false,
  },
})

const Data = reactive({
  list: [], // 暂存数据

  /**分页 */
  page: 1,
  range: 10,
  total: 0,

  /**选择数据 */
  selectArr: [],

  /**展示数据 */
  showColumns: [],
  showData: [],

  /**设置表头 */
  showHeaderSetting: false,

  /**表头超出隐藏 */
  isShowTooltip: false,
  shiftDown: false, // 按下 shift 键
  firstIndex: 0,
  lastIndex: 0,
  newData: [], // 处理数据
  searchList: [], // 搜索数据
})

/**初始函数 */
onMounted(() => {
  init()
  props.mutiSelect && addShiftEventListener()
  Data.showColumns = _.cloneDeep(props.columns)
  Data.range = props.pageSize
})
onBeforeUnmount(() => {
  removeShiftEventListener()
})
const handColumnsData = (val) => {
  let arr = _.cloneDeep(val)
  Data.showColumns = []
  arr.forEach((column, index) => {
    if (column.filters) {
      if (column?.filters === 'select') {
        column.filterList = []
        column.filterVal = []
        Data.showData.forEach((item) => {
          column.filterList.push(item[column.dataIndex] ? item[column.dataIndex] : '')
        })
        if (column.multiple) {
          column.filterList = column.selectList
        }
        column.filterList = Array.from(new Set(column.filterList))
      }
    }
    if (column.dataIndex === 'number') column.width ? column.width : 120
    if (props.isShowSetting && index < 3) {
      column.fixed = true
    }
    Data.showColumns.push(column)
  })
}
const tableCellClassName = ({ row, column, rowIndex, columnIndex }) => {
  if (props.tableName === 'plm_project') {
    if (column.label && column.label.includes('计划') && row[column.property]) {
      return 'planTimeStyle'
    } else if (column.label && column.label.includes('实际') && row[column.property]) {
      return 'actualTimeStyle'
    }
  }
}
/**
 * 监听表头
 */
watch(
  () => props.columns,
  (val) => {
    handColumnsData(val)
  },
  //深度监听
  { deep: true },
  { immediate: true },
)
/**数据处理 */
watch(
  () => Data.showData,
  (val) => {
    Data.showColumns.forEach((column) => {
      if (column.filters) {
        if (column.filters === 'select') {
          column.filterList = []
          column.filterVal = []
          props.data.forEach((item) => {
            column.filterList.push(item[column.dataIndex] ? item[column.dataIndex] : '')
          })
          if (column.multiple) {
            column.filterList = column.selectList
          }
          column.filterList = Array.from(new Set(column.filterList))
        }
      }
    })
  },
  // { deep: true },
  // { immediate: true },
)

/**
 * 监听数据处理
 */
let watchData = watch(
  () => props.data,
  (val) => {
    Data.newData = val
    init()
  },
  { deep: true },
  { immediate: true },
)

/**
 * 监听分页
 */
watch(
  () => Data.page,
  (val) => {
    if (props.isWebPagination) {
      init()
    } else {
      emit('update:currentPage', val)
    }
  },
)
watch(
  () => Data.range,
  (val) => {
    if (props.isWebPagination) {
      init()
    } else {
      emit('update:pageSize', val)
    }
  },
)
watch(
  () => props.total,
  (val) => {
    Data.total = val
  },
)

const isSelectFun = (row) => {
  return row.choose ? false : true
}

/**初始化数据 */
const init = () => {
  // let arr = _.cloneDeep(props.data);
  // Data.newData = [...arr];
  // if (props.isWebPagination) {
  //   Data.total = props.data.length;
  //   Data.showData = props.data.slice((Data.page - 1) * Data.range, Data.page * Data.range);
  // } else {
  //   Data.showData = props.data;
  // }
  if (props.isWebPagination) {
    Data.total = Data.newData.length
    Data.showData = Data.newData.slice((Data.page - 1) * Data.range, Data.page * Data.range)
  } else {
    Data.showData = Data.newData
  }
  watchData()
  if (Data.showData.length > 0) {
    Data.showData?.forEach((v, index) => {
      v.index = index + 1
      Object.keys(v).forEach((k) => {
        if (v[k]?.constructor === Object) {
          if (props.tableName.includes('TaskTable') && k === 'healthStatusType') {
            v[k] = v[k].value
          } else {
            v[k] = v[k].display
          }
        }
      })
    })
  }

  nextTick(() => {
    watchData = watch(
      () => props.data,
      (val) => {
        Data.newData = val
        init()
      },
      { deep: props.isDeep },
      // { immediate: true },
    )
  })
}

/**
 * 处理显示数据
 */
const getDisplay = (scope, item) => {
  let data = scope.row[item.dataIndex]
  if (data?.constructor === Object && 'display' in data) {
    return scope.row[item.dataIndex].display
  } else {
    return scope.row[item.dataIndex]
  }
}

// const getStateColor = (key, list, alpha = 1) => {
//   const color = list.find((i) => {
//     return i.key === key;
//   })?.value;
//   if (color) {
//     return hexToRGB(color, alpha);
//   }
// };
// 将六位数颜色改成reba
// const hexToRGB = (hex, alpha = 1) => {
//   // eslint-disable-next-line no-useless-escape
//   if (!/(^\#([a-fA-F0-9]{3})$)|(^\#([a-fA-F0-9]{6})$)/g.test(hex)) {
//     return null;
//   }
//   const allNumberStr = '0123456788abcdef'; // 十六进制的所有数字
//   const len = hex.slice(1).length;
//   const str = len === 6 ? hex.slice(1) : hex.slice(1)[0].repeat(2) + hex.slice(1)[1].repeat(2) + hex.slice(1)[2].repeat(2);
//   const arrStr = str.split('');
//   const newArrStr = arrStr.map((item) => {
//     return allNumberStr.indexOf((item + '').toLowerCase());
//   });
//   const num1 = newArrStr[0] * 16 + newArrStr[1];
//   const num2 = newArrStr[2] * 16 + newArrStr[3];
//   const num3 = newArrStr[4] * 16 + newArrStr[5];
//   return `rgb(${num1}, ${num2}, ${num3}, ${alpha})`;
// };

// const getHealthColor = (key) => {
//   const color = Data.healthColor.find((i) => i.key === key)?.value;
//   return color;
// };

// 表头超出隐藏
// const onMouseOver = (refName) => {
// let parentWidth = this.$refs[refName][0].parentNode.offsetWidth;
// let contentWidth = this.$refs[refName][0].offsetWidth;
// // 判断是否开启tooltip功能
// if (contentWidth > parentWidth) {
//   Data.isShowTooltip = false;
// } else {
//   Data.isShowTooltip = true;
// }
// };

// const piTable = ref(null);

/**点击表格row选中 */
const handleCurrentChange = (val) => {
  emit('handleCurrentChange', val)
}
/**
 * 选择
 */
const handleSelectionChange = (val) => {
  // emit('selectionChange', val);
}
const shiftDownEvent = (e) => {
  Data.shiftDown = e.keyCode === 16 && e.shiftKey
}
const shiftUpEvent = (e) => {
  Data.shiftDown = !(e.keyCode === 16)
  Data.firstIndex = 0
  Data.lastIndex = 0
}
// 监听shift键的keydown和keyup事件
const addShiftEventListener = () => {
  piTable.value.$el.addEventListener('keydown', shiftDownEvent, false)
  piTable.value.$el.addEventListener('keyup', shiftUpEvent, false)
}
// 移除监听事件
const removeShiftEventListener = () => {
  piTable.value.$el.addEventListener('keydown', Data.shiftDownEvent, false)
  piTable.value.$el.addEventListener('keyup', Data.shiftUpEvent, false)
}
// 点击行数据
const clickRow = (row) => {
  if (!props.mutiSelect) return
  if (Data.firstIndex && Data.shiftDown) {
    Data.lastIndex = row.index
    const min = Math.min(Data.firstIndex, Data.lastIndex)
    const max = Math.max(Data.firstIndex, Data.lastIndex)
    Data.showData.forEach((item) => {
      if (item.index >= min && item.index <= max) {
        piTable.value.toggleRowSelection(item, true)
      }
    })
    document.getSelection().removeAllRanges()
  } else {
    Data.firstIndex = row.index
    piTable.value.toggleRowSelection(row, true)
  }
}
// 点击右键
const rightClickRow = (row, column, event) => {
  if (!props.isrightClick) return
  event.preventDefault()
  emit('rightClick', row, event)
}
/**
 * 单选
 * @row {object} 单选的数据
 * */
function singleChecked(row) {
  proxy.$refs.piTable.clearSelection()
  proxy.$refs.piTable.toggleRowSelection(row)
}
// const singleChecked = (row) => {
//   console.log(proxy.$refs.piTable, 474);
//   proxy.$refs.piTable.clearSelection();
//   proxy.$refs.piTable.toggleRowSelection(row);
//   // piTable.value.clearSelection();
//   // piTable.value.toggleRowSelection(row);
// };
const tableSelect = (val, rows) => {
  /**
   * val选中的数据
   * rows选中的那一行
   */
  emit('selectionChange', val, rows)
  /**
   * 单选
   */
  if (props.isSingleSelect) {
    proxy.$refs.piTable.clearSelection()
    if (val.length == 0) return
    proxy.$refs.piTable.toggleRowSelection(rows, true)
    emit('selectionRadioChange', val, rows)
  }
}
const selectAll = (val) => {
  /**
   * 手动勾选全部
   */
  emit('selectionChange', val)
}

/**
 * 设置表头
 * */
const setHeader = () => {
  Data.showHeaderSetting = true
}
const confirmHeader = (arr) => {
  Data.showColumns = arr
  Data.showHeaderSetting = false
  emit('updateTableData')
}
const changeType = (val) => {
  emit('changeType', val)
}

/**
 * 排序
 * @onSort 排序总方法
 * @numSort 数字排序
 * @textSort 文字排序
 * @timeSort 时间排序
 */
const onSort = (col, type) => {
  if (col.columnKey === 'select' || col.columnKey === 'input') {
    textSort(Data.showData, col.property, type)
  } else if (col.columnKey === 'date') {
    timeSort(Data.showData, col.property, type)
  } else if (col.columnKey === 'number') {
    numSort(Data.showData, col.property, type)
  }
}
const numSort = (arr, property, type) => {
  arr.sort(function (a, b) {
    let aInfo = a[property] ? a[property] : 0
    let bInfo = b[property] ? b[property] : 0
    if (type === 'up') {
      return aInfo - bInfo
    } else {
      return bInfo - aInfo
    }
  })
}
const textSort = (arr, property, type) => {
  arr.sort((a, b) => {
    let aInfo = a[property] ? a[property] : ''
    let bInfo = b[property] ? b[property] : ''
    if (type === 'up') {
      return aInfo.localeCompare(bInfo, 'zh')
    } else {
      return bInfo.localeCompare(aInfo, 'zh')
    }
  })
}
const timeSort = (arr, property, type) => {
  arr.sort(function (a, b) {
    let aInfo = a[property] ? a[property] : ''
    let bInfo = b[property] ? b[property] : ''
    if (type === 'up') {
      return aInfo > bInfo ? 1 : -1
    } else {
      return aInfo < bInfo ? 1 : -1
    }
  })
}

/**
 * 筛选
 * @changeFilter 选择后数据变化
 * @inputSearch input输入框输入搜索数据
 * @clearFilter 清除数据
 */
const changeFilter = (column, info, filterType) => {
  if (Data.searchList.length > 0) {
    Data.searchList = Data.searchList.filter((item) => item.key !== column.property)
    Data.searchList.push({ key: column.property, value: column.filteredValue, filtType: filterType }) // 将搜索条件push到searchList
  } else {
    Data.searchList.push({ key: column.property, value: column.filteredValue, filtType: filterType }) // 将搜索条件push到searchList
  }
  Data.searchList = Data.searchList.filter((i) => i.value && i.value.length !== 0)
  const filterVal = column.filteredValue
  info.filterVal = filterVal
  Data.showData = []
  Data.newData = []
  let filterCollect = []
  // Data.showColumns.forEach((column) => {
  //   if (column.filterVal && column.filterVal.length > 0) {
  //     filterCollect.push({
  //       key: column.dataIndex,
  //       value: column.filterVal,
  //     });
  //   }
  // });
  filterCollect = Data.searchList
  props.data.forEach((item) => {
    let flag = true
    filterCollect.forEach((filter) => {
      if (filter.filtType === 'input' || filter.filtType === 'number') {
        if (!(item[filter.key].indexOf(filter.value) > -1)) {
          flag = false
        }
      } else if (filter.filtType === 'select') {
        if (!filter.value.join(',').includes(item[filter.key])) {
          flag = false
        }
      } else if (filter.filtType === 'date') {
        let startTime = new Date(filter.value[0]).getTime()
        let endTime = new Date(filter.value[1]).getTime()
        let dataDate = new Date(item[filter.key]).getTime()
        if (!(startTime <= dataDate && endTime >= dataDate)) {
          flag = false
        }
      }
    })
    // props.data.forEach((item) => {
    //   let flag = true;
    //   filterCollect.forEach((filter) => {
    //     if (filterType === 'input') {
    //       if (!(item[filter.key].indexOf(filter.value) > -1)) {
    //         flag = false;
    //       }
    //     } else if (filterType === 'select') {
    //       if (!filter.value.includes(item[filter.key])) {
    //         flag = false;
    //       }
    //     } else if (filterType === 'date') {
    //       let startTime = new Date(filter.value[0]).getTime();
    //       let endTime = new Date(filter.value[1]).getTime();
    //       let dataDate = new Date(item[filter.key]).getTime();
    //       if (!(startTime <= dataDate && endTime >= dataDate)) {
    //         flag = false;
    //       }
    //     }
    //   });
    if (flag) {
      Data.newData.push(item)
      if (props.isWebPagination) {
        Data.total = Data.newData.length
        Data.showData = Data.newData.slice((Data.page - 1) * Data.range, Data.page * Data.range)
      } else {
        Data.total = Data.newData.length
        Data.showData = Data.newData
      }
    }
  })
}
const inputSearch = (column, info, filterType) => {
  setTimeout(() => {
    changeFilter(column, info, filterType)
  }, 1000)
}
const clearFilter = (column, info) => {
  if (Data.searchList.length > 0) {
    Data.searchList = Data.searchList.filter((item) => item.key !== column.property)
  } else {
    Data.searchList = []
  }
  column.filteredValue = []
  info.filterVal = []
  Data.newData = []
  Data.showData = []
  let filterCollect = []
  // Data.showColumns.forEach((column) => {
  //   if (column.filterVal && column.filterVal.length > 0) {
  //     filterCollect.push({
  //       key: column.dataIndex,
  //       value: column.filterVal,
  //     });
  //   }
  // });
  filterCollect = Data.searchList
  props.data.forEach((item) => {
    let flag = true
    filterCollect.forEach((filter) => {
      if (filter.filtType === 'input') {
        if (!(item[filter.key].indexOf(filter.value) > -1)) {
          flag = false
        }
      } else if (filter.filtType === 'select') {
        if (!filter.value.includes(item[filter.key])) {
          flag = false
        }
      } else if (filter.filtType === 'date') {
        let startTime = new Date(filter.value[0]).getTime()
        let endTime = new Date(filter.value[1]).getTime()
        let dataDate = new Date(item[filter.key]).getTime()
        if (!(startTime <= dataDate && endTime >= dataDate)) {
          flag = false
        } else {
          flag = true
        }
      }
    })
    if (flag) {
      Data.newData.push(item)
      if (props.isWebPagination) {
        Data.total = Data.newData.length
        Data.showData = Data.newData.slice((Data.page - 1) * Data.range, Data.page * Data.range)
      } else {
        Data.total = Data.newData.length
        Data.showData = Data.newData
      }
    }
  })
}
const clearSelection = () => {
  proxy.$refs.piTable.clearSelection()
}
// 某列样式
const columnStyle = ({ column }) => {
  if (props.CssColumn.includes(column.property)) {
    return { 'background-color': '#f5f7fa' }
  }
}
const flitterData = (arr) => {
  let spanOneArr = []
  let concatOne = 0
  arr.forEach((item, index) => {
    if (index === 0) {
      spanOneArr.push(1)
    } else {
      if (item.module === arr[index - 1].module) {
        spanOneArr[concatOne] += 1
        spanOneArr.push(0)
      } else {
        spanOneArr.push(1)
        concatOne = index
      }
    }
  })
  return {
    one: spanOneArr,
  }
}
const arraySpanMethod = ({ column, rowIndex, columnIndex }) => {
  if (props.CssColumn.includes(column.property) || props.mergeColumn.includes(column.property)) {
    if (columnIndex === 0 || columnIndex === 4) {
      const _row = flitterData(Data.showData).one[rowIndex]
      const _col = _row > 0 ? 1 : 0
      return {
        rowspan: _row,
        colspan: _col,
      }
    }
  }
}
// 表格合计
const getSummaries = (param) => {
  if (props.showSummary) {
    const { columns, data } = param
    const sums = []
    columns.forEach((column, index) => {
      if (index === 0) {
        sums[index] = '合计'
        return
      }
      const values = data.map((item) => Number(item[column.property]))
      if (!values.every((value) => isNaN(value))) {
        const total = values.reduce((prev, curr) => {
          const value = Number(curr)
          if (!isNaN(value)) {
            return prev + curr
          } else {
            return prev
          }
        }, 0)
        if (column.property == 'amount') {
          sums[index] = total
        }
      }
    })
    return sums
  }
}
// 行高亮
const tableRowClassName = ({ row }) => {
  if (row.noPassFlag) {
    return 'warning-row'
  }
  return ''
}

// 默认勾选第一行
const toggleRowSelection = (row) => {
  nextTick(() => {
    piTable.value.toggleRowSelection(row[0], true)
    tableSelect(row, row[0])
  })
}

const emit = defineEmits(['update:currentPage', 'update:pageSize', 'updateTableData', 'selectionChange', 'selectionRadioChange', 'rightClick', 'changeType', 'handleCurrentChange'])
defineExpose({ singleChecked, clearSelection, toggleRowSelection })
</script>

<style lang="less" scoped>
.pi-table {
  // height: 100%;
  display: flex;
  flex-direction: column;
  --el-transparent-bg-color: rgba(50, 205, 50, 0.1);
  border: 1px solid #e2e3e6;

  .table-nav {
    display: flex;
    align-items: baseline;
    height: 36px;
    margin-bottom: 10px;
    line-height: 36px;
    background: var(--el-transparent-bg-color);
    border: 1px solid var(--el-color-primary);
    padding: 0 10px;
    font-size: 14px;
    border-radius: 5px;
    a,
    span {
      font-size: 16px;
      padding: 0 5px;
    }
  }
  .el-table {
    flex: 1;
    --el-table-header-bg-color: #f5f7fa;
    --el-table-header-text-color: #333;
    // --el-table-row-hover-bg-color: #f8faf7;
  }
  :deep(.el-pagination) {
    height: 30px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 10px;
    --el-pagination-button-bg-color: #fff;
    // --el-disabled-bg-color: rgba(245, 247, 250, 1);
    --el-pagination-button-height: 28px;
    .btn-prev,
    .btn-next {
      background-color: var(--el-disabled-bg-color);
    }
    .btn-prev:disabled,
    .btn-next:disabled {
      background-color: var(--el-disabled-bg-color);
    }
    .el-pager {
      li {
        border: 1px solid #eee;
      }
    }
  }
  // .el-pagination   {
  //   .el-pager {
  //     li
  //   }
  // }
  :deep(.el-table) {
    th.el-table__cell {
      // background-color: var(--el-table-header-bg-color);
      // background-color: #e8ebf0;
      background-color: #f2f6fd;
    }
    thead {
      color: var(--el-table-header-text-color);
    }
    .el-table__cell {
      padding: 0;
      height: 46px;
      line-height: 46px;
    }
    .el-table__body tr.hover-row > td.el-table__cell {
      background-color: var(--el-table-row-hover-bg-color);
    }
    .el-pagination.is-background {
      .el-pager li {
        border: 1px solid #e7e9ee;
        // background-color: #fff;
        font-weight: 400;
        // color: #333;
      }
      .el-pager li:not(.disabled).is-active {
        // background: rgba(91, 183, 59, 0.1);
        border: none;
        // color: var(--el-color-primary);
        font-weight: 400;
      }
      .btn-prev,
      .btn-next {
        background-color: var(--el-disabled-bg-color);
      }
    }
    .el-table__fixed-right-patch {
      top: 0;
      border: 1px solid #fff;
    }
    th.el-table__cell {
      border-right: 1px solid #ebeef5;
    }
    .el-table__fixed-right {
      top: -1px;
    }
    .el-table--border,
    .el-table--group {
      border: 0px;
    }
    .el-table__cell {
      border-right: 0;
    }
    &::before {
      width: 0px;
    }
    &::after {
      width: 0px;
    }
    .el-table__border-left-patch {
      width: 0;
    }
  }
  .border {
    :deep(th.el-table__cell) {
      // border-right: 1px solid #e2e3e6;
    }
    :deep(.el-table__cell) {
      // border-right: 1px solid #e2e3e6;
    }
  }
  .filter-btn {
    vertical-align: baseline;
    margin-left: 4px;
  }
  :deep(.el-loading-mask) {
    .el-loading-spinner .circular {
      width: 20px;
      height: 20px;
    }
  }
}
</style>

<style lang="less">
.table-filter-box {
  user-select: none;
  .filter-top {
    padding: 6px 10px 10px 10px;
    border-bottom: 1px solid #ddd;
    .sub-title {
      color: #999;
      margin-bottom: 10px;
    }
    .block-btn {
      display: block;
      margin-bottom: 4px;
    }
  }
  .filter-bottom {
    padding: 6px 10px;
    .sub-title {
      color: #999;
      margin-bottom: 10px;
      .title-btn {
        vertical-align: top;
        float: right;
        font-size: 12px;
      }
    }
    .sub-section {
      margin-bottom: 10px;
    }
  }
}
.pi-table {
  .el-dialog__header {
    border-bottom: 1px solid #ddd;
    margin-right: 0;
  }
  .el-dialog__body {
    padding: 10px 20px 20px 20px;
  }
  .el-dialog__footer {
    border-top: 1px solid #ddd;
    padding: 10px 20px;
  }
  .el-popper {
    max-width: 20vw !important; //宽度可根据自己需要进行设置
  }
}
.columnTitle {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.el-table .warning-row {
  background: #fdf6ec;
}
</style>
