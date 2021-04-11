import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 全局引入antd
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

// 按需引入 vxe-table
import 'xe-utils'
import {Modal} from 'vxe-table'
import 'vxe-table/lib/style.css'

createApp(App)
.use(store)
.use(router)
.use(Antd)
.use(Modal)
.mount("#app");
