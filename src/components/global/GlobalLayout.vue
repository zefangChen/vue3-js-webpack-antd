<template>
  <a-layout>
    <!--头部-->
    <global-header />
    <a-layout>
      <!--左边菜单-->
      <global-side />
      <a-layout style="padding: 0 20px 20px">
        <!--面包屑-->
        <global-breadcrumb />
        <!--主体-->
        <a-layout-content>
          <route-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
import {defineComponent, defineProps, ref} from 'vue'
import RouteView from "@/components/layouts/RouteView"
import {UserOutlined, LaptopOutlined, NotificationOutlined} from '@ant-design/icons-vue';
import GlobalHeader from "./GlobalHeader";
import GlobalBreadcrumb from "./GlobalBreadcrumb";
import GlobalSide from "./GlobalSide";

export default defineComponent({
  name: 'GlobalLayout',
  components: {
    RouteView,
    GlobalHeader,
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
    GlobalBreadcrumb,
    GlobalSide
  },
  setup() {
    return {



    };
  },
})
</script>

<style scoped>
>>> .ant-layout.ant-layout-has-sider {
  flex-direction: row;
  height: calc(100vh - 70px);
}

>>> ant-layout {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
