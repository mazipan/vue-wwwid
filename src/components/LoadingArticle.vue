<template>
  <ul v-if="loading" class="l">
    <li v-for="i in [1, 2]" :key="i">
        <div class="d-title"></div>
        <div class="d-title"></div>
        <div class="d-wrap">
          <div class="d-author">
          </div>
          <div class="d-i">
          </div>
          <div class="d-pub">
          </div>
        </div>
        <div class="c a-flex">
          <div class="a-img">
            <img src="assets/icons/overlay.png" class="dummy"/>
          </div>
          <div class="a-content">
            <div class="d-text"></div>
            <div class="d-text"></div>
            <div class="d-text"></div>
            <div class="d-text"></div>
            <div class="d-text"></div>
          </div>
        </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'LoadingArticle',
  props: [
    'loading'
  ]
}
</script>
