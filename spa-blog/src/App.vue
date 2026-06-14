<template>
  <div id="app">
    <!-- 顶部导航栏 -->
    <nav class="navbar">
      <div class="container">
        <router-link to="/" class="logo">My SPA Blog</router-link>
        <div class="nav-links">
          <router-link to="/">首页</router-link>
          <router-link to="/articles">文章列表</router-link>
          <!-- 这里可以根据登录状态显示“登录”或“退出”，暂时先写死链接用于测试 -->
          <router-link to="/login">登录</router-link>
        </div>
      </div>
    </nav>

    <!-- 路由视图：页面内容在这里切换 -->
    <main class="main-content container">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
// 注意：这里不需要再 import HelloWorld 了
</script>

<style>
/* 简单的全局样式重置 */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  background-color: #f4f4f4;
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 导航栏样式 */
.navbar {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  height: 60px;
  display: flex;
  align-items: center;
}

.navbar .container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: #2c3e50;
}

.nav-links a {
  margin-left: 20px;
  text-decoration: none;
  color: #666;
  font-weight: 500;
}

.nav-links a.router-link-active,
.nav-links a:hover {
  color: #42b983; /* Vue Green */
}

.main-content {
  padding-top: 40px;
  min-height: calc(100vh - 60px);
}

/* 页面切换动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>