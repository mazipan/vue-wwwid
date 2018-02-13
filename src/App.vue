<template>
  <div class="vue-wwwid">

    <header class="header">
      <h1>Vue-WWWID</h1>
    </header>

    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <footer class="footer">
      Copyright © 2018 by Irfan Maulana
    </footer>

  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
body{
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
  color: #282828;
  font-size: 100%;
}
a{
  color: #4DBA87;
}
a:hover{
  color: #4DBA87;
}
.header{
  width: 100%;
  background-color: #4DBA87;
  color: #fff;
  height: 60px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
}
h1{
  margin: 0;
  margin-left: .3em;
  font-size: 1.5em;
}
.footer{
  width: 100%;
  background-color: #4DBA87;
  color: #fff;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: .5em;
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>
