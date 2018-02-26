<template>
  <div class="content">

    <LoadingArticle
      :loading="loading">
    </LoadingArticle>

    <Articles
      :articles="articles"
      v-if="!loading">
    </Articles>

  </div>
</template>

<script>
const API_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2Fwwwid'
const CACHE_ALL = 'articles'
const CACHE_ONE = 'article'

import {getCache, saveCache} from '@/cache'
import LoadingArticle from '@/components/LoadingArticle'
import Articles from '@/components/Articles'

export default {
  name: 'Home',
  components: {
    LoadingArticle,
    Articles
  },
  data() {
    return {
      loading: true,
      articles: []
    }
  },
  mounted () {
    this.fetchArtciles()
  },
  methods: {
    fetchArtciles() {
      this.loading = true
      let data = getCache(CACHE_ALL)
      if (data) {
        this.articles = data
        this.loading = false
      } else {
        fetch(API_URL)
        .then(resp => resp.json())
        .then(data => {
          const REGEX = /<p>.*.<\/p>\n</g
          this.articles = data.items.map(item => {
            let a = item.content.match(REGEX)
            item.contentView = a[0].slice(0, -1)
            let b = item.link.split('/')
            item.slug = b[b.length-1]
            return item
          })
          saveCache(CACHE_ALL, this.articles)
          this.loading = false
        })
      }
    }
  }
}
</script>

<style lang="scss">
@import "../assets/scss/global.scss";
</style>
