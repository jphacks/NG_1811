<template>
    <div>
    </div>
</template>

<script>
import model from "../assets/model.json"

const list = []
        for(let cmd in model){
            list.push({
                val:cmd,
                description:model[cmd]["des"],
                type:model[cmd]["type"]
            })
        }
export default {
    props: ["input","searchWord"],
    watch:{
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
            this._changeInput()

            let rec = this._getNextRecommend()


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
            
            if(this.searchWord.length == 0){
                this.update() 
            }
        
            for(let cmd in model){
                if(model[cmd]["des"].includes(this.searchWord) || this.searchWord.includes(cmd)){
                    searchList.push({
                        val:cmd,
                        description:model[cmd]["des"],
                        type:model[cmd]["type"]
                    })
                }
            }
            if(this.searchWord != ""){
                this.$emit("update",searchList)
            }
        },
        _changeInput(){
            if(this.lastCmd["type"] == "option"){
                if(!(this.lastCmd["val"] in this.previous)){
                    for(let item in this.previous){
                        if(this.previous[item]["type"] == "arg"){
                            this.input[this.input.length-1]["type"] = "arg"
                            this.input[this.input.length-1]["placeholder"] = this.previous["@place"]["placeholder"]
                        }
                    }                    
                }
            }
        },
        _getNextRecommend(){
            let rec = []
            let path = this.recomended

            for(let cmd in path){
                if(path[cmd]["type"] == "arg"){
                    rec.push({
                        placeholder:path[cmd]["placeholder"],
                        description:path[cmd]["des"],
                        type:path[cmd]["type"],
                        weight:path[cmd]["weight"]
                        })
                }
                else{
                    rec.push({
                        val:cmd,
                        description:path[cmd]["des"],
                        type:path[cmd]["type"],
                        weight:path[cmd]["weight"]
                    })
                }
            }
            rec.sort(function(a,b){
                return b["weight"] - a["weight"]
            })

            return rec
        }
    },
    computed:{
        recomended:function(){
            let path = model,target
            for(let i = 0;i < this.input.length;i++){
                target = this.input[i]
                if(target["type"] == "arg")
                    path = path["@place"]["@next"]
                else if(target["val"] in path)
                    path = path[target["val"]]["@next"]
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
                    path = path["@place"]["@next"]
                else if(target["val"] in path)
                    path = path[target["val"]]["@next"]
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

