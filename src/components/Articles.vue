<template>
  <ul>
      <li v-for="article in articles"
          :key="article.guid">

          <ArticleDetail
            :article="article"
            :isFullContent="false">
          </ArticleDetail>

      </li>
    </ul>
</template>

<script>
import ArticleDetail from '@/components/ArticleDetail'

export default {
  name: 'Articles',
  components: {
    ArticleDetail
  },
  props: [
    'articles'
  ]
}
</script>
