<template>
  <div class="content">

    <router-link to="/" class="back-link">
      <svg viewBox="0 0 512 512" class="back-ic"><path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z"></path></svg>
      Back to home
    </router-link>

    <ul v-if="loading">
      <li>
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
      <li>
          <div class="a-title c">{{ article.title }}</div>

          <div class="c a-wrap">
            <span class="a-author">{{ article.author }}</span>
            <span class="a-pub">{{ article.pubDate }}</span>
          </div>

          <div class="a-content c" v-html="article.content"></div>
      </li>
    </ul>
  </div>
</template>

<script>
const CACHE_ONE = 'article'
import {getCache} from '@/cache'
import {ArticleDummy} from '@/data/dummy'

export default {
  name: 'Detail',
  data () {
    return {
      loading: true,
      dummy: ArticleDummy,
      article: {}
    }
  },
  activated () {
    this.getDetailData()
  },
  methods: {
    getDetailData () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        let data = getCache(CACHE_ONE)
        if (data) {
          this.article = data
        } else {
          this.$router.push(`/`)
        }
      }, 1000)
    }
  }
}

</script>

<style lang="scss">
@import "../assets/scss/global.scss";
figure{
  img {
    width: 100%;
    height: auto;
  }
}
figcaption{
  font-style: italic;
  text-align: center;
  color: #ccc;
}
.back-link{
  text-decoration: none;
}
.back-ic{
  fill: #4DBA87;
  vertical-align: middle;
  width: 30px;
  height: 30px;
}
</style>
