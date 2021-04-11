import {createRouter, createWebHashHistory} from "vue-router";
import {UserLayout, TabLayout, RouteView, BlankLayout} from '@/components/layouts'
import componentDemo from './modules/componentDemo'

const routes = [
    {
        path: "/",
        name: "/",
        redirect: '/radar/home',
        component: BlankLayout,
        meta: {
            title: "首页",
            keepAlive: false
        },
        children: [
            {
                path: "/radar/home",
                name: "home",
                component: () => import("../views/home/index.vue"),
            },
        ],
    },
    //组件库
    ...componentDemo
];
const router = createRouter({
    history: createWebHashHistory(),
    routes
});
export default router;
