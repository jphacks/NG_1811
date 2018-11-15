<template>
  <span class="Pipe"
        :draggable="clickable"
        :class="{
            clickable: clickable
            }"
        @dragend="drop">
        <span class="Val">|</span>
        </span>
</template>

<script>
export default {
    props: ["name", "witharg", "clickable"],
    data() {
        return {}
    },
    methods: {
        drop() {
            this.$emit("drop")
        }
    }
}
</script>

<style scoped>
.Pipe {
    display: inline-block;
    box-shadow: 0 1px 2px rgb(92, 92, 92);
    background: rgb(0, 183, 255);
    width: 3px;
    border-radius: 10px;
    height: 24px;
    margin: 0 0px;
    color: rgba(0,0,0,0);
}
.clickable {
    cursor: pointer;
}
.clickable:active {
    transform: translateY(3px);
}

.Val {
    margin-left: -2px;
}
</style>
