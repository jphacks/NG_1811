<template>
    <div class="Formula">
        <div v-for="(block, i) of value" class="Block">
            <!-- <Editable value="" :writable="writable" /> -->
            <Phrase
                v-if="block.type == 'command'"
                type="command"
                class="command"
                :val="block.val"
                @drop="drop"
                :clickable="clickable"
                @focus="focus"
                
            />
            <Phrase
                v-else-if="block.type == 'option'"
                type="option"
                class="option"
                :val="block.val"
                :class="{optionwith: i>0&&value[i-1]!=undefined}"
                @drop="drop"
                :clickable="clickable"
                @focus="focus"
                :style="{'z-index': 99-i}"
            />
            <Phrase
                v-else-if="block.type == 'redirect'"
                type="redirect"
                class="redirect"
                :val="block.val"
                @drop="drop"
                :clickable="clickable"
                :class="{optionwith: i>0&&value[i-1]!=undefined}"
                @focus="focus"
                :style="{'z-index': 99-i}"
                
            />
            <Arg
                v-else-if="block.type == 'arg'"
                type="option"
                class="option"
                v-model="block.val"
                :placeholder="block.placeholder"
                :writable="writable"
                :class="{optionwith: i>0&&value[i-1]!=undefined}"
                @drop="drop"
                :clickable="clickable"
                @focus="focus"
                :style="{'z-index': 99-i}"
                @send="send"
            />
            <Pipe
                v-else-if="block.type == 'pipe'"
                :writable="writable"
                @drop="drop"
                :clickable="clickable"
                :style="{'z-index': 99-i}"
            />
        </div>
        <Editable
            cv-if="writable"
            :writable="writable"
            endEditable="true"
            ref="endEditable"
            v-model="text"
            @inputBlock="inputBlock"
            @deleteBlock="deleteBlock"
            @send="send"
            @y="y"
        />
    </div>
</template>

<script>
import Phrase from "@/components/Formula/Phrase"
import Arg from "@/components/Formula/Arg"
import Editable from "@/components/Formula/Editable"
import Pipe from "@/components/Formula/Pipe"

export default {
    components: {
        Phrase,
        Arg,
        Editable,
        Pipe
    },
    props: ["value", "writable", "clickable"],
    data() {
        return {
            args: ["ls"],
            text: ""
        }
    },
    methods: {
        send() {
            // console.log(this.text)
            this.text = ""

            this.$emit("send")
        },
        focus() {
            if (this.$refs.endEditable) {
                this.$nextTick(() => this.$refs.endEditable.$el.focus())
            }
        },
        inputBlock(block) {
            // console.log(this.$refs.endEditable.$refs.ediv.getBoundingClientRect())

            if (block.type == "phrase") {
                if (
                    this.value.length == 0 ||
                    this.value[this.value.length - 1].type == "pipe"
                ) {
                    block.type = "command"
                } else {
                    block.type = "option"
                }
            }
            // console.log(block)
            this.value.push(block)
        },
        deleteBlock(e) {
            this.value.splice(this.value.length - 1, 1)
        },
        drop() {
            this.$emit("drop")
        },
        y(r) {
            this.$emit("y", r)
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

.optionwith {
    margin-left: -20px;
    padding-left: 18px;
}
</style>
