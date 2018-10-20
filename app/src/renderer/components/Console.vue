<template>
  <div class="Console">
    <div v-for="op of log">
      <div class="Console-input">
        $ <Formula v-model="op.inputFormula" />
      </div>
      <div>{{op.outputString}}</div>
    </div>
    <div class="Input Console-input">
      $ <Formula v-model="value" writable @send="send" ref="inputForm" />
    </div>
  </div>
</template>

<script>
import Formula from "./Formula"

export default {
    components: { Formula },
    props: ["log", "value"],
    methods: {
        send() {
            this.$emit("send")
            this.$refs.inputForm.focus()
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
    background: black;
    color: #fff;
    cursor: text;
    user-select: text;
}

.Console-input {
    margin: 10px;
}
</style>
