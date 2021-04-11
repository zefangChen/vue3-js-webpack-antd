<template>
  <div class="wrap">
    <a-card title="vxe-弹窗" style="margin-bottom: 20px;">
      <div>
        <a-button type="primary" @click="vxeDialogShow = true">拖动窗口调整大小</a-button>
        <vxe-modal v-model="vxeDialogShow" show-zoom resize>
          <template #default>
            <div style="color: red">按住头部移动！！！！！！！！！！！！！！！</div>
            <div style="color: blue">按住左边距拖动！！！！！！！！！！！！！！！</div>
            <div style="color: red">按住右边距拖动！！！！！！！！！！！！！！！</div>
            <div style="color: blue">按住底边距拖动！！！！！！！！！！！！！！！</div>
            <div style="color: blue">按住左下角拖动 ！！！！！！！！！！！！！！！</div>
            <div style="color: blue">按住右下角拖动！！！！！！！！！！！！！！！</div>
          </template>
        </vxe-modal>
      </div>
    </a-card>

    <a-card title="antd-弹窗" style="margin-bottom: 20px;">
      <div>
        <a-button type="primary" @click="visible = true">Open Modal</a-button>
        <a-modal v-model:visible="visible" title="Basic Modal" @ok="handleOk">
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </a-modal>
      </div>
    </a-card>

  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted
} from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: "index",
  setup() {
    const store = useStore();
    const refData = reactive({
      vxeDialogShow: false,
      visible: false,
    })

    let setBreadcrumb = ()=>{
      let breadcrumbList = [
        {path: '', name: '', mete: {title: '组件示例'}},
        {path: '/component/dialog', name: 'dialog', mete: {title: '弹框'}},
      ]
      store.commit('setBreadcrumb', breadcrumbList)
    }

    onMounted(()=>{
      setBreadcrumb()
    })

    return {
      ...toRefs(refData),

    };
  },

})
</script>

<style lang="less" scoped>

</style>
