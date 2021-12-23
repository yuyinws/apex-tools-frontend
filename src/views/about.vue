<template>
  <div class="h-screen text-tiny">
    <div class="w-full text-center relative top-1/3">
      <span class="text-gray-500 mr-1">感谢</span>
      <span class="text-green-600 mr-1 underline" @click="toApiPage"
        >Apex Legends Status</span
      >
      <span class="text-gray-500">的API支持!</span>
    </div>
    <div class="w-full text-center relative top-1/3">
      <span class="text-gray-500 mr-1">Thanks API Support From</span>
      <span class="text-green-600 mr-1 underline" @click="toApiPage"
        >Apex Legends Status</span
      >
    </div>
  </div>
</template>

<script setup>
const toApiPage = () => {
  window.location.href = 'https://apexlegendsapi.com/index.php'
}
</script>
<style scoped lang="scss"></style>
