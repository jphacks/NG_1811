<template>
    <div class="LandingPage">
        <img src="@/assets/icon.svg" width="200">
        <div class="subtitle">Visual Design + Machine Learning</div>
        <div @click="openMainWindow" class="button">開く</div>
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
                titleBarStyle: "hiddenInset",
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

.subtitle {
    font-size: 20px
}

.button {
    border: 2px solid #000;
    display: inline-block;
    padding: 4px 10px;
    border-radius: 10px;
    font-size: 16px;
}
</style>
