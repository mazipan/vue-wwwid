<template>
  <div class="content">

    <ArticleDetail
      :article="article"
      :isFullContent="true">
    </ArticleDetail>

  </div>
</template>

<script>
import {getCache} from '@/cache'
import ArticleDetail from '@/components/ArticleDetail'

const CACHE_ALL = 'articles'

export default {
  name: 'Detail',
  components: {
    ArticleDetail
  },
  data () {
    return {
    }
  },
  computed: {
    article: function () {
      return this.getDetailData(this.$route.params.slug)
    }
  },
  methods: {
    getDetailData (slug) {
      let data = getCache(CACHE_ALL)
      return data.filter(item => {
        return item.slug.indexOf(slug) >= 0
      })[0]
    }
  }
}

</script>
