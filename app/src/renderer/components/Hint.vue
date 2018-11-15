<template>
    <div class="Bottomber" astyle="{ top: suggestY.y + 28 + 'px', left: suggestY.x - 16 + 'px' }">
            
        <div class="item" v-for="block of candidate">
            <span class="block" @click="inputBlock(block)">
                <Formula :value="[block]" @drop="inputBlock(block)" clickable="true" />
            </span>
            <span class="description">{{block.description}}</span>
        </div>
    </div>
</template>

<script>
import Formula from "@/components/Formula"

const child_process = require("child_process")
const path = require("path")
const { ipcRenderer } = require("electron")

export default {
    components: {
        Formula
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
.Bottomber {
    /* box-shadow: 0px 9px 34px -6px #030303; */
    /* background: rgba(49, 49, 49, 0.884); */
    padding: 0 7px;
    /* border: 1px solid #222; */
    border-radius: 5px;
}

.block {
    float: left;
}
.description {
    display: inline-block;
}

.item {
    margin: 1px;
    color: white;
    /* background: rgba(255, 255, 255, 0.11); */
    /* display: inline-block; */
    margin: 6px 2px;
    height: 26px;
    line-height: 26px;
}
</style>
