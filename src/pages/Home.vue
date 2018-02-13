<template>
  <div class="home">
    <ul>
      <li v-for="article in articles"
          :key="article.guid">
          <span class="a-author">{{ article.author }}</span>
          <span class="a-pub">on {{ article.pubDate }}</span>
          <div class="a-title c">{{ article.title }}</div>
          <div class="a-content c" v-html="article.contentView"></div>
      </li>
    </ul>
  </div>
</template>

<script>
const API_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2Fwwwid'
export default {
  name: 'Home',
  data() {
    return {
      articles: []
    }
  },
  mounted () {
    this.fetchArtciles()
  },
  methods: {
    fetchArtciles() {
      const REGEX = /<p>.*.<\/p>\n</g
      fetch(API_URL)
        .then(resp => resp.json())
        .then(data => {
          this.articles = data.items.map(item => {
            let a = item.content.match(REGEX)
            item.contentView = a[0].slice(0, -1)
            return item
          })
        })
    }
  }
}
</script>

<style>
.home{
  margin-top: 70px;
}
ul{
  margin: 0;
  padding: 0;
  list-style: none;
}
li{
  border: 0;
  border-bottom: 1px solid #e2d6d6;
  padding: 1em .3em;
}
.c::after {
    content: "";
    clear: both;
    display: table;
}
.a-title{
  margin: .5em 0;
  font-size: 1em;
}
.a-author, .a-pub{
  color: #ccc;
  font-size: .7em;
}
.a-content{
  font-size: .7em;
  color: #6d6565;
}
</style>
