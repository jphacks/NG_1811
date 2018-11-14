<template>
    <div class="Store">
        <Titlebar />
        <div class="Title">Packs</div>

        <div class="SubTitle">あなたへのおすすめ</div>
        <div class="List">
            <div class="Pack"> </div>
        </div>

    </div>
</template>

<script>
import Titlebar from "@/components/Titlebar"

const child_process = require("child_process")
const path = require("path")

const HOMEDIR =
    process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"]

export default {
    components: {
        Titlebar
    },
    data() {
        return {}
    },
    methods: {}
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

.Title {
    font-size: 30px;
    margin: 10px;
    margin-top: 40px;
}

.SubTitle {
    font-size: 16px;
    margin: 5px;
}

.Pack {
    background: rgba(255, 255, 255, 0.438);
    width: 180px;
    height: 120px;
    border-radius: 10px;
}
</style>
