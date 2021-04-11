<template>
  <div class="wrap">
    <a-card title="表格" style="margin-bottom: 20px;">
      <template #extra>
        <a-button type="primary" @click="showModal">新增</a-button>
      </template>
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
        <!--        <div class="page-container">
                  <a-pagination
                      show-size-changer
                      v-model:current="page.curPage"
                      v-model:pageSize="page.pageSize"
                      :total="500"
                      @showSizeChange="onShowSizeChange"
                  />
                </div>-->
      </div>
    </a-card>

    <a-button type="primary" @click="dialogShow = true">拖动窗口调整大小</a-button>
    <vxe-modal v-model="dialogShow" show-zoom resize>
      <template #default>
        <div style="color: red">按住头部移动！！！！！！！！！！！！！！！</div>
        <div style="color: blue">按住左边距拖动！！！！！！！！！！！！！！！</div>
        <div style="color: red">按住右边距拖动！！！！！！！！！！！！！！！</div>
        <div style="color: blue">按住底边距拖动！！！！！！！！！！！！！！！</div>
        <div style="color: blue">按住左下角拖动 ！！！！！！！！！！！！！！！</div>
        <div style="color: blue">按住右下角拖动！！！！！！！！！！！！！！！</div>
      </template>
    </vxe-modal>

    <a-modal
        v-model:visible="visible"
        :maskClosable="false"
        :footer="null"
        width="1000px"
        title="Basic Modal"
    >
      <div>
        <a-form
            ref="formRef"
            :model="formState"
            :rules="rules"
            label-align="left"
            :label-col="{span: 3}"
            :wrapper-col="{span: 21}"
        >
          <a-form-item ref="name" label="Activity name" name="name">
            <a-input v-model:value="formState.name" />
          </a-form-item>
          <a-form-item label="Activity zone" name="region">
            <a-select v-model:value="formState.region" allowClear placeholder="please select your zone">
              <a-select-option value="shanghai">Zone one</a-select-option>
              <a-select-option value="beijing">Zone two</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="Activity time" name="date1">
            <a-date-picker
                v-model:value="formState.date1"
                show-time
                type="date"
                placeholder="Pick a date"
                style="width: 100%"
            />
          </a-form-item>
          <a-form-item label="Instant delivery" name="delivery">
            <a-switch v-model:checked="formState.delivery"/>
          </a-form-item>
          <a-form-item label="Activity type" name="type">
            <a-checkbox-group v-model:value="formState.type">
              <a-checkbox value="1" name="type">Online</a-checkbox>
              <a-checkbox value="2" name="type">Promotion</a-checkbox>
              <a-checkbox value="3" name="type">Offline</a-checkbox>
            </a-checkbox-group>
          </a-form-item>
          <a-form-item label="Resources" name="resource">
            <a-radio-group v-model:value="formState.resource">
              <a-radio value="1">Sponsor</a-radio>
              <a-radio value="2">Venue</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="Activity form" name="desc">
            <a-textarea v-model:value="formState.desc"/>
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 14, offset: 10 }">
            <a-button type="primary" @click="onSubmit">创建</a-button>
            <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>

<script>
import {
  queryList
} from '@/api'
import {defineComponent, reactive, toRefs, ref, toRaw, computed, onMounted} from 'vue';
import {message} from 'ant-design-vue';

export default defineComponent({
  name: "index",
  setup() {
    // 表格
    let table = reactive({
      data: [],
      columns: [
        {
          title: '姓名',
          dataIndex: 'name',
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
          onFilter: (value, record) => record.name.indexOf(value) === 0,
          sorter: (a, b) => a.name.length - b.name.length,
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
          onFilter: (value, record) => record.address.indexOf(value) === 0,
          sorter: (a, b) => a.address.length - b.address.length,
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

    const refData = reactive({
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
        refData.visible = true;
      },

      handleCancel: () => {
        message.error('您关闭了弹框');
        refData.visible = false;
      },

      handleOk: () => {
        message.success('保存成功');
        refData.visible = false;
      }
    })

    // 表单
    const formRef = ref();
    const formState = reactive({
      name: '',
      region: '',
      date1: '',
      delivery: false,
      type: [],
      resource: '',
      desc: '',
    });
    const rules = {
      name: [
        {required: true, message: '请填写必填项', trigger: 'blur'},
        {min: 3, max: 5, message: '字符长度3-5个', trigger: 'blur'},
      ],
      region: [{required: true, message: '请填写必填项', trigger: 'change'}],
      date1: [{required: true, message: '请填写必填项', trigger: 'change', type: 'object'}],
      type: [{required: true, message: '请填写必填项', trigger: 'change', type: 'array'}],
      resource: [{required: true, message: '请填写必填项', trigger: 'change'}],
      desc: [{required: true, message: '请填写必填项', trigger: 'blur'}]
    };
    const onSubmit = () => {
      debugger

      formRef.value
          .validate()
          .then(() => {
            console.log('values,打印响应式对象和无响应的普通对象', formState, toRaw(formState));
          })
          .catch((error) => {
            console.log('error', error);
          });
    };
    const resetForm = () => {
      formRef.value.resetFields();
    };


    // 查询表格数据
    const queryData = () => {
      table.loading = true
      let {pagination: {current}} = table
      let params = {
        results: 120,
        page: current,
      }
      queryList(params).then(({results = []}) => {
        table.loading = false
        table.data = results;
        table.pagination.total = results.length
      })
    };


    onMounted(() => {
      queryData()   // 查询表格数据
    })

    return {
      table,
      onChange,
      ...toRefs(refData),

      formRef,
      other: '',
      formState,
      rules,
      onSubmit,
      resetForm,
    };
  },

})
</script>

<style lang="less" scoped>
.wrap {
  /deep/ .table-striped {
    background-color: #fafafa;
  }

  .page-container {
    padding: 10px 0;
    text-align: right;
  }


}


</style>
