<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// in renderer process
import { webFrame } from "electron"

// fix zoom at 100%
webFrame.setVisualZoomLevelLimits(1, 1)

export default {
    name: "eterm"
}
</script>

<style>
body {
    margin: 0;
}

#app {
    font-family: Menlo, "DejaVu Sans Mono", Consolas, "Lucida Console",
        monospace, -apple-system, BlinkMacSystemFont, "Helvetica Neue",
        "Yu Gothic", YuGothic, "ヒラギノ角ゴ ProN W3", Hiragino Kaku Gothic ProN,
        Arial, "メイリオ", Meiryo, sans-serif;
        /* font-weight: bold;  */
    -webkit-user-select: none;
    font-size: 12px;
}
</style>


