<template>
  <div id="app">
    <Titlebar />
    <router-view></router-view>
  </div>
</template>

<script>
import Titlebar from "@/components/Titlebar"

// in renderer process
import { webFrame } from "electron"

// fix zoom at 100%
webFrame.setVisualZoomLevelLimits(1, 1)

export default {
    components: {
        Titlebar
    },
    name: "eterm"
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


