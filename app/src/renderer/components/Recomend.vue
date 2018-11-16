<template>
    <div>
    </div>
</template>

<script>
// let fs = require("fs")
import model from "@/assets/model.json"

export default {
    props: ["input","searchWord","inputText"],
    data:function(){
        return{
            "preRecomend":[]
        }
    },
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
        },
        inputText: {
            deep: true,
            handler() {
                this.filtering()
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

            this.preRecomend = rec

            this.$emit("update", JSON.parse(JSON.stringify(rec)))

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
        filtering:function(){
            let rec = []
            for(let item of this.preRecomend){
                if(item["type"]=="arg"){
                    rec.push(item)
                }
                else if(item["val"].includes(this.inputText)){
                    rec.push(item)
                }
            }
            this.$emit("update", JSON.parse(JSON.stringify(rec)))
        },
        _changeInput(){
            if(this.lastCmd["val"] == "|"){
                this.input[this.input.length-1]["type"] = "pipe"
                this.input[this.input.length-1]["val"] = "|"
            }
            else if(this.lastCmd["type"] == "option"){
                if(this.lastCmd["val"] == ">>" || this.lastCmd["val"] == ">"){
                    this.input[this.input.length-1]["type"] = "redirect"
                    this.input[this.input.length-1]["val"] = this.lastCmd["val"]
                }
                else if(!(this.lastCmd["val"] in this.previous)){
                    if("@place" in this.previous){
                        this.input[this.input.length-1]["type"] = "arg"
                        this.input[this.input.length-1]["placeholder"] = this.previous["@place"]["placeholder"]
                    }    
                }
            }
        },
        _getNextRecommend(){
            let rec = []
            let path = this.recomended

            for(let cmd in path){
                
                // 使われているオプションはスキップ
                if(this._inUsed(cmd)){
                    continue
                }

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
        },
        _inUsed(val){
            return this.used.indexOf(val) >= 0 ? true : false
        },
        _pathTransition(path,target){
            let val = (target["type"] == "arg")?"@place":target["val"] 

            if(val in path){
                return (path[val]["predict"]) ? path[val]["@next"] : path
            }
            else{
                return {}
            }
        }
    },
    computed:{
        recomended:function(){
            let path = model
            for(let i = 0;i < this.input.length;i++){
                let target = this.input[i]

                path = this._pathTransition(path,target)

            }
            return path
        },
        used:function(){
            let path = model
            let use = []
            for(let i = 0;i < this.input.length;i++){
                let target = this.input[i]                

                let val = target["type"] == "arg"?"@place":target["val"]

                if(path[val]["use"]||path[val]["repeat"]){
                    continue
                }

                if("ignore" in path[val]){
                    use = use.concat(path[val]["ignore"])
                }

                if(path[val]["predict"]){
                    use = []
                }
                else{
                    use.push(val)
                }

                path = this._pathTransition(path,target)

            }
            return use
        },
        lastCmd:function(){
            return this.input.length != 0 ? this.input[this.input.length-1] : {}
        },
        previous:function(){
            let path = model
            for(let i = 0;i < this.input.length-1;i++){
                let target = this.input[i]

                path = this._pathTransition(path,target)
            }
            return path
        }
    }
    // created:function(){
    //     let path = "/Users/maitake/Desktop/model/"
    //     let _this = this
    //     fs.readdir(path, (err, files) => {
    //         if (err) throw err;
    //         let fileList = files.filter(function(file){
    //             return fs.statSync(path + file).isFile() && /.*\.json$/.test(file);
    //         })
    //         for(let item of fileList){
    //             let json = JSON.parse(fs.readFileSync(path + item, 'utf8'));
    //             model = Object.assign(model,json)
    //         }
    //         this.update()
    //     })
    // }
}
</script> 

