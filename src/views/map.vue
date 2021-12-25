<template>
  <NavBar title="地图轮换" @click-right="handleRightClick">
    <template #right>
      <i class="iconfont icon-github text-lg text-gray-500"></i>
    </template>
  </NavBar>
  <van-loading v-if="isLoading" class="flex top-36" color="#1989fa" vertical
    >加载中...</van-loading
  >

  <div v-else class="mx-auto max-w-5xl p-2 text-tiny">
    <div
      class="bg-white p-4 w-full rounded-md shadow-md mb-3"
      v-for="(item, index) in mapInfo"
      :key="item.mode"
    >
      <div class="text-gray-400 text-center">
        <div>{{ base(item.mode) }}</div>
      </div>
      <div class="flex items-center justify-center mt-3">
        <div class="text-gray-500 mr-2">当前地图</div>
        <div class="text-gray-900 mr-2">{{ base(item.current.code) }}</div>
        <template v-if="item.mode !== 'ranked'">
          <div class="text-gray-500 mr-2">剩余时间</div>
          <div class="text-gray-900">{{ item.current.remainingTimer }}</div>
        </template>
      </div>

      <div class="flex items-center justify-center mt-3">
        <div class="text-gray-500 mr-2">下张地图</div>
        <div class="text-gray-900 mr-2">{{ base(item.next.code) }}</div>
        <template v-if="item.mode !== 'ranked'">
          <div class="text-gray-500 mr-2">持续时间</div>
          <div class="text-gray-900">{{ item.next.DurationInMinutes }}分钟</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {base} from '../util/translate'
import _axios from '../util/axios'
import { NavBar } from 'vant';

const mapInfo = ref([])
const isLoading = ref(false)
const getMapInfo = async () => {
  isLoading.value = true
  const {data} = await _axios('get', '/map')
  isLoading.value = false
  for (let i in data) {
    data[i].mode = i
    if (i !== 'ranked') mapInfo.value.push(data[i])
  }
}
const handleRightClick = () => {
  window.location.href = 'https://github.com/yuyinws/apex-tools-frontend'
}
onMounted(() => {
  getMapInfo()
})
</script>
<style scoped lang="scss"></style>
