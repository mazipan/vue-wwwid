<template>
  <div class="vue-wwwid">
    <header class="header">
      <router-link to="/" alt="Vue-WWWID" v-if="isHome">
        <h1>Vue-WWWID</h1>
      </router-link>
      <router-link to="/" alt="Back Home" v-if="!isHome">
        <svg
              aria-labelledby="title" role="img"
              viewBox="0 0 512 512"
              class="back-ic">
        <title>Back Home Link</title>
        <path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z"></path>
        </svg>
      </router-link>
      <div>
          <a href="https://github.com/mazipan/vue-wwwid"
             target="_blank" rel="noopener" alt="Link to Github">
            <span class="back-ic">Github</span>
          </a>
      </div>
    </header>

    <router-view></router-view>

  </div>
</template>

<script>
export default {
  name: 'app',
  created () {
    document.getElementsByClassName('header-dummy')[0].remove();
  },
  computed: {
    isHome() {
      return this.$route.path === '/'
    }
  }
}
</script>
