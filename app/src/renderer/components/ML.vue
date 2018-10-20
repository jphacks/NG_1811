<template>
  <div></div>
</template>

<script>
import model from "../assets/model.json"

const list = [
    {
        type: "command",
        val: "git"
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
    }
]
export default {
    props: ["input"],
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
        }
    },
    mounted() {
        this.update()
    },
    methods: {

        update() {
            var p = []

            
            if(this.second in model && this.last in model[this.second]["next"]){
                for(let key of Object.keys(model[this.second]["next"][this.last]["next"])){
                    let obj = {
                        type:model[this.second]["next"][this.last]["next"][key]["type"],
                        val:model[this.second]["next"][this.last]["next"][key]["cmd"]["val"],
                        args:model[this.second]["next"][this.last]["next"][key]["cmd"]["args"]
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
                        args:model[this.last]["next"][key]["cmd"]["args"]
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
        }
    },
    computed: {
        cmdSplit:function(){
            return this.input.split(" ").filter(function(data){
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
        }
    }
}
</script>
