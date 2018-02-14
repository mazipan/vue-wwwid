<template>
  <div class="content">
    <ul v-if="loading">
      <li v-for="i in [1, 2, 3]" :key="i">
          <div class="a-img">
            <img v-lazy="'assets/icons/overlay.png'" class="dummy"/>
          </div>
          <div class="a-title c">
            {{ dummy.title }}
          </div>
          <div class="c a-wrap">
            <span class="a-author">
              {{ dummy.author }}
            </span>
            <span class="a-pub">
              {{ dummy.pubDate }}
            </span>
          </div>
          <div class="a-content c">
            {{ dummy.desc }}
          </div>
      </li>
    </ul>

    <ul v-if="!loading">
      <li v-for="article in articles"
          :key="article.guid" @click="seeDetail(article.slug)">

          <div class="a-img">
            <img v-lazy="article.thumbnail" />
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
import {ArticleDummy} from '@/data/dummy'

export default {
  name: 'Home',
  data() {
    return {
      loading: true,
      dummy: ArticleDummy,
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
