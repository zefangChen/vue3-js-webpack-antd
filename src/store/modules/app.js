const app = {
    state: {
        collapseFlag: false,
        breadcrumbList: [],
    },
    mutations: {
        setCollapseFlag(state, collapseFlag) {
            state.collapseFlag = collapseFlag
        },
        setBreadcrumb(state, breadcrumbList) {
          state.breadcrumbList = breadcrumbList
        },
    },
    actions: {


    }
};

export default app
