<template>
    <div class="Sidebar">
        <input type="text" :value="value" @input="updateText" placeholder="検索" class="searchBox" />
        <div class="item" v-for="block of blocks">
            <span class="block" @click="clickItem(block)">
                <Formula :value="[block]" @drop="clickItem(block)" />
            </span>
            <span>{{block.description}}</span>
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
    background: rgba(0, 0, 0, 0.2);
    overflow: scroll;
}

.item {
    margin: 2px 0;
    padding: 10px;
    border: 1px solid #888;
    color: white;
    background: rgba(255, 255, 255, 0.11);
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

    margin-top: 38px;
    margin-bottom: 10px;
    border-radius: 6px;
    outline: none;
    font-size: 11px;
    text-align: center;
    padding: 4px 5px;
    border: 1px solid #888;
    color: white;
    background: rgba(255, 255, 255, 0.1);
    width: 180px;
}
.searchBox::placeholder {
    color: rgba(255, 255, 255, 0.603);
}
</style>
