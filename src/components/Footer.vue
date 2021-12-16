<template>
  <div class="text-gray-600 text-xs w-full fixed bottom-2 text-center">
    <div>Made By YuYin</div>
    <div @click="toGithub" class="flex items-center justify-center">
      <i class="iconfont icon-github mr-1"></i>
      <div>Github</div>
    </div>
  </div>
</template>

<script setup>
const toGithub = () => {
  window.location.href = 'https://github.com/yuyinws/apex-tools-frontend'
}
</script>
<style scoped lang="scss"></style>
