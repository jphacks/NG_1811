<template>
    <div class="Hint" ref="container">
        <div class="item">
            <div>
                <div class="block" @click="inputBlock(block)" v-for="block of candidate">
                    <Block
                        :type="block.type"
                        v-model="block.val"
                        :placeholder="block.placeholder"
                        :clickable="true"
                        draggable
                        @dragend="inputBlock(block)"
                    />
                </div>
            </div>
            <div>
                <div class="description" v-for="block of candidate" @click="inputBlock(block)">{{block.description}}</div>
            </div>
            <div v-if="candidate.length == 0">
                候補がありません
            </div>
        </div>
    </div>
</template>

<script>
import Block from "@/components/Block"

const child_process = require("child_process")
const path = require("path")
const { ipcRenderer } = require("electron")

export default {
    components: {
        Block
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

<style scoped>
.Hint {
    /* margin-top: 10px; */
    /* box-shadow: 0px 9px 34px -6px #030303; */
    background: rgba(0, 0, 0, 0.2);
    color: rgb(255, 255, 255);
    /* border: 1px solid #222; */
    border-radius: 5px;
    display: inline-block;
}

.item {
    margin: 1px;
    /* background: rgba(255, 255, 255, 0.11); */
    /* display: inline-block; */
    /* height: 26px; */
    /* justify-content: space-between; */
    line-height: 26px;
    display: flex;
    flex-direction: row;
    flex-wrap: no-wrap;
    padding: 3px 3px;
    max-height: 180px;
    overflow-y: scroll;
}

.block {
    height: 28px;
    padding-right: 5px;
    /* text-align: right; */
    /* padding-left: 1px; */
}
.description {
    height: 28px;
    white-space: nowrap;
    background: rgba(255, 255, 255, 0.14);
    padding: 0 4px;
}
.description:first-child {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}
.description:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}
</style>
