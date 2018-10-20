<template>
    <div class="Editable" :contenteditable="writable" @input="update" @paste="paste" :data-placeholder="placeholder" @keydown.enter="enter"></div>
</template>

<script>
export default {
    props: ["value", "placeholder", "writable"],
    mounted: function() {
        if(this.value) {
            this.$el.innerText = this.value
        }
    },
    methods: {
        update(e) {
            const text = e.target.innerText
            this.$emit("input", text)
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
        enter(e) {
            e.preventDefault()
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

