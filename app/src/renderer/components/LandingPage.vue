<template>
    <div class="LandingPage">
        <img src="@/assets/icon.svg" class="appicon">
        <div class="title">Eterm</div>
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


            const window = remote.getCurrentWindow()
            window.close()
        }
    }
}
</script>

<style scoped>
.LandingPage {
    text-align: center;
}

.appicon {
    width: 120px;
    margin-top: 50px;
    margin-bottom: 10px;
}
.title {
    font-size: 30px;
    font-weight: bold;
}
.subtitle {
    margin-top: 10px;
    font-size: 18px;
}

.button {
    /* border: 2px solid #444; */
    display: inline-block;
    padding: 4px 10px;
    border-radius: 10px;
    font-size: 20px;
    cursor: pointer;
    margin-top: 30px;
    color: #3390db;
    font-weight: bold;
}
</style>
