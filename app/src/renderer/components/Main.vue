<template>
    <div class="Main">
        <Titlebar />
        <!-- <Sidebar :blocks="candidate" v-model="searchWord" @inputBlock="inputBlock" /> -->
        <!-- <Bottombar :blocks="candidate" v-model="searchWord" @inputBlock="inputBlock" :suggestY="suggestY" /> -->
        <Console :log="log" v-model="inputForm" @send="send" ref="console" @y="y"
        
        @onfocus="onfocus"
        @onblur="onblur" />
        <ML :input="inputForm" :searchWord="searchWord" @update="mlupdate" />
    </div>
</template>

<script>
import Titlebar from "@/components/Titlebar"
import Console from "@/components/Console"
import Sidebar from "@/components/Sidebar"
import Bottombar from "@/components/Bottombar"
import ML from "@/components/ML"

// レンダラープロセスでやりとりするipcRenderer
const { ipcRenderer } = require("electron")

const child_process = require("child_process")
const path = require("path")

const HOMEDIR =
    process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"]

export default {
    components: {
        Console,
        Sidebar,
        Bottombar,
        ML,
        Titlebar
    },
    data() {
        return {
            candidate: [],
            log: [],
            inputForm: [],
            inputArr: [],
            searchWord: "",
            pwd: HOMEDIR,

            suggestY: 0,
        }
    },
    watch: {
        inputForm: {
            deep: true,
            handler() {
                this.inputArr = this.formulaToArray(this.inputForm)
                // console.log("水素の音:", this.inputForm)
                // console.log(this.inputArr)
            }
        }
    },
    created() {
        // 受信処理
        ipcRenderer.on("inputBlock", (event, block) => {
            this.inputBlock(block)
        })
    },
    methods: {
        onfocus() {
            ipcRenderer.send("onfocus")
        },
        onblur() {
            ipcRenderer.send("onblur")
        },
        y(r) {
            this.suggestY = r
            if (r.top > 1) {
                ipcRenderer.send("setSubWindowBounds", {
                    x: r.left,
                    y: r.top
                })
            }
        },
        inputBlock(block) {
            this.inputForm.push(JSON.parse(JSON.stringify(block)))
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
                    case "arg":
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

            const ioobj = {
                inputFormula: f,
                outputString: ""
            }

            this.log.push(ioobj)
            this.inputForm.splice(0)

            const arr = this.inputArr

            //const ls = child_process.spawn(a[0], a.slice(1))
            // console.log(this.inputArr)
            const ls = child_process.exec(arr.join(" "), {
                cwd: this.pwd,
                shell: true
            })

            ls.stdout.on("data", data => {
                ioobj.outputString += data
            })

            ls.stderr.on("data", data => {
                ioobj.outputString += data
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

            // 非同期
            ipcRenderer.send("candidateList", list)
        }
    }
}
</script>

<style>
.Main {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    /* background: linear-gradient(#FF00D8, #00FF62); */
}
</style>