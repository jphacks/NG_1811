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
    methods: {
        update() {
            let rec = []
            let path = model
            
            for(let target of this.input){
                if(target["type"] == "arg")
                    path = path["@place"]["next"]

                else if(target["val"] in path)
                    path = path[target["val"]]["next"]
                else
                    path = {}

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

            console.log(this.input.length)
            
            if(this.input.length == 0){
                console.log("in")
                this.$emit("update",JSON.parse(JSON.stringify(list)))
                return
            }
            else if(rec.length != 0){
                console.log("rec")
                this.$emit("update", JSON.parse(JSON.stringify(rec)))
                return
            }
            else{
                console.log("aa")
                this.$emit("update", rec)
                return
            }
        },
        search(){
            let searchList = []

            return
            
            if(this.searchWord != ""){
                this.$emit("update",searchList)
            }
        }
    }
}
</script>
