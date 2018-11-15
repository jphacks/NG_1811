<template>
    <div class="Bottomber" :style="{ top: suggestY.y + 28 + 'px', left: suggestY.x - 16 + 'px' }">

            <div class="item" v-for="block of blocks">
                <span class="block" @click="clickItem(block)">
                    <Formula :value="[block]" @drop="clickItem(block)" clickable="true" />
                </span>
                <span class="description">{{block.description}}</span>
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
    props: ["blocks", "value", "suggestY"],
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
.Bottomber {
    position: fixed;
    /* top: 70px; */
    /* left: 260px; */
    /* width: 100%;.,; */
    z-index: 100;
    display: inline-block;
    /* border:1px solid #000000; */
    box-shadow: 0px 9px 34px -6px #030303;
    background: rgba(49, 49, 49, 0.884);
    padding: 0 7px;
    border: 1px solid #222;
    border-radius: 5px;
}

.block {
    float: left;
}
.description {
    display: inline-block;
}

.item {
    margin: 1px;
    color: white;
    /* background: rgba(255, 255, 255, 0.11); */
    /* display: inline-block; */
    margin: 6px 2px;
    height: 26px;
    line-height: 26px;
}
</style>
