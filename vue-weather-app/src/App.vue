<template>
  <main>
    <h1>🌤️ 城市天气预报</h1>
    <div class="cards-container">
      <!-- 复用 WeatherCard 组件 -->
      <WeatherCard
        v-for="(item, index) in cities"
        :key="index"
        :city="item.city"
        :weather="item.weather"
        :temperature="item.temperature"
        :humidity="item.humidity"
        @refresh="handleWeatherRefresh"
      />
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import WeatherCard from './components/WeatherCard.vue'

// 1. 使用 ref 定义响应式数据列表
const cities = ref([
  { city: '北京', weather: '晴朗', temperature: 26, humidity: 40 },
  { city: '上海', weather: '多云', temperature: 22, humidity: 65 },
  { city: '广州', weather: '雷阵雨', temperature: 29, humidity: 85 }
])

// 2. 模拟天气数据的方法
const mockWeatherData = (cityName) => {
  const conditions = ['晴朗', '多云', '小雨', '暴雨', '阴天']
  return {
    weather: conditions[Math.floor(Math.random() * conditions.length)],
    temperature: Math.floor(Math.random() * 15) + 20, // 20-35度之间
    humidity: Math.floor(Math.random() * 40) + 40 // 40-80%之间
  }
}

// 3. 处理子组件发出的刷新事件
const handleWeatherRefresh = (cityName) => {
  console.log(`正在刷新 ${cityName} 的天气...`)

  // 找到对应城市的索引并更新数据
  const targetIndex = cities.value.findIndex((c) => c.city === cityName)

  if (targetIndex !== -1) {
    // 模拟 API 延迟
    setTimeout(() => {
      const newData = mockWeatherData(cityName)
      // 使用 splice 确保响应式更新
      cities.value.splice(targetIndex, 1, {
        ...cities.value[targetIndex],
        ...newData
      })
      alert(`${cityName} 的天气已更新！`)
    }, 500)
  }
}
</script>

<style scoped>
main {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
  text-align: center;
  background-color: #f0f2f5;
  min-height: 100vh;
}

h1 {
  color: #2c3e50;
  margin-bottom: 30px;
}

.cards-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}
</style>