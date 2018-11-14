<template>
    <div class="Bottomber" :style="{ top: suggestY.y + 30 + 'px', left: suggestY.x + 'px' }">
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
    background: rgba(105, 105, 105, 0.842);
    z-index: 100;
    border-radius: 5px;
    display: inline-block;
}

.item {
    margin: 0 3px;
    padding: 5px;
    /* border: 1px solid #888; */
    color: white;
    /* background: rgba(255, 255, 255, 0.11); */
    /* display: inline-block; */
}
.item .block {
}
.item .description {
    margin-top: 5px;
}

</style>
