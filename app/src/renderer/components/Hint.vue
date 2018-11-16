<template>
    <div class="Hint" ref="container">
        <div class="item" v-for="block of candidate">
            <span class="block" @click="inputBlock(block)">
                <Formula :value="[block]" @drop="inputBlock(block)" clickable="true" />
            </span>
            <span class="description">{{block.description}}</span>
        </div>
        <div class="item" v-if="candidate.length == 0">
            候補がありません
        </div>
    </div>
</template>

<style scoped>
.Hint {
    /* margin-top: 10px; */
    /* box-shadow: 0px 9px 34px -6px #030303; */
    background: rgb(26, 26, 26);
    color: rgb(255, 255, 255);
    padding: 0 7px;
    /* border: 1px solid #222; */
    border-radius: 5px;
    display: inline-block;
}

.item {
    margin: 1px;
    /* background: rgba(255, 255, 255, 0.11); */
    /* display: inline-block; */
    margin: 6px 2px;
    height: 26px;
    line-height: 26px;
    display: flex;
    flex-direction: row;
    flex-wrap: no-wrap;
}

.block {
}
.description {
    margin-left: -6px;
    white-space: nowrap;
}

</style>

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
        ipcRenderer.on("candidateList", (event, list) => {
            this.candidate = list
            this.$nextTick(() => {
                this.sendSize()
            })
        })
    },
    methods: {
        inputBlock(block) {
            ipcRenderer.send("inputBlock", block)
        },
        sendSize() {
            const container = this.$refs.container
            // console.log("rec", rect)

            ipcRenderer.send("setSubWindowSize", {
                width: container.clientWidth,
                height: container.clientHeight
            })
        }
    }
}
</script>
