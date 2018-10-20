<template>
    <div class="Sidebar">
        <div class="item" v-for="block of blocks">
            <span class="block" @click="clickItem(block)">
                <Formula :value="[block]" />
            </span>
        </div>
        </div>
    </div>
</template>

<script>
import Formula from './Formula'

export default {
    components: {
        Formula
    },
    props: ["blocks"],
    data() {
        return {
            args: ["ls"]
        }
    },
    methods: {
        clickItem(block) {
            this.$emit("inputBlock", block)
        }
    }
}
</script>


<style scoped>
.Sidebar {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 240px;
    background: blue;
}

.item {
    margin: 10px;
}
.item .Formula {
    /* cursor: pointer; */
}

.block {
    cursor: pointer;
}
</style>
