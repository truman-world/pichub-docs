<script setup lang="ts">
import { ref, computed } from 'vue'

const isChinaRegion = ref(true)
const activeTab = ref('macOS / Linux')

const tabs = ['macOS / Linux', 'Windows', 'npm', 'pnpm', 'Docker']

const command = computed(() => {
  if (activeTab.value === 'macOS / Linux') {
    return isChinaRegion.value 
      ? `curl -fsSL https://pichub.app/install.sh | bash -s -- --mirror`
      : `curl -fsSL https://pichub.app/install.sh | bash`
  }
  if (activeTab.value === 'Windows') {
    return `iwr -useb https://pichub.app/install.ps1 | iex`
  }
  if (activeTab.value === 'npm') {
    return isChinaRegion.value
      ? `npm install -g pichub-cli --registry=https://registry.npmmirror.com`
      : `npm install -g pichub-cli`
  }
  if (activeTab.value === 'pnpm') {
    return isChinaRegion.value
      ? `pnpm add -g pichub-cli --registry=https://registry.npmmirror.com`
      : `pnpm add -g pichub-cli`
  }
  if (activeTab.value === 'Docker') {
    return isChinaRegion.value
      ? `docker run -d -p 8000:8000 docker.m.daocloud.io/truman/pichub`
      : `docker run -d -p 8000:8000 truman/pichub`
  }
  return ''
})

const copyCommand = () => {
    navigator.clipboard.writeText(command.value)
    // could add a toast here
}
</script>

<template>
  <div class="quick-start-container mt-8">
    
    <!-- Header with switch -->
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-bold flex items-center gap-2 m-0 border-none outline-none">
        🚀 一键安装
      </h2>
      <div class="flex items-center gap-2 text-sm text-gray-500">
        <span class="flex items-center gap-1"><i class="i-ri-earth-line"></i> 国际</span>
        <label class="switch">
          <input type="checkbox" v-model="isChinaRegion">
          <span class="slider round"></span>
        </label>
        <span class="flex items-center gap-1"><span class="ml-1">🇨🇳</span> 国内镜像</span>
      </div>
    </div>

    <!-- Info Alert Box -->
    <div class="info-alert p-4 rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 mb-6 flex flex-col gap-2">
      <div class="font-bold text-blue-600 dark:text-blue-400">提示</div>
      <div class="text-sm text-gray-600 dark:text-gray-300">中国大陆用户建议开启上方 🇨🇳 <b>国内镜像</b> 开关，以获得更快的下载速度。</div>
    </div>

    <!-- Code Block with Tabs -->
    <div class="tabs-container rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-dark-800 overflow-hidden">
      <!-- Tab Bar -->
      <div class="flex border-b border-gray-200 dark:border-gray-800 bg-gray-100/50 dark:bg-dark-900/50 px-2 pt-2">
        <button 
          v-for="tab in tabs" 
          :key="tab"
          @click="activeTab = tab"
          class="px-4 py-2 text-sm font-medium transition-colors relative border-none outline-none bg-transparent cursor-pointer"
          :class="activeTab === tab ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'"
        >
          <span v-if="tab === 'Docker'" class="flex items-center gap-1">
            <i class="i-ri-docker-fill text-blue-500"></i> Docker
          </span>
          <span v-else>{{ tab }}</span>
          
          <!-- Active Line -->
          <div v-if="activeTab === tab" class="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600 dark:bg-blue-400"></div>
        </button>
      </div>

      <!-- Code Content -->
      <div class="p-6 relative group">
        <div class="rounded-lg bg-white dark:bg-dark-900 border border-gray-200 dark:border-gray-800 p-4 font-mono text-sm overflow-x-auto relative">
          <div class="text-gray-400 select-none mb-1 text-xs"># {{ isChinaRegion ? '配置镜像源并' : '' }}自动安装 Node.js 和所有依赖</div>
          <div class="flex">
            <span class="text-pink-500 mr-2">{{ command.split(' ')[0] }}</span>
            <span class="text-gray-800 dark:text-gray-200">{{ command.substring(command.split(' ')[0].length).trim() }}</span>
          </div>
          
          <button @click="copyCommand" class="absolute right-2 top-2 p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity border-none cursor-pointer">
            <i class="i-ri-file-copy-line"></i>
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* Toggle Switch Styles */
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

.dark .slider {
  background-color: #4b5563;
}

input:checked + .slider {
  background-color: #3451B2;
}

input:focus + .slider {
  box-shadow: 0 0 1px #3451B2;
}

input:checked + .slider:before {
  -webkit-transform: translateX(20px);
  -ms-transform: translateX(20px);
  transform: translateX(20px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
