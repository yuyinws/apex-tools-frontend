<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" v-if="$route.meta.keepAlive" />
    </keep-alive>
    <component :is="Component" v-if="!$route.meta.keepAlive" />
    <Footer />
  </router-view>
  <ReloadPrompt />
</template>

<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// import Map from '@/views/map.vue'
import Footer from '@/components/Footer.vue'
import ReloadPrompt from './ReloadPrompt.vue'
</script>

<style></style>
