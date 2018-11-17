<template>
    <div>
    </div>
</template>

<script>
// let fs = require("fs")

import model from "@/assets/model.json"

const exec = require("child_process").exec

export default {
    props: ["input","inputText"],
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
                this.changeInputText()
            }
        }

    },
    mounted() {
        this.update()
    },
    methods: {
        update() {
            let rec = this._getNextRecommend()

            this.preRecomend = rec

            this.$emit("update", JSON.parse(JSON.stringify(rec)))

            if(this.endBlock["type"] == "arg" && this.inputText.length != 0){
                this.endBlock["val"] = this.inputText
            }
            this.$emit("update:inputText","")
        },
        changeInputText:function(){
            if(this.inputText[this.inputText.length-1] == "\n"){
                if(this.inputText.length > 1){
                    this.input.push({
                        "type":"text",
                        "val":this.inputText.replace(/\r?\n/g, '')
                    })
                    this._changeInput()
                    this.$emit("update:inputText","")
                }
            }
            else if((this.inputText[this.inputText.length-1] == " " && this.inputText.trim() != 0)){
                this.input.push({
                    "type":"text",
                    "val":this.inputText.trim()
                })
                this._changeInput()

                this.$emit("update:inputText","")
            }

            let rec = []

            for(let item of this.preRecomend){
                if(item["type"]=="arg"){
                    rec.push(item)
                }
                else if(item["val"].includes(this.inputText) || item["description"].includes(this.inputText)){
                    rec.push(item)
                }
            }
            this.$emit("update", JSON.parse(JSON.stringify(rec)))
        },
        _changeInput(){

            if(this.endBlock["val"] == "|"){
                this.endBlock["type"] = "pipe"
            }
            else if(this.endBlock["val"] == ";"){
                this.endBlock ["type"] = "text"
            }
            else if(this.endBlock["val"] == ">>" || this.endBlock["val"] == ">"){
                this.endBlock["type"] = "redirect"
            }
            else if(this.endBlock["val"] in this.previous){
                this.endBlock["type"] = this.previous[this.endBlock["val"]]["type"]
                this.endBlock["val"] = this.endBlock["val"]
            }
            else if("@place" in this.previous){
                this.input[this.input.length-1]["type"] = "arg"
                this.input[this.input.length-1]["placeholder"] = this.previous["@place"]["placeholder"]
            }
            else{
                if(this.input.length <= 1 || this.input[this.input.length-2]["val"] == "|" || this.input[this.input.length-2]["val"] == ";"){
                    exec('type ' + this.endBlock["val"], (error, stdout, stderr) => {
                        if (error) {
                            this.endBlock["type"] = "text"
                            this.endBlock["val"] = this.endBlock["val"]
                            return;
                        }
                        this.endBlock["type"] = "command"
                        this.endBlock["val"] = this.endBlock["val"]
                    });
                }
                else{
                    this.endBlock["type"] = "text"
                    this.endBlock["val"] = this.endBlock["val"]
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

            console.log(val)

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
                console.log(path)
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
        endBlock:function(){
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
