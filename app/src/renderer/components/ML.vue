<template>
  <div>
  </div>
</template>

<script>
import model from "../assets/model.json"
import cmdDescription from "../assets/cmdDescription.json"

const list = [
    {
        type: "command",
        val: "cd",
        description:cmdDescription["cd"],
        args: [
        {
          placeholder: "移動先ディレクトリ"
        }
        ]
    },
    {
        type: "command",
        val: "touch",
        description:cmdDescription["touch"],
        args:[
            {
                placeholder:"ファイル名"
            }
        ]
    },
    {
        type: "command",
        val: "cat",
        description:cmdDescription["cat"],
        args: [
            {
                placeholder: "ファイル名"
            }
        ]
    },
    {
        type:"command",
        description:cmdDescription["rm"],
        val:"rm"
    },
    {
        type:"command",
        description:cmdDescription["pwd"],
        val:"pwd"
    },
    {
        type: "command",
        val:"find",
        description:cmdDescription["find"],
        args:[
            {
                placeholder:"検索箇所"
            }
        ]
    },
    {
        type:"command",
        description:cmdDescription["vim"],
        val:"vim",
        args: [
            {
                placeholder: "ファイル名"
            }
        ]
    },
    {
        type:"command",
        description:cmdDescription["git"],
        val:"git"
    }
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
            var p = []

            if(this.cmdSplit.length == 0){
                this.$emit("update", JSON.parse(JSON.stringify(list)))
                return
            }
        
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

            if(p.length!=0){
                this.$emit("update", JSON.parse(JSON.stringify(p)))
                return
            }
            else{
                this.$emit("update", [])
            }
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
        last:function(){
            return this.cmdSplit[this.cmdSplit.length-1]
        },
        second:function(){
            if(this.cmdSplit.length > 1){
                return this.cmdSplit[this.cmdSplit.length - 2]
            }
            return ""
        },
        cmdSplit:function(){
            let cmd = []
            for(let item of this.input){
                cmd.push(item.val)
            }
            return cmd
        }
    }
}
</script>
