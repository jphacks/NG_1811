<template>
    <div class="Sidebar">
        <input type="text" :value="value" @input="updateText" placeholder="検索" class="searchBox" />
        <div class="item" v-for="block of blocks">
            <span class="block" @click="clickItem(block)">
                <Formula :value="[block]" />
            </span>
        </div>
        </div>
    </div>
</template>

<script>
import Formula from "./Formula"

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
    overflow: scroll;
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

.searchBox {
    margin: 10px auto;
    display: block;
}
</style>
