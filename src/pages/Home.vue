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
 const REGEX_FIRST_PARAGRAPH = /<p>.*.<\/p>\n</g

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
          this.articles = data.items.map(item => {
            // get first paragraph only from content
            let a = item.content.match(REGEX_FIRST_PARAGRAPH)
            item.contentView = a[0].slice(0, -1)
                                    .replace('<p>', '<span>')
                                    .replace('</p>', '</span>')
            // get slug from link
            let b = item.link.split('/')
            item.slug = b[b.length-1]
            // get date only
            item.pubDate = item.pubDate.slice(0, 10)
            // get compressed image via cloudinary
            item.compressedImg = this.cloudinaryImage(item.thumbnail)

            return item
          })
          saveCache(CACHE_ALL, this.articles)
          this.loading = false
        })
      }
    },
    cloudinaryImage(img) {
      return `https://res.cloudinary.com/irfan-maulana/image/fetch/c_fill,g_auto:face,h_120,w_120,fl_force_strip.progressive/f_webp/${img}`
    },
  }
}
</script>
