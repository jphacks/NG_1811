<template>
    <div
        class="Editable"
        :contenteditable="writable"
        @input="update"
        @paste="paste"
        :data-placeholder="placeholder"
        @keydown.delete="backspace"
        @keydown="keydown"
        @keydown.enter.prevent
        ref="ediv"
        @focus="onfocus"
        @blur="onblur"
        @click="onclick"
    />
</template>

<style scoped>
.Editable {
    display: inline-block;
    text-align: left;
    outline: none;
    min-width: 1px;
}
.Editable:empty::before {
    content: attr(data-placeholder);
    opacity: 0.5;
}
</style>


<script>
export default {
    props: ["value", "placeholder", "writable", "endEditable"],
    data() {
        return {
            val: ""
        }
    },
    created: function() {
        this.val = this.value
    },
    watch: {
        // value(text) {
        //     this.val = text
        //     // const s = (text).split(" ")
        //     // const newtext = s.pop()
        //     // for (const t of s) {
        //     //     this.$emit("inputBlock", {
        //     //         type: "command",
        //     //         val: t
        //     //     })
        //     // }
        // },
        value() {
            this.val = this.value
        },
        val() {
            this.updateY()

            if (this.$el.innerText != this.val) {
                if (this.val && this.val.length > 0) {
                    this.$el.innerText = this.val
                } else {
                    this.$el.innerText = ""
                }
            } else {
            }
        }
    },
    methods: {
        focus() {
            this.$refs.ediv.focus()
        },
        updateY() {
            this.$emit("y", this.$refs.ediv.getBoundingClientRect())
        },
        update(e) {
            this.val = e.target.innerText
            this.$emit("input", this.val)

            // if (this.val == "|") {
            //     const block = {
            //         type: "pipe"
            //     }
            //     this.$emit("inputBlock", block)
            //     this.$nextTick(() => {
            //         this.$el.innerText = ""
            //         this.val = ""
            //     })
            // }

            // console.log(this.$refs.ediv.getBoundingClientRect())
        },
        paste(e) {
            e.preventDefault()
            const text = e.clipboardData.getData("text/plain")

            const selection = window.getSelection()
            const range = selection.getRangeAt(0)
            const node = document.createTextNode(text)
            range.insertNode(node)
            range.setStartAfter(node)
            range.setEndAfter(node)
            selection.removeAllRanges()
            selection.addRange(range)

            // this.update()
        },
        onclick(e) {
            // console.log("w", this.writable)
            // if(this.writable) {
            //     e.stopPropagation()
            // }
        },
        enter() {
            this.space()
            this.$nextTick(() => {
                this.$emit("send")
            })
        },
        keydown(e) {
            // console.log("suiso", e.keyCode)
            if (e.keyCode == 32) {
                //space
                this.space()
            } else if (e.keyCode == 13) {
                //enter
                this.enter()
            }
        },
        space() {
            if (this.endEditable) {
                // if (this.val.length > 0) {
                //     let block
                //     block = {
                //         type: "phrase",
                //         val: this.val
                //     }
                //     this.$emit("inputBlock", block)

                //     this.val = ""
                // }
            } else {
                this.$emit("focusEnd")
            }
        },
        backspace() {
            if (this.endEditable) {
                const selection = window.getSelection()
                const range = selection.getRangeAt(0)
                if (range.endOffset == "0") {
                    this.$emit("deleteBlock")
                }
                this.$nextTick(() => {
                    this.updateY()
                })
            }
        },
        onfocus() {
            this.updateY()
            this.$emit("onfocus")
        },
        onblur() {
            this.$emit("onblur")
        }
    }
}
</script>
