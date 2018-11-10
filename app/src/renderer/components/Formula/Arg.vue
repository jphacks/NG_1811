<template>
    <span
        class="Phrase Option"
        :class="{
            clickable: clickable
            }"
        @mousedown.stop="click"
        :draggable="clickable"
        @dragend="drop"
    >
        <!-- 
         --><Editable class="Arg" v-model="val" @input="update" :placeholder="placeholder" :writable="writable" ref="arg" @focusEnd="focusEnd" />
    </span>
</template>

<script>
import Editable from "./Editable"

export default {
    components: {
        Editable
    },
    props: ["value", "type", "writable", "clickable", "placeholder"],
    data() {
        return {
            val: ""
        }
    },
    mounted: function() {
        this.val = this.value
    },
    mounted() {
        // console.log(this.$refs.arg.focus())
    },
    methods: {
        update(e) {
            this.$emit("input", this.val)
        },
        click() {},
        drop() {
            this.$emit("drop")
        },
        focusEnd() {
            this.$emit("focus")
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
.clickable {
    cursor: pointer;
}
.clickable:active {
    transform: translateY(3px);
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
