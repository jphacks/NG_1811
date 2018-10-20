<template>
    <div class="App">
        <Sidebar :blocks="candidate" @inputBlock="inputBlock" />
        <Console :log="log" v-model="inputForm" @send="send" ref="console" />
        <ML :input="inputArr" @update="mlupdate" />
    </div>
</template>

<script>
import Console from "@/components/Console"
import Sidebar from "@/components/Sidebar"
import ML from "@/components/ML"

const child_process = require("child_process")

export default {
    components: {
        Console,
        Sidebar,
        ML
    },
    data() {
        return {
            candidate: [],
            log: [],
            inputForm: [],
            inputArr: []
        }
    },
    watch: {
        inputForm: {
            deep: true,
            handler() {
                this.inputArr =  this.formulaToArray(this.inputForm)
            }
        }
    },
    methods: {
        inputBlock(block) {
            this.inputForm.push(block)
            this.$refs.console.focus()
        },
        formulaToArray(input) {
            let s = []

            for (let block of input) {
                switch (block.type) {
                    case "command":
                        s.push(block.val)
                        break
                    case "option":
                        s.push(block.val)
                        break
                    case "text":
                        s.push(block.val)
                        break
                    case "pipe":
                        s.push("|")
                        break
                }
                if (block.args) {
                    for (let arg of block.args) {
                        s.push(arg.val)
                    }
                }
            }

            return s.map(t => new String(t).trim()).filter(e => e !== "")
        },
        send() {
            const f = JSON.parse(JSON.stringify(this.inputForm))
            console.log(f)

            const ioobj = {
                inputFormula: f,
                outputString: ""
            }

            this.log.push(ioobj)
            this.inputForm.splice(0)

            //const ls = child_process.spawn(a[0], a.slice(1))
            const ls = child_process.exec(this.inputArr.join(" "))

            ls.stdout.on("data", data => {
                ioobj.outputString += data
            })

            ls.stderr.on("data", data => {
                ioobj.outputString += data
            })

            ls.on("close", code => {
                console.log(`child process exited with code ${code}`)
            })
        },
        mlupdate(list) {
            this.candidate = list
        }
    }
}
</script>

<style scoped>
.App {
    font-family: Menlo, "DejaVu Sans Mono", Consolas, "Lucida Console",
        monospace, -apple-system, BlinkMacSystemFont, "Helvetica Neue",
        "Yu Gothic", YuGothic, "ヒラギノ角ゴ ProN W3", Hiragino Kaku Gothic ProN,
        Arial, "メイリオ", Meiryo, sans-serif;
    background: none;
    -webkit-user-select: none;
    font-size: 12px;
}
</style>
