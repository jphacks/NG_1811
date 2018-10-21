<template>
    <div class="LandingPage">
        <img src="@/assets/logo.svg" class="appicon">
        <div class="title">Eterm</div>
        <div class="subtitle">Best Terminal for Education.</div>
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
    padding: 20px;
}

.appicon {
    width: 100px;
    margin-top: 30px;
}

.title {
    margin-top: 20px;
    font-size: 28px;
}

.subtitle {
    margin-top: 8px;
    font-size: 18px;
}

.button {
    margin-top: 30px;
    /* border: 2px solid #444; */
    background: #222;
    display: inline-block;
    padding: 6px 18px;
    border-radius: 100px;
    font-size: 16px;
    cursor: pointer;
    /* color: #3390db; */
    color: #fff;
    font-weight: bold;
}
.button:hover {
    background: #555;
}
</style>
