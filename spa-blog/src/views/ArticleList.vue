<template>
  <div class="article-list">
    <h1>文章列表</h1>
    <div v-if="articles.length === 0" class="empty">
      暂无文章
    </div>
    <ul class="list">
      <li v-for="article in articles" :key="article.id" class="list-item">
        <!-- 使用 router-link 跳转，避免页面刷新 -->
        <router-link :to="`/article/${article.id}`" class="article-link">
          <h3>{{ article.title }}</h3>
          <p class="excerpt">{{ article.excerpt }}</p>
          <span class="meta">发布于 {{ article.date }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 模拟文章数据（实际项目中从 API 获取）
const articles = ref([])

// 模拟数据加载
const loadArticles = () => {
  articles.value = [
    {
      id: 1,
      title: 'Vue 3 组合式 API 入门指南',
      excerpt: '本文介绍 Vue 3 中组合式 API 的基本用法和优势...',
      date: '2026-06-01',
      content: '这里是 Vue 3 组合式 API 的详细内容...'
    },
    {
      id: 2,
      title: 'Vue Router 4 路由守卫详解',
      excerpt: '深入理解 Vue Router 的各种导航守卫及其应用场景...',
      date: '2026-05-28',
      content: '这里是 Vue Router 路由守卫的详细内容...'
    },
    {
      id: 3,
      title: 'SPA 应用的性能优化技巧',
      excerpt: '从路由懒加载到组件缓存，全面提升 SPA 性能...',
      date: '2026-05-25',
      content: '这里是 SPA 性能优化的详细内容...'
    }
  ]
}

onMounted(() => {
  loadArticles()
})
</script>

<style scoped>
.article-list {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}
.article-list h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
}
.empty {
  text-align: center;
  color: #999;
  padding: 3rem 0;
}
.list {
  list-style: none;
  padding: 0;
}
.list-item {
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  transition: box-shadow 0.3s;
}
.list-item:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.article-link {
  text-decoration: none;
  color: inherit;
  display: block;
}
.article-link h3 {
  color: #42b983;
  margin: 0 0 0.5rem 0;
}
.article-link:hover h3 {
  color: #3aa876;
}
.excerpt {
  color: #666;
  margin: 0.5rem 0;
  line-height: 1.6;
}
.meta {
  color: #999;
  font-size: 0.875rem;
}
</style>