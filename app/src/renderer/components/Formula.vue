<template>
    <div class="Formula" @keydown.enter="send">
        <div v-for="(block, i) of value" class="Block">
            <!-- <Editable value="" :writable="writable" /> -->
            <Phrase
                v-if="block.type == 'command'"
                :isOption="false"
                class="command"
                :val="block.val"
                v-model="block.args"
                :writable="writable"
                draggable="true"
                @dragenter="dragStart(card, $event)"
            />
            <Phrase
                v-else-if="block.type == 'option'"
                :isOption="true"
                class="option"
                :val="block.val"
                v-model="block.args"
                :writable="writable"
                :style="{'z-index': 99-i}"
                :class="{optionwith: i>0&&value[i-1]!=undefined}"
            />
            <Pipe
                v-else-if="block.type == 'pipe'"
                :writable="writable"
                draggable="true"
            />
        </div>
        <Editable :writable="writable" value="" ref="endEditable" />
    </div>
</template>

<script>
import Phrase from "@/components/Formula/Phrase"
import Editable from "@/components/Formula/Editable"
import Pipe from "@/components/Formula/Pipe"

export default {
    components: {
        Phrase,
        Editable,
        Pipe
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
        },
        dragStart() {
            console.log("dragstart")
        }
    }
}
</script>


<style scoped>
.Formula {
    display: inline-block;
    vertical-align:middle;
}
.Block {
    display: inline-block;
    margin-right: 5px;
    vertical-align:middle;
}

.command {
    z-index: 100;
}
.optionwith {
    margin-left: -17px;
    padding-left: 22px;
}
</style>
