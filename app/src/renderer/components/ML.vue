<template>
  <div></div>
</template>

<script>
import model from "../assets/model.json"
import cmdDescription from "../assets/cmdDescription.json"
import { open } from 'fs';


const list = [
    {
        type: "command",
        val: "git"
    },
    {
        type: "command",
        val: "find",
        args: [
        {
          "placeholder": "[PATH]"
        }]
    },
    {
        type: "option",
        val: "-l"
    },
    {
        type: "pipe"
    },
    {
        type: "command",
        val: "grep",
        args: [
            {
                placeholder: "ワード"
            }
        ]
    },
    {
        type: "command",
        val: "cat",
        args: [
            {
                placeholder: "ファイル名"
            }
        ]
    },
    {
        type: "command",
        val: "ping",
        args: [
            {
                placeholder: "ホスト名"
            }
        ]
    },
    {
        type: "option",
        val: "-n",
        args: [
            {
                placeholder: "回数"
            }
        ]
    },
    {
        type: "command",
        val: "cat",
        args: [
            {
                placeholder: "[PATH]"
            }
        ]
    },
    {
        type: "redirect",
        val: ">>",
        args: [
            {
                placeholder: "[PATH]"
            }
        ]
    },
]
export default {
    props: ["input","searchWord"],
    data() {
        return {
        }
    },
    watch: {
        input: {
            deep: true,
            handler() {
                this.update()
            }
        },
        searchWord: {
            deep: true,
            handler() {
                this.search()
            }
        }
    },
    mounted() {
        this.update()
    },
    methods: {
        update() {
            console.log(this.last)
            console.log(this.second)
            console.log(this.joinInput)
            var p = []
        
            if(this.second in model && this.last in model[this.second]["next"]){
                for(let key of Object.keys(model[this.second]["next"][this.last]["next"])){
                    let obj = {
                        type:model[this.second]["next"][this.last]["next"][key]["type"],
                        val:model[this.second]["next"][this.last]["next"][key]["cmd"]["val"],
                        args:model[this.second]["next"][this.last]["next"][key]["cmd"]["args"],
                        description:cmdDescription[key],
                    }
                    p.push(obj)
                }
            }

            console.log(p)

            if(p.length!=0){
                this.$emit("update", JSON.parse(JSON.stringify(p)))
                return
            }

            if(this.last in model){
                for(let key of Object.keys(model[this.last]["next"])){
                    let obj = {
                        type:model[this.last]["next"][key]["type"],
                        val:model[this.last]["next"][key]["cmd"]["val"],
                        args:model[this.last]["next"][key]["cmd"]["args"],
                        description:cmdDescription[key]
                    }

                    p.push(obj)
                }
            }

            console.log(p)

            if(p.length!=0){
                this.$emit("update", JSON.parse(JSON.stringify(p)))
                return
            }

            this.$emit("update", list)
        },
        search(){
            let searchList = []

            if(this.searchWord.length == 0 ){
                this.update()
            }

            for(let key of Object.keys(cmdDescription)){
                if(this.searchWord.includes(key) || cmdDescription[key].includes(this.searchWord)){
                    let obj = {
                        type:"command",
                        val:key,
                        args:[],
                        description:cmdDescription[key]
                    }
                    searchList.push(obj)
                }
            }
            
            if(this.searchWord != ""){
                this.$emit("update",searchList)
            }
        }
    },
    computed: {
        cmdSplit:function(){
            return this.joinInput.split(" ").filter(function(data){
                return data.length > 0
            })
        },
        last:function(){
            return this.cmdSplit[this.cmdSplit.length-1]
        },
        second:function(){
            if(this.cmdSplit.length > 1){
                return this.cmdSplit[this.cmdSplit.length - 2]
            }
            return ""
        },
        joinInput:function(){
            let cmd = ""
            console.log(this.input)
            for(var i = 0;i < this.input.length;i++){
                if(this.input[i] != "undefined")
                    cmd += this.input[i]
            }
            return cmd
        }
    }
}
</script>
