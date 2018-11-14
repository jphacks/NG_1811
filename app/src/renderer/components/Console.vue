<template>
  <div class="Console" @mousedown="clickConsole">
    <div class="Console-inner" ref="inner">
        <div v-for="op of log">
        <div class="Console-input">
            $ <Formula v-model="op.inputFormula" />
        </div>
        <div class="Console-output">{{op.outputString}}</div>
        </div>
        <div class="Input Console-input">
        $ <Formula v-model="value" writable @send="send" ref="inputForm" @y="y" />
        </div>
    </div>
  </div>
</template>

<script>
import Formula from "./Formula"

export default {
    components: { Formula },
    props: ["log", "value"],
    mounted() {
        this.$refs.inputForm.focus()

    },
    watch: {
        log: {
            deep: true,
            handler() {
                this.scrollToBottom()
            }
        },
        value() {
            this.scrollToBottom()
        }
    },
    methods: {
        send() {
            this.$emit("send")
            this.focus()
        },
        clickConsole() {
            this.focus()
        },
        focus() {
            this.$refs.inputForm.focus()
        },
        scrollToBottom() {
            this.$nextTick(() => {
                this.$refs.inner.scrollTop = this.$refs.inner.scrollHeight
            })
        },
        y(r) {
            this.$emit("y", r)
        }
    }
}
</script>


<style scoped>
.Console {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 240px;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
    cursor: text;
    user-select: text;
}
.Console-inner {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 30px;
    overflow: scroll;
}

.Console-input {
    margin: 10px;
    line-height: 24px;
}

.Console-output {
    margin: 10px;
    white-space: pre-wrap;
}
</style>
