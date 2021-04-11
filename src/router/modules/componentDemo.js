import {UserLayout, TabLayout, RouteView, BlankLayout} from '@/components/layouts'

const componentDemo = [
  {
    path: "/component",
    name: "component",
    component: TabLayout,
    meta: {
      title: "组件示例",
      keepAlive: false
    },
    redirect: '/component/dialog',
    children: [
      {
        path: "dialog",
        name: "dialog",
        meta: {
          title: "弹窗",
          keepAlive: false
        },
        component: () => import("../../views/componentDemo/dialog/index.vue"),
      },
      {
        path: "table",
        name: "table",
        meta: {
          title: "表格",
          keepAlive: false
        },
        component: () => import("../../views/componentDemo/table/index.vue"),
      },
      {
        path: "form",
        name: "form",
        meta: {
          title: "表单",
          keepAlive: false
        },
        component: () => import("../../views/componentDemo/form/index.vue"),
      },
      {
        path: "charts",
        name: "charts",
        meta: {
          title: "图表",
          keepAlive: false
        },
        component: () => import("../../views/componentDemo/charts/index.vue"),
      }
    ],
  }
];

export default componentDemo;
