<template>
    <div class="App">
        <Sidebar :blocks="candidate" v-model="searchWord" @inputBlock="inputBlock" />
        <Console :log="log" v-model="inputForm" @send="send" ref="console" />
        <ML :input="inputArr.join(' ')" :searchWord="searchWord" @update="mlupdate" />
    </div>
</template>

<script>
import Console from "@/components/Console"
import Sidebar from "@/components/Sidebar"
import ML from "@/components/ML"
import { setTimeout } from "timers"

const child_process = require("child_process")
const path = require("path")

const HOMEDIR =
    process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"]

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
            inputArr: [],
            searchWord: "",
            pwd: HOMEDIR
        }
    },
    watch: {
        inputForm: {
            deep: true,
            handler() {
                this.inputArr = this.formulaToArray(this.inputForm)
                // console.log(this.inputArr)
            }
        }
    },
    methods: {
        inputBlock(block) {
            this.inputForm.push(JSON.parse(JSON.stringify(block)))
            this.$refs.console.focus()
            this.scrollToBottom()
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
        scrollToBottom() {
            const el = this.$refs.console.$el
            // console.log(el)
            el.scrollTop = el.scrollHeight
        },
        send() {
            const f = JSON.parse(JSON.stringify(this.inputForm))

            const ioobj = {
                inputFormula: f,
                outputString: ""
            }

            this.log.push(ioobj)
            this.inputForm.splice(0)

            this.scrollToBottom()

            const arr = this.inputArr

            //const ls = child_process.spawn(a[0], a.slice(1))
            // console.log(this.inputArr)
            const ls = child_process.exec(arr.join(" "), {
                cwd: this.pwd,
                shell: true
            })

            ls.stdout.on("data", data => {
                ioobj.outputString += data
                this.scrollToBottom()
            })

            ls.stderr.on("data", data => {
                ioobj.outputString += data
                this.scrollToBottom()
            })

            ls.on("close", code => {
                if (code === 0) {
                    if (arr[0] == "cd") {
                        const p = arr[1]

                        let n = ""

                        if (p[0] == "~") {
                            n = HOMEDIR + "/" + p.slice(1)
                        } else if (p[0] == "/") {
                            n = p
                        } else {
                            n = this.pwd + "/" + p
                        }

                        this.pwd = path.normalize(n)
                    } else if (arr[0] == "clear" || arr[0] == "cls") {
                        this.log = []
                    }
                }
                // console.log(`child process exited with code ${code}`)
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
