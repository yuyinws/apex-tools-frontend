<template>
  <NavBar :title="title" @click-right="handleRightClick">
    <template #right>
      <i class="iconfont icon-github text-lg text-gray-500"></i>
    </template>
  </NavBar>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { NavBar } from 'vant';

const route = useRoute()
const title = ref('')
const handleRightClick = () => {
  window.location.href = 'https://github.com/yuyinws/apex-tools-frontend'
}
watchEffect(() => {
  title.value = route.meta.title
})
</script>
<style scoped lang="scss"></style>
