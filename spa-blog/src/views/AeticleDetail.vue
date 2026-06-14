<template>
  <div class="article-detail">
    <div v-if="loading" class="loading">
      加载中...
    </div>
    <div v-else-if="!article" class="not-found">
      <h2>文章不存在</h2>
      <router-link to="/articles" class="btn-back">← 返回文章列表</router-link>
    </div>
    <article v-else class="content">
      <router-link to="/articles" class="btn-back">← 返回</router-link>
      <h1>{{ article.title }}</h1>
      <div class="meta">
        <span>发布于 {{ article.date }}</span>
      </div>
      <div class="article-body">
        <p>{{ article.content }}</p>
      </div>
    </article>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const article = ref(null)
const loading = ref(false)

// 模拟文章数据（实际从 API 获取）
const mockArticles = {
  1: {
    id: 1,
    title: 'Vue 3 组合式 API 入门指南',
    date: '2026-06-01',
    content: 'Vue 3 引入了组合式 API（Composition API），它提供了一种更灵活、更强大的方式来组织和复用组件逻辑。相比选项式 API，组合式 API 让相关逻辑可以组织在一起，而不是分散在不同的选项中。核心 API 包括 ref、reactive、computed、watch 等。通过 setup 函数或 <script setup> 语法糖，我们可以更直观地编写组件逻辑。'
  },
  2: {
    id: 2,
    title: 'Vue Router 4 路由守卫详解',
    date: '2026-05-28',
    content: 'Vue Router 提供了多种导航守卫：全局前置守卫 beforeEach、全局解析守卫 beforeResolve、全局后置钩子 afterEach，以及路由独享守卫和组件内守卫。守卫函数接收 to、from、next 三个参数，通过 next() 控制导航流程。常见用途包括权限验证、页面标题设置、数据预加载等。'
  },
  3: {
    id: 3,
    title: 'SPA 应用的性能优化技巧',
    date: '2026-05-25',
    content: 'SPA 性能优化可以从多个维度入手：路由懒加载减少首屏体积、组件缓存（keep-alive）避免重复渲染、图片懒加载、代码分割、预加载关键资源、使用 CDN 等。同时要注意内存泄漏问题，及时清理定时器和事件监听器。'
  }
}

// 根据路由参数加载文章
const loadArticle = async (id) => {
  loading.value = true
  // 模拟网络请求延迟
  await new Promise(resolve => setTimeout(resolve, 300))
  article.value = mockArticles[id] || null
  loading.value = false
}

// 组件挂载时加载文章
onMounted(() => {
  const id = route.params.id
  if (!id) {
    router.push('/articles')
    return
  }
  loadArticle(id)
})

// 监听路由参数变化（解决同组件复用时的参数更新问题）
watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      loadArticle(newId)
    }
  }
)
</script>

<style scoped>
.article-detail {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}
.loading, .not-found {
  text-align: center;
  padding: 3rem 0;
  color: #666;
}
.btn-back {
  display: inline-block;
  color: #42b983;
  text-decoration: none;
  margin-bottom: 1.5rem;
}
.btn-back:hover {
  text-decoration: underline;
}
.content h1 {
  color: #2c3e50;
  margin-bottom: 1rem;
}
.meta {
  color: #999;
  margin-bottom: 2rem;
}
.article-body {
  line-height: 1.8;
  color: #333;
}
.article-body p {
  margin-bottom: 1rem;
}
</style>