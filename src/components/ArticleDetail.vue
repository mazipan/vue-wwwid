<template>
  <div class="a" v-if="article">
      <router-link class="c a-title" :to="'/post/' + article.slug">
        {{ article.title }}
      </router-link>

      <div class="c a-wrap">
        <span class="a-author">{{ article.author }}</span>
        <span class="a-pub">{{ article.pubDate }}</span>
      </div>

      <div class="c a-flex">
        <div class="a-img" v-if="!isFullContent">
          <img v-lazyload
              :src="'assets/icons/overlay.png'"
              :data-src="article.compressedImg"
              data-err=""
              :alt="article.title"/>
        </div>
        <div class="a-content" v-html="content"></div>
      </div>

      <div class="c a-cats">
        <router-link class="a-cat"
          v-for="cat in article.categories"
          :key="cat" :to="'/category/'+ cat">
          {{ cat }}
        </router-link>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Article',
  props: [
    'article',
    'isFullContent'
  ],
  computed: {
    content: function () {
      if (this.isFullContent) {
        return this.article.content
      } else {
        return this.article.contentView
      }
    }
  }
}
</script>
