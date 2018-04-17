<template>
  <div class="content">

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
