<template>
  <div class="home-index">
    <a-layout>
      <a-layout-header>
        <div class="header-wrap">
          <div class="logo dis-flex">
            <img src="@/assets/img/yearlogo.png" alt="logo">
            <div class="nav-list dis-flex">
              <div class="common-color">首页</div>
              <div>学习</div>
            </div>
          </div>
          <div>
            <span class="common-color cursor-p">
              <UserOutlined />
              登陆
            </span>
          </div>
        </div>
      </a-layout-header>

      <a-layout-content>
        <div>
          <a-carousel autoplay>
            <div v-for="item in carousel" :key="item.id">
              <img :src="item.img">
            </div>
          </a-carousel>
        </div>
        <div class="dis-flex" v-for="i in 2" :key="i">
          <card-item
            v-for="item in blockList.splice(0, 5)"
            :key="item.id"
            :cardData="item"
            @click="goBlock(item)"
          />
        </div>
      </a-layout-content>
    </a-layout>

  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, unref, watch } from "vue";
import { useRouter } from "vue-router";
import { UserOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import CardItem from "./components/CardItem";
import {blockList, carousel} from '@/mock/home'

export default defineComponent({
  name: "index",
  components: {
    UserOutlined,
    CardItem
  },
  setup() {
    const router = useRouter();
    let goBlock = ({router:{path}={}}) => {
      debugger
      if(path) {
        router.push(path);
      }else {
        message.info('此模块正在开发中...');
        return;
      }
    };

    let data = reactive({
      blockList: [],
      carousel: []
    })

    watch(()=>router,(newRouter)=>{
      let {currentRoute} = newRouter
      if(unref(currentRoute).path === '/radar/home') {
        data.blockList = [...blockList]
        data.carousel = [...carousel]
      }
    },{immediate : true})

    return {
      goBlock,
      ...toRefs(data)
    };
  }
});
</script>

<style scoped>
.home-index {

}
.ant-carousel {
  margin-bottom: 40px;
}

.ant-carousel :deep(.slick-slide) {
  text-align: center;
  overflow: hidden;
}

.ant-carousel :deep(.slick-slide h3) {
  color: #fff;
}

.ant-layout-header {
  height: 70px;
  background: #ffffff;
}

.common-color {
  color: #3D7EFF
}

.cursor-p{
  cursor: pointer;
}

.dis-flex {
  display: flex;
  align-items: center;
}

.logo img {
  width: 80px;
  height: 70px;
  display: block;
  position: static;
}

.nav-list>div {
  margin: 0 20px;
  cursor: pointer;
}

.header-wrap {
  width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.ant-layout-content {
  width: 1400px;
  height: 100%;
  padding: 20px 0;
  margin: 0 auto;
}



</style>
