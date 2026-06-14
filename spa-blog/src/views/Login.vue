<template>
  <div class="login">
    <div class="login-form">
      <h1>用户登录</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">用户名</label>
          <input
            id="username"
            v-model="form.username"
            type="text"
            placeholder="请输入用户名"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            required
          />
        </div>
        <div v-if="error" class="error">{{ error }}</div>
        <button type="submit" class="btn-submit" :disabled="loading">
          {{ loading ? '登录中...' : '登录' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const form = ref({
  username: '',
  password: ''
})
const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
  // 简单表单验证
  if (!form.value.username || !form.value.password) {
    error.value = '请输入用户名和密码'
    return
  }

  loading.value = true
  error.value = ''

  // 模拟登录请求（实际项目中调用 API）
  try {
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // 模拟登录成功
    localStorage.setItem('isLogin', 'true')
    
    // 登录成功后跳转到原本想访问的页面，或默认首页
    const redirect = route.query.redirect || '/'
    router.push(redirect)
  } catch (err) {
    error.value = '登录失败，请重试'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 4rem auto;
  padding: 0 1rem;
}
.login-form {
  padding: 2rem;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.login-form h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
}
.form-group {
  margin-bottom: 1.5rem;
}
.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
}
.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
}
.form-group input:focus {
  outline: none;
  border-color: #42b983;
}
.error {
  color: #ff6b6b;
  margin-bottom: 1rem;
  text-align: center;
}
.btn-submit {
  width: 100%;
  padding: 0.75rem;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}
.btn-submit:hover:not(:disabled) {
  background: #3aa876;
}
.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>