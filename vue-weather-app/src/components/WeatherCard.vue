<template>
  <div class="card">
    <div class="card-header">
      <h2>{{ city }}</h2>
      <!-- 点击按钮触发 refresh 事件 -->
      <button @click="handleRefresh" class="refresh-btn">刷新天气</button>
    </div>

    <div class="card-body">
      <div class="weather-info">
        <span class="icon">🌤️</span>
        <div class="details">
          <p class="condition">{{ weather }}</p>
          <!-- 显示计算属性转换后的温度 -->
          <p class="temp">{{ displayTemp }}°{{ unit }}</p>
        </div>
      </div>

      <div class="extra-info">
        <p>湿度: {{ humidity }}%</p>
        <!-- 切换温度单位 -->
        <button @click="toggleUnit" class="unit-toggle">
          切换为 {{ unit === 'C' ? '℉' : '℃' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

// 1. 定义 Props 接收父组件数据
const props = defineProps({
  city: { type: String, required: true },
  weather: { type: String, required: true },
  temperature: { type: Number, required: true }, // 默认接收摄氏度
  humidity: { type: Number, required: true }
})

// 2. 定义 Emits 向父组件发送事件
const emit = defineEmits(['refresh'])

// 3. 内部状态：用于切换温度单位 (C / F)
const unit = ref('C')

// 4. 计算属性：根据 unit 状态计算显示的温度
const displayTemp = computed(() => {
  if (unit.value === 'C') {
    return props.temperature
  } else {
    // 华氏度转换公式：F = C * 1.8 + 32
    return Math.round(props.temperature * 1.8 + 32)
  }
})

// 方法：切换单位
const toggleUnit = () => {
  unit.value = unit.value === 'C' ? 'F' : 'C'
}

// 方法：处理刷新点击，向父组件发送事件
const handleRefresh = () => {
  emit('refresh', props.city)
}
</script>

<style scoped>
.card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 300px;
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-5px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 15px;
}

.card-header h2 {
  margin: 0;
  color: #333;
  font-size: 1.5rem;
}

.refresh-btn {
  background: #42b983;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
}

.refresh-btn:hover {
  background: #3aa876;
}

.weather-info {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.icon {
  font-size: 3rem;
  margin-right: 15px;
}

.temp {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.condition {
  margin: 0;
  color: #666;
  text-transform: capitalize;
}

.extra-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #888;
  font-size: 0.9rem;
}

.unit-toggle {
  background: none;
  border: 1px solid #ddd;
  padding: 2px 6px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.75rem;
}
</style>