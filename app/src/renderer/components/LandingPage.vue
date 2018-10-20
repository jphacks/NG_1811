<template>
    <div class="LandingPage">
        <div class="title">ようこそ、Etermへ</div>
        <img src="@/assets/icon.svg" class="appicon">
        <div class="subtitle">ここに何か説明を</div>
        <div @click="openMainWindow" class="button">はじめる</div>
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
    font-family: "Helvetica Neue";
    -webkit-user-select: none;
    cursor: default;
}

.appicon {
    width: 120px;
    margin-top: 50px;
    margin-bottom: 10px;
}
.title {
    font-size: 16px;
    font-weight: bold;
}
.subtitle {
    margin-top: 20px;
    font-size: 30px;
}

.button {
    /* border: 2px solid #444; */
    background: #222;
    display: inline-block;
    padding: 6px 18px;
    border-radius: 100px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 30px;
    /* color: #3390db; */
    color: #fff;
    font-weight: bold;
}
.button:hover {
    background: #555;
}
</style>
