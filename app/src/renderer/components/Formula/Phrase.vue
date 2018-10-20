<template>
    <span
        class="Phrase"
        :class="{
            Command: type == 'command',
            Option: type == 'option',
            Redirect: type == 'redirect',
            }"
        @mousedown.stop="click"
        draggable="true"
        @dragend="drop"
    >
        <span class="Val">{{val}}</span><!-- 
         --><Editable class="Arg" v-for="arg of value" v-model="arg.val" :placeholder="arg.placeholder" :writable="writable" ref="arg" />
    </span>
</template>

<script>
import Editable from "./Editable"

export default {
    components: {
        Editable
    },
    props: ["val", "value", "type", "writable"],
    data() {
        return {}
    },
    mounted() {
        // console.log(this.$refs.arg.focus())
    },
    methods: {
        click() {},
        drop() {
            this.$emit("drop")
        }
    }
}
</script>

<style scoped>
.Phrase {
    position: relative;
    outline: none;
    padding: 2px 0;
    border-radius: 30px;
    display: inline-block;
    color: rgb(255, 255, 255);
    background: rgb(255, 0, 140);
    transition: all 0.1s ease;
    z-index: 100;
    height: 20px;
    line-height: 20px;
    min-width: 24px;
    text-align: center;
    box-shadow: 0 1px 2px rgb(92, 92, 92);
    z-index: 101;
    text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
    padding-left: 10px;
}
.Phrase:active {
    transform: translateY(2px);
}

.Option {
    background: rgb(0, 224, 86);
}

.Redirect {
    background: rgb(255, 136, 0);
}

.Val {
    margin-right: 5px;
}
.Val:last-child {
    margin-right: 10px;
}

.Arg {
    color: #fff;
    background: rgba(0, 0, 0, 0.3);
    /* border: 1px solid rgb(255, 255, 255); */
    border-radius: 30px;
    padding: 0px 8px;
    margin-right: 2px;
    line-height: 20px;
    outline: none;
    min-width: 10px;
}
</style>
