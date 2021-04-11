<template>
  <div class="wrap">
    <a-card title="表单 && 表单验证" style="margin-bottom: 20px;">
      <div>
        <a-form
          ref="formRef"
          :model="formState"
          :rules="rules"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-form-item ref="name" label="输入框" name="name">
            <a-input v-model:value="formState.name" />
          </a-form-item>
          <a-form-item label="下拉框" name="region">
            <a-select v-model:value="formState.region" placeholder="please select your zone">
              <a-select-option value="shanghai">Zone one</a-select-option>
              <a-select-option value="beijing">Zone two</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="日期选择框" required name="date1">
            <a-date-picker
              v-model:value="formState.date1"
              show-time
              type="date"
              placeholder="Pick a date"
              style="width: 100%"
            />
          </a-form-item>
          <a-form-item label="下拉树" name="treeValue">
            <a-tree-select
              v-model:value="formState.treeValue"
              tree-data-simple-mode
              style="width: 100%"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              :tree-data="treeData"
              placeholder="Please select"
              :load-data="onLoadData"
            />
          </a-form-item>
          <a-form-item label="Instant delivery" name="delivery">
            <a-switch v-model:checked="formState.delivery" />
          </a-form-item>
          <a-form-item label="多选checkbox" name="type">
            <a-checkbox-group v-model:value="formState.type">
              <a-checkbox value="1" name="type">Online</a-checkbox>
              <a-checkbox value="2" name="type">Promotion</a-checkbox>
              <a-checkbox value="3" name="type">Offline</a-checkbox>
            </a-checkbox-group>
          </a-form-item>
          <a-form-item label="单选radio" name="resource">
            <a-radio-group v-model:value="formState.resource">
              <a-radio value="1">Sponsor</a-radio>
              <a-radio value="2">Venue</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="上传">
            <a-upload
              :file-list="fileList"
              :remove="handleRemove"
              :before-upload="beforeUpload"
            >
              <a-button>
                <upload-outlined></upload-outlined>
                Select File
              </a-button>
            </a-upload>
            <a-button
              type="primary"
              :disabled="fileList.length === 0"
              :loading="uploading"
              style="margin-top: 16px"
              @click="handleUpload"
            >
              {{ uploading ? 'Uploading' : 'Start Upload' }}
            </a-button>
          </a-form-item>
          <a-form-item label="输入框textarea" name="desc">
            <a-textarea v-model:value="formState.desc" />
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="onSubmit">Create</a-button>
            <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
          </a-form-item>
        </a-form>
      </div>
    </a-card>

  </div>
</template>

<script>
import { defineComponent, reactive, ref, toRaw, watch } from 'vue';
import { UploadOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  components: {
    UploadOutlined
  },
  setup() {
    const formRef = ref();
    const formState = reactive({
      name: '',
      region: undefined,
      date1: undefined,
      delivery: false,
      type: [],
      resource: '',
      desc: '',
      treeValue: ''
    });
    const rules = {
      name: [
        { required: true, message: '请填写必填项', trigger: 'blur' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
      ],
      region: [{ required: true, message: '请填写必填项', trigger: 'change' }],
      date1: [{ required: true, message: '请填写必填项', trigger: 'change', type: 'object' }],
      type: [
        {
          type: 'array',
          required: true,
          message: '请填写必填项',
          trigger: 'change',
        },
      ],
      resource: [{ required: true, message: '请填写必填项', trigger: 'change' }],
      desc: [{ required: true, message: '请填写必填项', trigger: 'blur' }],
    };

    const treeData = ref([
      { id: 1, pId: 0, value: '1', title: 'Expand to load' },
      { id: 2, pId: 0, value: '2', title: 'Expand to load' },
      { id: 3, pId: 0, value: '3', title: 'Tree Node', isLeaf: true },
    ]);


    const onSubmit = () => {
      formRef.value
        .validate()
        .then(() => {
          console.log('values', formState, toRaw(formState));
        })
        .catch((error) => {
          console.log('error', error);
        });
    };
    const resetForm = () => {
      formRef.value.resetFields();
    };

    const genTreeNode = (parentId, isLeaf = false) => {
      const random = Math.random().toString(36).substring(2, 6);
      return {
        id: random,
        pId: parentId,
        value: random,
        title: isLeaf ? 'Tree Node' : 'Expand to load',
        isLeaf,
      };
    };
    const onLoadData = (treeNode) => {
      console.log(treeNode);
      return new Promise((resolve) => {
        const { id } = treeNode.dataRef;
        setTimeout(() => {
          treeData.value = treeData.value.concat([genTreeNode(id, false), genTreeNode(id, true)]);
          resolve();
        }, 300);
      });
    };


    // 上传
    const fileList = ref([]);
    const uploading = ref(false);

    const handleRemove = (file) => {
      const index = fileList.value.indexOf(file);
      const newFileList = fileList.value.slice();
      newFileList.splice(index, 1);
      fileList.value = newFileList;
    };

    const beforeUpload = (file) => {
      debugger
      fileList.value = [...fileList.value, file];
      return false;
    };

    const handleUpload = () => {
      debugger
      const formData = new FormData();
      fileList.value.forEach((file) => {
        formData.append('files[]', file);
      });
      uploading.value = true;

      //调接口上传


    };

    return {
      formRef,
      formState,
      rules,
      onSubmit,
      resetForm,
      treeData,
      genTreeNode,
      onLoadData,

      //上传
      fileList,
      uploading,
      handleRemove,
      beforeUpload,
      handleUpload,
    };
  },
});
</script>

<style lang="less" scoped>

</style>
