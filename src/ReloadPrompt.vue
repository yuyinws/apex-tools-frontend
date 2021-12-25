<script setup>
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { Button } from 'vant'
// replaced dyanmicaly
const reloadSW = '__RELOAD_SW__'

const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW({
  immediate: true,
  onRegistered(r) {
    if (reloadSW === 'true') {
      r &&
        setInterval(async () => {
          console.log('Checking for sw update')
          await r.update()
        }, 20000 /* 20s for testing purposes */)
    } else {
      console.log(`SW Registered: ${r}`)
    }
  },
})

const close = async () => {
  offlineReady.value = false
  needRefresh.value = false
}
</script>

<template>
  <div
    v-if="offlineReady || needRefresh"
    class="
      fixed
      text-tiny
      right-0
      bottom-10
      p-3
      mb-3
      mr-1
      shadow-sm
      bg-white
      rounded-md
    "
    role="alert"
  >
    <div class="text-gray-400">
      <div v-if="offlineReady">应用已准备好离线使用</div>
      <div v-else>有新内容可用</div>
    </div>
    <div class="flex justify-between mt-3">
      <Button
        v-if="needRefresh"
        size="small"
        class="bg-blue-500 text-white"
        @click="updateServiceWorker()"
      >
        刷 新
      </Button>
      <Button size="small" type="default" @click="close"> 关 闭 </Button>
    </div>
  </div>
</template>

<style></style>
