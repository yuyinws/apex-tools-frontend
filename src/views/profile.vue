<template>
  <NavBar title="战绩查询" @click-right="handleRightClick">
    <template #right v-if="profile.legendArr.length">
      <i class="iconfont icon-fenxiang text-lg text-gray-500"></i>
    </template>
  </NavBar>
  <div class="bg-white rounded-md p-3 m-3">
    <RadioGroup
      v-model="params.platform"
      class="justify-around"
      direction="horizontal"
    >
      <Radio name="PC">
        <div class="flex items-center">
          <i
            class="iconfont icon-origin text-lg mr-2"
            style="color: #e85724"
          ></i>
          <div class="text-gray-400">PC</div>
        </div>
      </Radio>
      <Radio name="X1">
        <div class="flex items-center">
          <i class="iconfont icon-xbox text-lg mr-2" style="color: #0f780f"></i>
          <div class="text-gray-400">Xbox</div>
        </div>
      </Radio>
      <Radio name="PS4">
        <div class="flex items-center">
          <i
            class="iconfont icon-playstation text-lg mr-2"
            style="color: #003e93"
          ></i>
          <div class="text-gray-400">PS</div>
        </div>
      </Radio>
    </RadioGroup>
    <Search
      show-action
      placeholder="请输入玩家ID"
      @search="onSearch"
      shape="round"
      v-model="params.player"
    >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </Search>
    <div class="text-gray-400 text-tiny ml-3">
      * PC玩家请通过Origin ID来查询战绩.
    </div>
    <div class="text-gray-400 text-tiny ml-3 mt-1">* ID区分大小写.</div>
    <div
      class="flex items-center text-gray-400 text-tiny ml-3 mt-1"
      v-if="isSwitchShow"
    >
      <div class="mr-1">隐藏无数据的英雄</div>
      <Switch size="14px" v-model="isHideData" />
    </div>
  </div>
  <div class="mb-16" v-if="profile.legendArr.length" ref="profileInfoRef">
    <div class="bg-white rounded-md p-3 m-3 text-tiny">
      <div class="flex justify-between text-xs text-gray-400">
        <i
          v-if="profile?.global?.platform === 'PC'"
          class="iconfont icon-origin"
          style="color: #e85724"
        ></i>
        <i
          v-if="profile?.global?.platform === 'X1'"
          class="iconfont icon-origin"
          style="color: #0f780f"
        ></i>
        <i
          v-if="profile?.global?.platform === 'PS4'"
          class="iconfont icon-origin"
          style="color: #003e93"
        ></i>
        <div>基本信息</div>
        <div
          :class="[
            profile?.realtime?.isOnline === 1
              ? 'text-green-500'
              : 'text-gray-400',
          ]"
        >
          {{ profile?.realtime?.isOnline === 1 ? '当前在线' : '当前离线' }}
        </div>
      </div>
      <div class="flex justify-between mt-3">
        <div class="flex">
          <div class="text-gray-400 mr-2">ID</div>
          <div class="text-gray-500 mr-4">{{ profile?.global?.name }}</div>
        </div>
        <div class="flex">
          <div class="text-gray-400">LV.</div>
          <div class="text-gray-500">{{ profile?.global.level }}</div>
        </div>
        <div class="flex">
          <div class="text-gray-400 mr-2">uid</div>
          <div class="text-gray-500">{{ profile?.global?.uid }}</div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-md p-3 m-3 text-tiny">
      <div class="flex justify-center text-xs text-gray-400">
        <div>排位信息</div>
      </div>
      <div>
        <div class="flex flex-col justify-center mt-3">
          <div class="flex justify-center">
            <img
              class="w-16 h-auto"
              :src="formatImageUrl(profile?.global?.rank?.rankImg)"
              alt=""
            />
          </div>
          <div class="flex text-gray-500 justify-center">
            <div class="mr-1">大逃杀</div>
            <div class="mr-1">{{ base(profile?.global?.rank?.rankName) }}</div>
            <div>{{ profile?.global?.rank?.rankScore }}RP</div>
          </div>
        </div>
        <div class="flex flex-col justify-center mt-3">
          <div class="flex justify-center">
            <img
              class="w-16 h-auto"
              :src="formatImageUrl(profile?.global?.arena?.rankImg)"
              alt=""
            />
          </div>
          <div class="flex text-gray-500 justify-center">
            <div class="mr-1">竞技场</div>
            <div class="mr-1">{{ base(profile?.global?.arena?.rankName) }}</div>
            <div>{{ profile?.global?.arena?.rankScore }}RP</div>
          </div>
        </div>
      </div>
    </div>

    <div class="relative bg-white rounded-md p-3 m-3 text-tiny">
      <div class="flex justify-center text-xs text-gray-400">
        <div>英雄信息</div>
      </div>
      <div v-for="item in profile?.legendArr">
        <div v-show="isHideData ? item.data : true">
          <div
            class="p-3 m-1 rounded-md shadow-lg justify-center text-gray-500"
          >
            <div class="text-center">
              {{ base(item.name) }}
            </div>
            <div class="flex flex-wrap flex-col" v-if="item.data">
              <div class="flex" v-for="item2 in item.data">
                {{ nameReplace(item2.name) }} {{ item2.value }}
              </div>
            </div>
            <div v-else class="flex justify-center">暂无数据</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <van-loading
    v-if="isLoading"
    class="flex top-36 z-50"
    color="#1989fa"
    vertical
    >加载中...</van-loading
  >
  <ShareSheet
    title="立即分享给好友"
    v-model:show="isShareSheetShow"
    :options="options"
    @select="onSelect"
  />
