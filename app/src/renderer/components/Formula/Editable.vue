<template>
    <div class="Editable" :contenteditable="writable" @input="update" @paste="paste" :data-placeholder="placeholder" @keydown.enter.prevent="enter" @keydown.delete="backspace" @keydown.space.prevent="space"></div>
</template>

<script>
export default {
    props: ["value", "placeholder", "writable"],
    data() {
        return {
            val: ""
        }
    },
    mounted: function() {
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
            if (this.$el.innerText != this.val) {
                if (this.val && this.val.length > 0) {
                    this.$el.innerText = this.val
                } else {
                    this.$el.innerText = ""
                }
            }
        }
    },
    methods: {
        space() {
            if (this.val.length > 0) {
                this.$emit("inputBlock", {
                    type: "command",
                    val: this.val
                })

                this.val = ""
            }
        },
        update(e) {
            this.val = e.target.innerText
            this.$emit("input", this.val)
        },
        paste(e) {
            e.preventDefault()
            const text = e.clipboardData.getData("text/plain")
            console.log(2, text)

            const selection = window.getSelection()
            const range = selection.getRangeAt(0)
            const node = document.createTextNode(text)
            range.insertNode(node)
            range.setStartAfter(node)
            range.setEndAfter(node)
            selection.removeAllRanges()
            selection.addRange(range)
        },
        enter() {
            this.space()
        },
        backspace() {
            const selection = window.getSelection()
            const range = selection.getRangeAt(0)
            if(range.endOffset == "0") {
                this.$emit("deleteBlock")
            }
        }
    }
}
</script>

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

