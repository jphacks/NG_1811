<template>
    <div class="App">
        <div @click="openMainWindow">ひらく！！！</div>
    </div>
</template>

<script>
const child_process = require("child_process")
const path = require("path")
const remote = require('electron').remote;


const HOMEDIR =
    process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"]

export default {
    methods: {
        openMainWindow() {
            const mainWindow = new remote.BrowserWindow({
                height: 563,
                useContentSize: true,
                width: 1000
            })

            mainWindow.loadURL(location.href + "main")
        }
    }
}
</script>

<style scoped>
.App {
    font-family: Menlo, "DejaVu Sans Mono", Consolas, "Lucida Console",
        monospace, -apple-system, BlinkMacSystemFont, "Helvetica Neue",
        "Yu Gothic", YuGothic, "ヒラギノ角ゴ ProN W3", Hiragino Kaku Gothic ProN,
        Arial, "メイリオ", Meiryo, sans-serif;
    background: none;
    -webkit-user-select: none;
    font-size: 12px;
}
</style>
