<template>
    <div class="Store">
        <!-- <Titlebar /> -->
        
        <Bottombar :blocks="candidate" @inputBlock="inputBlock" />

    </div>
</template>

<script>
import Titlebar from "@/components/Titlebar"
import Bottombar from "@/components/Bottombar"
import ML from "@/components/ML"

const child_process = require("child_process")
const path = require("path")

const HOMEDIR =
    process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"]

// レンダラープロセスでやりとりするipcRenderer
const { ipcRenderer } = require("electron")

export default {
    components: {
        Titlebar,
        Bottombar,
        ML
    },
    data() {
        return {
            candidate: []
        }
    },
    created() {
        // 受信処理
        ipcRenderer.on("candidateList", (event, list) => {
            // "ping"が出力される
            this.candidate = list
            // console.log("a", list)
        })
    },
    methods: {
        inputBlock(block) {
            // 非同期
            ipcRenderer.send("inputBlock", block)
        }
    }
}
</script>

<style scoped>
.Store {
    background: rgba(0, 0, 0, 0.384);
    font-family: "Helvetica Neue";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    color: white;
    user-select: none;
    cursor: default;
}
</style>
