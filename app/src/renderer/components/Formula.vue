<template>
    <div class="Formula" @keydown.enter="send">
        <div v-for="(block, i) of value" class="Block">
            <Editable value="" :writable="writable" />
            <Phrase v-if="block.type == 'command'" :isOption="false" class="command" :val="block.val" v-model="block.args" :writable="writable" draggable="true" />
            <Phrase v-else-if="block.type == 'option'" :isOption="true" class="option" :val="block.val" v-model="block.args" :writable="writable" :style="{'z-index': 99-i}" />
        </div>
        <Editable :writable="writable" value="" ref="endEditable" />
    </div>
</template>

<script>
import Phrase from "@/components/Formula/Phrase"
import Editable from "@/components/Formula/Editable"

export default {
    components: {
        Phrase,
        Editable
    },
    props: ["value", "writable"],
    data() {
        return {
            args: ["ls"]
        }
    },
    methods: {
        send() {
            this.$emit("send")
        },
        focus() {
            this.$nextTick(() => this.$refs.endEditable.$el.focus())
        }
    }
}
</script>


<style scoped>
.Formula {
    display: inline-block;
}
.Block {
    display: inline-block;
    margin-right: 5px;
}

.command {
    z-index: 100;
}
.option:not(:last-child) {
    margin-left: -20px;
    padding-left: 20px;
}
</style>
