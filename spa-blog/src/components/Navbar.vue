<template>
  <nav class="navbar">
    <div class="nav-container">
      <router-link to="/" class="nav-logo">📝 我的博客</router-link>
      <div class="nav-links">
        <router-link to="/" active-class="active">首页</router-link>
        <router-link to="/articles" active-class="active">文章列表</router-link>
        <template v-if="isLogin">
          <span class="nav-user">欢迎，用户</span>
          <button @click="handleLogout" class="btn-logout">退出</button>
        </template>
        <router-link v-else to="/login" active-class="active">登录</router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLogin = ref(!!localStorage.getItem('isLogin'))

// 监听登录状态变化（跨组件通信时可用）
watch(
  () => localStorage.getItem('isLogin'),
  (newVal) => {
    isLogin.value = !!newVal
  }
)

const handleLogout = () => {
  localStorage.removeItem('isLogin')
  isLogin.value = false
  router.push('/')
}
</script>

<style scoped>
.navbar {
  background: #42b983;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
}
.nav-logo {
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
  text-decoration: none;
}
.nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}
.nav-links a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background 0.3s;
}
.nav-links a:hover,
.nav-links a.active {
  background: rgba(255,255,255,0.2);
}
.nav-user {
  color: white;
}
.btn-logout {
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}
.btn-logout:hover {
  background: #ff5252;
}
</style>