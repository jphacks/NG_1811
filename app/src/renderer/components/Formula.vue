<template>
    <div class="Formula">
        $ <div v-for="(block, i) of value" class="Block">
            <Block
                :type="block.type"
                v-model="block.val"
                :placeholder="block.placeholder"
                :writable="writable"
                :class="{
                    optionwith: block.type.match(/option|arg|text/)&&i>0&&value[i-1].type!='pipe'&&value[i-1]!=undefined
                }"
                :style="{'z-index': 99-i}"
                @focus="focus"
                @send="send"
            />
        </div><div class="Block">
            <Block
                v-if="writable"
                type="last"
                :writable="writable"
                v-model="text"
                :class="{
                    optionwith: value.length>0&&value[value.length-1].type!='pipe'
                }"
                :style="{'z-index': 0}"
                endEditable="true"
                ref="endEditable"
                @inputBlock="inputBlock"
                @deleteBlock="deleteBlock"
                @send="send"
                @y="y"
                @onfocus="$emit('onfocus')"
                @onblur="$emit('onblur')"
            />
        </div>
    </div>
</template>

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
</style>

<script>
import Block from "@/components/Block"

export default {
    components: {
        Block,
    },
    props: ["value", "writable", "inputText"],
    data() {
        return {
            args: ["ls"],
            text: ""
        }
    },
    watch: {
        value() {
            this.$nextTick(() => {
                if (this.$refs.endEditable) this.$refs.endEditable.updateY()
            })
        },
        text() {
            this.$emit("update:inputText", this.text)
        },
        inputText(text) {
            this.text = text
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
                this.$nextTick(() => this.$refs.endEditable.focus())
            }
        },
        blur() {
            if (this.$refs.endEditable) {
                this.$nextTick(() => this.$refs.endEditable.blur())
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
        y(r) {
            this.$emit("y", r)
        }
    }
}
</script>
