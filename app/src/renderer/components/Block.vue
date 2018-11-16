<template>
    <span
        class="Block"
        :class="{
            Command: type == 'command',
            Option: type == 'option',
            Redirect: type == 'redirect',
            Arg: type == 'arg',
            Pipe: type == 'pipe',
            Text: type == 'text',
            clickable: clickable
            }"
        @dragend="$emit('dragend')"
        @click="onclick"
    >
        <Editable class="Edi" v-model="val" :placeholder="placeholder" :writable="writable" ref="arg" 
            @send="$emit('send')" @focusEnd="$emit('focus')" v-if="type == 'arg' || type == 'text'"/>
        <span class="Val" v-else>{{value}}</span>
    </span>
</template>

<script>
import Editable from "@/components/Editable"

export default {
    components: {
        Editable
    },
    props: ["value", "type", "writable", "clickable", "placeholder"],
    data() {
        return {
            val: ""
        }
    },
    created: function() {
        this.val = this.value
    },
    watch: {
        value() {
            this.val = this.value
        },
        val() {
            this.$emit("input", this.val)
        }
    },
    methods: {
        onclick(e) {
            if(!this.clickable) {
                e.stopPropagation()
            }
        },
    }
}
</script>

<style scoped>

.Block {
    white-space: nowrap;
}

.Text, .Command, .Option, .Redirect, .Arg {
    position: relative;
    outline: none;
    padding: 2px 0;
    border-radius: 30px;
    display: inline-block;
    color: rgb(255, 255, 255);
    /* transition: all 1s ease; */
    z-index: 100;
    height: 20px;
    line-height: 20px;
    min-width: 24px;
    text-align: center;
    box-shadow: 0 1px 2px rgb(92, 92, 92);
    z-index: 101;
    text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
    padding-left: 2px;
}
.Command, .Option, .Redirect, .Arg {
    padding-left: 10px;
}
.Text {
    background: rgb(119, 119, 119);
}
.Command {
    background: rgb(255, 0, 140);
}
.Option {
    background: rgb(0, 224, 67);
}
.Redirect {
    background: rgb(255, 136, 0);
}
.Arg {
    padding-left: 2px;
    background: rgb(217, 255, 0);
}

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
.Pipe .Val {
    margin-left: -2px;
}


.Val {
    margin-right: 5px;
}
.Val:last-child {
    margin-right: 10px;
}
.clickable {
    cursor: pointer;
}
.clickable:active {
    transform: translateY(3px);
}

.Edi {
    color: #fff;
    background: rgba(0, 0, 0, 0.3);
    /* border: 1px solid rgb(255, 255, 255); */
    border-radius: 30px;
    padding: 0px 8px;
    margin-right: 2px;
    line-height: 20px;
    outline: none;
    min-width: 10px;
}


.optionwith .Edi {
    margin-left: -15px;
    padding-left: 15px;
}
</style>
