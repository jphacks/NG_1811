<template>
    <div class="LandingPage">
        <div></div>
        <img src="@/assets/icon.svg" width="200">
        <div @click="openMainWindow">ひらく！！！</div>
    </div>
</template>

<script>
const child_process = require("child_process")
const path = require("path")
const remote = require("electron").remote

const HOMEDIR =
    process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"]

export default {
    methods: {
        openMainWindow() {
            const mainWindow = new remote.BrowserWindow({
                width: 1000,
                height: 600,
                useContentSize: true,
                titleBarStyle: "hidden",
                frame: false,
                transparent: true,
                vibrancy: "dark"
            })

            mainWindow.loadURL(location.href + "main")
        }
    }
}
</script>

<style scoped>
.LandingPage {
    text-align: center;
}
</style>
