<template>
    <router-link class="Menu" to="/store">
    </router-link>
</template>

<script>
import Formula from "./Formula"

const remote = require("electron").remote

export default {
    components: {
        Formula
    },
    props: ["blocks", "value"],
    data() {
        return {
            args: ["ls"]
        }
    },
    methods: {
        clickItem(block) {
            this.$emit("inputBlock", block)
        },
        updateText(e) {
            this.$emit("input", e.target.value)
        },
    }
}
</script>


<style scoped>
.Menu {
    cursor: pointer;
    width: 16px;
    height: 16px;
    margin: 10px;
    margin-top: -28px;
    float: right;
    background: url(../assets/package.svg) no-repeat;
}
</style>
