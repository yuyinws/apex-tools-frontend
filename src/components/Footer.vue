<template>
  <Tabbar v-model="activePage" @change="onPageChange">
    <TabbarItem name="profile" icon="fire-o"> 战绩查询 </TabbarItem>
    <TabbarItem name="map" icon="home-o">
      <div class="relative bottom-2">地图轮换</div>
      <template #icon="props">
        <i
          :class="[
            'iconfont',
            'icon-map',
            'text-3xl',
            `${props.active ? 'text-active' : 'text-gray-500'}`,
          ]"
        ></i>
      </template>
    </TabbarItem>
    <!-- <TabbarItem name="about" icon="info-o">关于</TabbarItem> -->
  </Tabbar>
</template>

<script setup>
import { ref } from 'vue'
import { Tabbar, TabbarItem } from 'vant'
import { useRouter } from 'vue-router'

const router = useRouter()

router.beforeEach((to, from, next) => {
  activePage.value = to.name
  next()
})
const onPageChange = (event) => {
  router.replace({
    name: event,
  })
}
const activePage = ref('profile')
</script>
<style scoped lang="scss"></style>
