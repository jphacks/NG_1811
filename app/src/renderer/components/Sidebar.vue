<template>
    <div class="Sidebar">
        <div class="header">
            <input type="text" :value="value" @input="updateText" placeholder="コマンドを検索" class="searchBox" />
            <Menu />
        </div>
        <div class="contents">
            <div class="item" v-for="block of blocks">
                <span class="block" @click="clickItem(block)">
                    <Formula :value="[block]" @drop="clickItem(block)" clickable="true" />
                </span>
                <span class="description">{{block.description}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import Formula from "./Formula"

import Menu from "@/components/Menu"

export default {
    components: {
        Formula,
        Menu
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
}
.header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    overflow: scroll;
}
.contents {
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: scroll;
}

.item {
    margin: 0 3px;
    margin-bottom: 5px;
    border-radius: 8px;
    padding: 10px;
    /* border: 1px solid #888; */
    color: white;
    background: rgba(255, 255, 255, 0.11);
}
.item .description {
    margin-top: 5px;
    display: block;
}

.searchBox {
    margin: 10px 4px;
    display: block;
    border: none;
    margin-top: 38px;
    margin-bottom: 10px;
    border-radius: 6px;
    outline: none;
    font-size: 11px;
    text-align: center;
    padding: 4px 5px;
    /* border: 1px solid #888; */
    color: white;
    background: rgba(255, 255, 255, 0.1);
    width: 190px;
}
.searchBox::placeholder {
    color: rgba(255, 255, 255, 0.603);
}
</style>
