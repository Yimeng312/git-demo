<template>
  <div class="home">
    <h1>欢迎来到我的博客</h1>
    <p>这是一个基于 Vue 3 和 Vue Router 构建的 SPA 博客系统。</p>
    <div class="home-actions">
      <router-link to="/articles" class="btn-primary">浏览文章</router-link>
    </div>
  </div>
</template>

<script setup>
// 首页无需额外逻辑
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 3rem auto;
  text-align: center;
  padding: 2rem;
}
.home h1 {
  color: #2c3e50;
  margin-bottom: 1rem;
}
.home p {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 2rem;
}
.btn-primary {
  display: inline-block;
  background: #42b983;
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.3s;
}
.btn-primary:hover {
  background: #3aa876;
}
</style>