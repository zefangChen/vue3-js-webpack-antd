<template>
  <div class="wrap">
    <a-card title="vxe-表格" style="margin-bottom: 20px;">
      <div>
        <BaseTable />
      </div>
    </a-card>

    <a-card title="antd-表格" style="margin-bottom: 20px;">
      <div>
        <a-table
          rowKey="cell"
          @change="onChange"
          :columns="table.columns"
          :data-source="table.data"
          :loading="table.loading"
          :rowClassName="(record, index) => (index % 2 === 1 ? 'table-striped' : null)"
          bordered
          :pagination="table.pagination"
        />

      </div>
    </a-card>

  </div>
</template>

<script>
import {
  queryList
} from '@/api'
import {
  defineComponent, onMounted,
  reactive,
  toRefs
} from "vue";
import { message } from "ant-design-vue";
import { useStore } from 'vuex'
import BaseTable from './components/BasicTable'

export default defineComponent({
  name: "index",
  components: {
    BaseTable
  },
  setup() {
    const store = useStore()
    // 表格
    let table = reactive({
      data: [],
      columns: [
        {
          title: '姓名',
          dataIndex: 'name1',
          filters: [
            {
              text: 'Joe',
              value: 'Joe',
            },
            {
              text: 'Jim',
              value: 'Jim',
            }
          ],
          onFilter: (value, record) => record.name1.indexOf(value) === 0,
          sorter: (a, b) => a.name1.length - b.name1.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: '性别',
          dataIndex: 'gender',
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.age - b.age,
        },
        {
          title: '邮箱',
          dataIndex: 'email',
          filters: [
            {
              text: 'London',
              value: 'London',
            },
            {
              text: 'New York',
              value: 'New York',
            },
          ],
          filterMultiple: false,
          onFilter: (value, record) => record.email.indexOf(value) === 0,
          sorter: (a, b) => a.email.length - b.email.length,
          sortDirections: ['descend', 'ascend'],
        },
      ],
      loading: false,
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal(total) {
          return `${total}条`
        },
        pageSizeOptions: ['10', '20', '30', '40', '50'],

      }
    })

    const onChange = (pagination, filters, sorter) => {
      let {current} = pagination
      table.pagination = {
        ...table.pagination,
        current
      }
      console.log('params', pagination, filters, sorter);
      queryData()
    };

    const refTableData = reactive({
      dialogShow: false,
      page: {
        curPage: 1,
        pageSize: 10
      },

      onShowSizeChange: (curPage, pageSize) => {
        console.log(curPage, pageSize);
      },

      visible: false,
      showModal: () => {
        refTableData.visible = true;
      },

      handleCancel: () => {
        message.error('您关闭了弹框');
        refTableData.visible = false;
      },

      handleOk: () => {
        message.success('保存成功');
        refTableData.visible = false;
      }
    })

    // 查询表格数据
    const queryData = () => {
      table.loading = true
      let {pagination: {current}} = table
      let params = {
        results: 120,
        page: current,
      }
      queryList(params).then(({results = []}) => {
        table.loading = false;
        results.forEach(item=>{
          item.name1 = item.name.first + ' ' + item.name.last
        })
        table.data = results;
        table.pagination.total = results.length
      })
    };

    let setBreadcrumb = ()=>{
      let breadcrumbList = [
        {path: '', name: '', mete: {title: '组件示例'}},
        {path: '/component/table', name: 'table', mete: {title: '表格'}},
      ]
      store.commit('setBreadcrumb', breadcrumbList)
    }

    onMounted(() => {
      queryData()   // 查询表格数据
      setBreadcrumb()
    })


    return {
      table,
      onChange,
      ...toRefs(refTableData),

    };
  },

})
</script>

<style lang="less" scoped>

</style>
