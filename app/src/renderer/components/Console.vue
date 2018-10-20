<template>
  <div class="Console" @mousedown="clickConsole">
    <div v-for="op of log">
      <div class="Console-input">
        $ <Formula v-model="op.inputFormula" />
      </div>
      <div class="Console-output">{{op.outputString}}</div>
    </div>
    <div class="Input Console-input">
      $ <Formula v-model="value" writable @send="send" ref="inputForm" @inputBlock="inputBlock" />
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
        inputBlock(block) {
            this.$emit("inputBlock", block)
        },
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
    background: black;
    color: #fff;
    cursor: text;
    user-select: text;
}

.Console-input {
    margin: 10px;
}

.Console-output {
    margin: 10px;
    white-space: pre-wrap;
}
</style>