</template>

<script setup>
import { ref, reactive, onMounted, unref } from 'vue'
import { Search, RadioGroup, Radio } from 'vant'
import _axios from '../util/axios'
import { useRoute } from 'vue-router'
import { base, nameReplace } from '../util/translate'
import { Toast, Switch, NavBar, ShareSheet } from 'vant'
import html2canvas from 'html2canvas'

const profileInfoRef = ref(null)
const isShareSheetShow = ref(false)
const route = useRoute()
const isLoading = ref(false)
const isSwitchShow = ref(true)
const params = reactive({
  platform: 'PC',
  player: '',
})
const profile = reactive({
  global: {},
  legendArr: [],
  realtime: {},
})
const options = [
  { id: 1, name: '复制链接', icon: 'link' },
  { id: 2, name: '分享图片', icon: 'poster' },
]

const isHideData = ref(true)

const onSelect = async (option) => {
  if (option.id === 1) {
    try {
      await navigator.clipboard.writeText(
        `https://apex.yuy1n.io/#/profile/${params.platform}/${params.player}`
      )
      Toast.success('复制成功！')
      isShareSheetShow.value = false
    } catch (error) {
      Toast.fail('复制链接出错了')
    }
  } else if (option.id === 2) {
    createImg()
  }
}

const handleRightClick = () => {
  isShareSheetShow.value = true
}

const createImg = () => {
  html2canvas(unref(profileInfoRef), {
    allowTaint: false,
    useCORS: true,
  })
    .then((canvas) => {
      let url = canvas.toDataURL('image/png')
      const a = document.createElement('a')
      a.href = url
      a.setAttribute('download', `${params.player}-profile`)
      a.click()
    })
    .catch((err) => {
      console.log(err)
      Toast.fail('生成图片失败了')
    })
    .finally(() => {
      isShareSheetShow.value = false
    })
}
const onSearch = async () => {
  if (!params.player) {
    Toast.fail('请输入玩家ID')
    return
  }
  profile.global = {}
  profile.legendArr = []
  profile.realtime = []
  isLoading.value = true
  const { data } = await _axios('get', '/profile', params)
  isLoading.value = false
  const { global, legends, realtime } = data
  let legendArr = []
  for (let i in legends.all) {
    legends.all[i].name = i
    if (legends.all[i].data) {
      legendArr.unshift(legends.all[i])
    } else {
      legendArr.push(legends.all[i])
    }
  }
  profile.global = global
  profile.realtime = realtime
  profile.legendArr = legendArr
}
const formatImageUrl = (url) => {
  const urlArray = url.split('/')
  return `/rank/${urlArray[urlArray.length - 1]}`
}
onMounted(() => {
  const { params: _params } = route
  if (_params.platform && _params.player) {
    params.platform = _params.platform
    params.player = _params.player
    onSearch()
  }
})
</script>
<style scoped lang="scss"></style>
