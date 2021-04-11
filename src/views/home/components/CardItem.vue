<template>
  <a-card hoverable>
    <template #cover>
      <img alt="img" :src="cardData.img" />
    </template>
    <a-card-meta :title="cardData.title">
      <template #description>{{ cardData.subTitle }}</template>
    </a-card-meta>
  </a-card>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "CardItem",
  props: {
    cardData: {
      type: Object,
      default: {
        img: "",
        title: "模块名称",
        subTitle: "模块描述"
      }
    }
  }
});
</script>

<style scoped>
.ant-card {
  flex: 1;
  margin-right: 20px;
  margin-bottom: 20px;
  overflow: hidden;
}

.ant-card:last-child {
  margin-right: 0;
}

.ant-card:hover {
  transform: translateY(-5px);
}

.ant-card .ant-card-cover img {
  transform: scale(1);
  transition: transform 0.2s;
  border-radius: 4px;
}

/*鼠标移动到卡片，图片放大*/
.ant-card:hover .ant-card-cover img {
  transform: scale(1.05);
}
</style>
