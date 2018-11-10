<template>
    <div>
    </div>
</template>

<script>
import model from "../assets/model.json"
import cmdDescription from "../assets/cmdDescription.json"

const list = [
    {
        type:"command",
        description:cmdDescription["git"],
        val:"git"
    }
]
export default {
    props: ["input","searchWord"],
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
    data:function(){
        return {
            previewPath:[]
        }
    },
    methods: {
        update() {
            let rec = []
            let path = this.recomended

            if(this.lastCmd["type"] == "option"){
                if(! this.lastCmd["val"] in this.previous){
                    for(let item in this.previous){
                        if(this.previous[item]["type"] == "arg"){
                            this.input[this.input.length-1]["type"] = "arg"
                            this.input[this.input.length-1]["placeholder"] = this.previous["@place"]["placeholder"]
                        }
                    }              
                }
            }


            for(let cmd in path){
                if(path[cmd]["type"] == "arg"){
                    rec.push({
                        placeholder:path[cmd]["placeholder"],
                        description:cmdDescription["git"],
                        type:path[cmd]["type"]})
                }
                else{
                    rec.push({
                        val:cmd,
                        description:cmdDescription["git"],
                        type:path[cmd]["type"]
                    })
                }
            }

            if(this.input.length == 0){
                this.$emit("update",JSON.parse(JSON.stringify(list)))
            }
            else if(rec.length != 0){
                this.$emit("update", JSON.parse(JSON.stringify(rec)))
            }
            else{
                this.$emit("update", rec)
            }
        },
        search(){
            let searchList = []

            return
            
            if(this.searchWord != ""){
                this.$emit("update",searchList)
            }
        }
    },
    computed:{
        recomended:function(){
            let path = model,target
            for(let i = 0;i < this.input.length;i++){
                target = this.input[i]
                if(target["type"] == "arg")
                    path = path["@place"]["next"]
                else if(target["val"] in path)
                    path = path[target["val"]]["next"]
                else
                    path = {}
            }

            return path
        },
        previous:function(){
            let path = model,target
            for(let i = 0;i < this.input.length - 1;i++){
                target = this.input[i]
                if(target["type"] == "arg")
                    path = path["@place"]["next"]
                else if(target["val"] in path)
                    path = path[target["val"]]["next"]
                else
                    path = {}
            }

            return path
        },
        lastCmd:function(){
            if(this.input.length == 0){
                return {}
            }
            else{
                return this.input[this.input.length-1]
            }
        }
    }
}
</script> 

