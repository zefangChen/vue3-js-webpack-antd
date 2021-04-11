const nav = [
    {
        name: '首页',
        id: 11,
        router: {path: "/radar/home", name: "home"}
    },
    {
        name: '组件库',
        id: 1,
        router: {path: "/radar/home", name: "home"}
    }
]

const menuList = [
    {
        name: '组件示例',
        id: 111,
        children: [
            {
                name: '弹窗',
                id: 112,
                router: {path: "/component/dialog", name: "dialog"}
            },
            {
              name: '表格',
              id: 113,
              router: {path: "/component/table", name: "table"}
            },
            {
              name: '表单',
              id: 114,
              router: {path: "/component/form", name: "form"}
            },
            {
              name: '图表',
              id: 115,
              router: {path: "/component/charts", name: "charts"}
            }
        ]
    },
    {
        name: '主菜单2',
        id: 115,
        children: [
            {
                name: 'option4',
                id: 116,
                router: {path: "/component/dialog", name: "dialog"}
            },
            {
                name: 'option5',
                id: 117,
                router: {path: "/component/dialog", name: "dialog"}
            },
            {
                name: 'option6',
                id: 118,
                router: {path: "/component/dialog", name: "dialog"}
            }
        ]
    },
]

export {nav, menuList}
