<template>
  <span class="Pipe"
        draggable="true"
        @dragend="drop">|</span>
</template>

<script>
export default {
    props: ["name", "witharg"],
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
    color: rgba(0, 0, 0, 0);
    margin: 0 0px;
}
</style>
