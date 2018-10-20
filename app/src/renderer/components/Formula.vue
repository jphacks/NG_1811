<template>
    <div class="Formula" @keydown.enter="send">
        <div v-for="(block, i) of value" class="Block">
            <!-- <Editable value="" :writable="writable" /> -->
            <Phrase
                v-if="block.type == 'command'"
                :isOption="false"
                class="command"
                :val="block.val"
                v-model="block.args"
                :writable="writable"
                draggable="true"
                @dragenter="dragStart(card, $event)"
            />
            <Phrase
                v-else-if="block.type == 'option'"
                :isOption="true"
                class="option"
                :val="block.val"
                v-model="block.args"
                :writable="writable"
                :style="{'z-index': 99-i}"
                :class="{optionwith: i>0&&value[i-1]!=undefined}"
            />
            <Pipe
                v-else-if="block.type == 'pipe'"
                :writable="writable"
                draggable="true"
            />
        </div>
        <Editable :v-if="writable" :writable="writable" value="" ref="endEditable" v-model="text" @inputBlock="inputBlock" @deleteBlock="deleteBlock" />
    </div>
</template>

<script>
import Phrase from "@/components/Formula/Phrase"
import Editable from "@/components/Formula/Editable"
import Pipe from "@/components/Formula/Pipe"

export default {
    components: {
        Phrase,
        Editable,
        Pipe
    },
    props: ["value", "writable"],
    data() {
        return {
            args: ["ls"],
            text: ""
        }
    },
    methods: {
        send() {
            console.log(this.text)
            this.text = ""

            this.$emit("send")
        },
        focus() {
            if (this.$refs.endEditable) {
                this.$nextTick(() => this.$refs.endEditable.$el.focus())
            }
        },
        dragStart() {
            console.log("dragstart")
        },
        inputBlock(block) {
            if (block.type == "phrase") {
                if (this.value.length == 0 || this.value[this.value.length - 1].type == "pipe") {
                    block.type = "command"
                } else {
                    block.type = "option"
                }
            }
            console.log(block)
            this.value.push(block)
        },
        deleteBlock(e) {
            this.value.splice(this.value.length - 1, 1)
        }
    }
}
</script>


<style scoped>
.Formula {
    display: inline-block;
    vertical-align: middle;
}
.Block {
    display: inline-block;
    margin-right: 5px;
    vertical-align: middle;
}

.command {
    z-index: 100;
}
.optionwith {
    margin-left: -17px;
    padding-left: 18px;
}
</style>
