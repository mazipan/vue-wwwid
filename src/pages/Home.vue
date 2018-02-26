<template>
  <div class="content">

    <LoadingArticle
      :loading="loading">
    </LoadingArticle>

    <ul v-if="!loading">
      <li v-for="article in articles"
          :key="article.guid" @click="seeDetail(article.slug)">

          <div class="a-img">
            <img v-lazy="article.thumbnail" :alt="article.title" />
          </div>

          <div class="a-title c">{{ article.title }}</div>

          <div class="c a-wrap">
            <span class="a-author">{{ article.author }}</span>
            <span class="a-pub">{{ article.pubDate }}</span>
          </div>

          <div class="a-content c" v-html="article.contentView"></div>

      </li>
    </ul>

  </div>
</template>

<script>
const API_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2Fwwwid'
const CACHE_ALL = 'articles'
const CACHE_ONE = 'article'

import {getCache, saveCache} from '@/cache'
import LoadingArticle from '@/components/LoadingArticle'

export default {
  name: 'Home',
  components: {
    LoadingArticle
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
    },
    seeDetail(slug) {
      let data = this.articles.filter(item => {
        return item.slug === slug
      })
      console.log('detail', data)
      if (data.length > 0) {
        saveCache(CACHE_ONE, data[0])
        this.$router.push(`/post/${data[0].slug}`)
      }
    }
  }
}
</script>

<style lang="scss">
@import "../assets/scss/global.scss";

</style>
