<template>
  <div class="content">

    <router-link to="/" class="back-link">
      <svg viewBox="0 0 512 512" class="back-ic"><path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z"></path></svg>
      Back to home
    </router-link>

    <h5>Articles in category <span class="a-cat">{{ articleShown }}</span></h5>

    <Articles
      :articles="articles">
    </Articles>


  </div>
</template>

<script>
import {getCache} from '@/cache'
import Articles from '@/components/Articles'

const CACHE_ALL = 'articles'

export default {
  name: 'Category',
  components: {
    Articles
  },
  data () {
    return {
    }
  },
  computed: {
    articles: function () {
      return this.getListOfArticle(this.$route.params.category)
    },
    articleShown: function () {
      return this.$route.params.category
    }
  },
  methods: {
    getListOfArticle(category) {
      let data = getCache(CACHE_ALL)
      return data.filter(item => {
        return item.categories.includes(category)
      })
    }
  }
}

</script>

<style lang="scss">
@import "../assets/scss/global.scss";
.back-link{
  margin-left: -10px;
  text-decoration: none;
}
.back-ic{
  fill: #4DBA87;
  vertical-align: middle;
  width: 30px;
  height: 30px;
}
</style>
