<template>
  <div id="app">
    <Titlebar />
    <router-view></router-view>
  </div>
</template>

<script>
import Titlebar from "@/components/Titlebar"

export default {
  components: {
    Titlebar
  },
  name: 'Eterm'
}
</script>

<style>
#app {
    font-family: Menlo, "DejaVu Sans Mono", Consolas, "Lucida Console",
        monospace, -apple-system, BlinkMacSystemFont, "Helvetica Neue",
        "Yu Gothic", YuGothic, "ヒラギノ角ゴ ProN W3", Hiragino Kaku Gothic ProN,
        Arial, "メイリオ", Meiryo, sans-serif;
    background: none;
    -webkit-user-select: none;
    font-size: 12px;
}
</style>


