<template>
    <div
        class="Editable"
        :contenteditable="writable"
        :data-placeholder="placeholder"
        ref="ediv"
        @input="update"
        @paste="paste"
        @keydown.enter.prevent="enter"
        @keydown.delete="backspace"
        @focus="onfocus"
        @blur="onblur"
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
        enter() {
            this.val += "\n"
            this.$emit("input", this.val)

            this.$nextTick(() => {
                this.$emit("send")
            })
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
