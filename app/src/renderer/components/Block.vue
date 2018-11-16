<template>
    <span
        class="Block"
        :class="{
            Command: type == 'command',
            Option: type == 'option',
            Redirect: type == 'redirect',
            Arg: type == 'arg',
            Pipe: type == 'pipe',
            Text: type == 'text',
            Last: type == 'last',
            clickable: clickable,
            writable: writable
            }"
        @dragend="$emit('dragend')"
        @click="onclick">

        <div
            class="Editable"
            :contenteditable="type.match(/arg|text|last/)&&writable"
            :data-placeholder="placeholder"
            ref="ediv"
            @input="update"
            @paste="paste"
            @keydown="keydown"
            @keydown.enter.prevent
            @focus="onfocus"
            @blur="onblur" />
    </span>
</template>

<script>
export default {
    props: ["value", "type", "writable", "clickable", "placeholder", "endEditable"],
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
            // this.updateY()

            if (this.$refs.ediv.innerText != this.val) {
                if (this.val && this.val.length > 0) {
                    this.$refs.ediv.innerText = this.val
                } else {
                    this.$refs.ediv.innerText = ""
                }
            } else {
            }
            
            this.$emit("input", this.val)
        }
    },
    methods: {
        onclick(e) {
            if (!this.clickable) {
                e.stopPropagation()
            }
        },
        y(r) {
            this.$emit("y", r)
        },
        focus() {
            this.$refs.ediv.focus()
        },
        updateY() {
            this.$emit("y", this.$refs.ediv.getBoundingClientRect())
        },
        update(e) {
            this.val = this.$refs.ediv.innerText
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

            this.update()
        },
        keydown(e) {
            if (e.keyCode == 13) {
                //enter
                this.val += "\n"
                this.$emit("input", this.val)

                this.$nextTick(() => {
                    this.$emit("send")
                })
            } else if (e.keyCode == 8) {
                //delete

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

<style scoped>
.Block {
    white-space: nowrap;
    display: inline-block;
    vertical-align: middle;
}

.Last,
.Text,
.Command,
.Option,
.Redirect,
.Arg {
    position: relative;
    outline: none;
    padding: 2px 0;
    border-radius: 30px;
    display: inline-block;
    color: rgb(255, 255, 255);
    /* transition: all 1s ease; */
    z-index: 100;
    height: 20px;
    line-height: 20px;
    text-align: center;
    box-shadow: 0 1px 2px rgb(92, 92, 92);
    z-index: 101;
    text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
    padding-left: 2px;
}
.Last {
    box-shadow: none;
}
.Text {
    background: rgb(105, 105, 105);
}
.Command {
    background: rgb(255, 0, 140);
}
.Option {
    background: rgb(0, 224, 67);
}
.Redirect {
    background: rgb(255, 136, 0);
}
.Arg {
    background: rgb(0, 255, 221);
}

.Pipe {
    background: rgb(225, 0, 255);
    width: 3px;
    border-radius: 10px;
    height: 24px;
    margin: 0 0px;
    color: rgba(0, 0, 0, 0);
}
.Pipe .Editable {
    margin-left: -2px;
    opacity: 0;
}

.clickable {
    cursor: pointer;
}
.clickable:active {
    transform: translateY(3px);
}

.Arg .Editable {
    background: rgba(0, 0, 0, 0.3);
}
.Text .Editable {
    background: rgba(0, 0, 0, 0.3);
}

.Editable {
    color: #fff;
    /* border: 1px solid rgb(255, 255, 255); */
    border-radius: 30px;
    padding: 0px 8px;
    margin-right: 2px;
    line-height: 20px;
    outline: none;

    display: inline-block; 
    text-align: left;
    outline: none;
}
.Last .Editable {
    min-width: 50px;
    background: rgba(0, 0, 0, 0.3);
}

.optionwith {
    margin-left: -24px;
    padding-left: 18px;
}
.optionwith .Editable  {
    margin-left: -15px;
    padding-left: 15px;
}

.Editable:empty::before {
    content: attr(data-placeholder);
    opacity: 0.5;
}

</style>
