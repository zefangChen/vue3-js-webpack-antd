<template>
  <a-breadcrumb style="margin: 16px 0">
    <a-breadcrumb-item>
      <MenuFoldOutlined @click="toggleMenu" v-if="collapseFlag" />
      <MenuUnfoldOutlined @click="toggleMenu" v-else />
    </a-breadcrumb-item>
    <a-breadcrumb-item>
      <home-outlined />
    </a-breadcrumb-item>
    <a-breadcrumb-item
      v-for="item in breadcrumbList"
      :key="item.name"
      @click="goRouter(item.name)"
    >
      {{ item.mete.title }}
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
import { computed, defineComponent, unref } from "vue";
import { HomeOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import { useStore } from "vuex";
import {useRouter} from 'vue-router'

export default defineComponent({
  name: "GlobalBreadcrumb",
  components: {
    HomeOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    const {state:{app}} = store

    let collapseFlag = computed(()=>{return app.collapseFlag})
    let breadcrumbList = computed(()=>{return app.breadcrumbList})

    let toggleMenu = ()=>{
      store.commit('setCollapseFlag', !app.collapseFlag)
    }

    let goRouter = (name) => {
      let {currentRoute} = router
      if(name && unref(currentRoute).name !== name) {
        router.push({name})
      }
    }

    return {
      collapseFlag,
      breadcrumbList,
      goRouter,
      toggleMenu,
    }
  },
})
</script>

<style scoped>

</style>
