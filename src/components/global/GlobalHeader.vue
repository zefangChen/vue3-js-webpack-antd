<template>
  <a-layout-header class="header">
    <div class = "flex">
      <div class="logo">
        <img src="../../assets/img/yearlogo.png" alt="logo">
        <span>Vue3 Antd 实验项目</span>
      </div>

      <a-menu
          theme="dark"
          mode="horizontal"
          v-model:selectedKeys="selectedKeys"
          :style="{ lineHeight: '64px' }"
      >
        <a-menu-item v-for="item in navList" :key="item.id+''" @click="goRouter(item)">{{ item.name }}</a-menu-item>
      </a-menu>
    </div>
    <div class="user-info">
      <div class="avatar">
        <img src="../../assets/img/header.jpg" alt="user-img">
      </div>
      <span>你好，陈泽芳</span>
    </div>
  </a-layout-header>
</template>
<script>
import {
  defineComponent,
  reactive,
  toRefs,
  watch,
  unref,
  computed,
  onMounted
} from 'vue'
import { useRouter} from "vue-router";
import {
  BorderOutlined,
  UserOutlined
} from '@ant-design/icons-vue';
import {nav} from '@/mock/componentMenu'

export default defineComponent({
  name: 'GlobalHeader',
  components : {
    BorderOutlined,
    UserOutlined
  },
  setup() {
    const router = useRouter();
    let data = reactive({
      navList: [],  // 头部导航
      selectedKeys: ['1'],  // 头部默认选中
    })

    let goRouter = (item) => {
      debugger
      let {router: {path}} = item
      router.push(path);
    }

    watch(()=>router,(newRouter)=>{
      /*let {currentRoute} = newRouter
      if(unref(currentRoute).path === '/radar/cover/blockOne') {
        data.navList = [...nav]
      }*/

      data.navList = [...nav]
    },{immediate : true})

    onMounted(()=>{

    })

    return {
      ...toRefs(data),
      goRouter
    }
  }
})
</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-content: center;
  justify-content: space-between;
  height: 70px;

  .flex{
    display: flex;
  }


  .logo{
    width: 250px;
    text-align: center;
    display: flex;
    align-items: center;
    color: #ffffff;
    font-size: 16px;
    font-weight: bold;
  }

  .logo img {
    width: 80px;
    height: 70px;
    display: block;
    position: static;
  }

  .user-info {
    color: #ffffff;
    min-width: 200px;
    padding-right: 20px;
    font-size: 14px;
    display: flex;
    align-items: center;
    color: rgba(255, 255, 255, 0.65);
    cursor: pointer;
    &:hover{
      color: #fff;
    }
    .avatar {
      margin-right: 10px;
      width: 48px;
      height: 48px;
      line-height: 40px;
      border-radius: 50%;
      img {
        width: 48px;
        height: 48px;
        line-height: 40px;
        border-radius: 50%;
      }
    }
  }

}

.ant-layout-header{
  padding: 0;
}

.ant-menu-dark.ant-menu-horizontal > :deep(.ant-menu-item){
  height: 100% !important;
  line-height: 70px!important;
}


</style>
