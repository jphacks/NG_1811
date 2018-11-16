<template>
    <div class="Main">
        <div class="Titlebar">{{pwd}}</div>

        <div class="Console" @click="clickConsole">
            <div class="Console-inner" ref="inner">
                <div v-for="op of log">
                <div class="Console-input">
                    $ <Formula v-model="op.inputFormula" />
                </div>
                <div class="Console-output">{{op.outputString}}</div>
                </div>
                <div class="Input Console-input">
                $ <Formula v-model="inputForm" :writable="true" @send="send" ref="inputForm" @y="y" 
                    @onfocus="onfocus"
                    @onblur="onblur"
                    :inputText.sync="inputText"
                />
                </div>
            </div>
        </div>

        <Recomend :input="inputForm" :inputText.sync="inputText" @update="mlupdate" />
    </div>
</template>

<style>
.Main {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    /* background: linear-gradient(#FF00D8, #00FF62); */
}

.Titlebar {
    position: fixed;
    height: 36px;
    top: 0px;
    left: 0;
    right: 0;
    z-index: 200;
    -webkit-app-region: drag;
    text-align: center;
    line-height: 36px;
    color: #fff;
}

.Console {
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background: rgba(0, 0, 0, 0.2);
    /* border-radius: 3px; */
    color: #fff;
    cursor: text;
    user-select: text;
}
.Console-inner {
    position: absolute;
    bottom: 0;
    left: 4px;
    right: 4px;
    top: 32px;
    overflow: scroll;
}

.Console-input {
    margin: 10px;
    line-height: 24px;
}

.Console-output {
    margin: 10px;
    white-space: pre-wrap;
}
</style>

<script>
import Recomend from "@/components/Recomend"

import Formula from "@/components/Formula"
const { ipcRenderer } = require("electron")
const child_process = require("child_process")
const path = require("path")

const HOMEDIR =
    process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"]

export default {
    components: {
        Recomend,
        Formula
    },
    mounted() {
        this.$refs.inputForm.focus()
    },
    data() {
        return {
            candidate: [],
            log: [],
            inputForm: [
                // {
                //     type: "text",
                //     val: "a"
                // }
            ],
            inputArr: [],
            searchWord: "",
            pwd: HOMEDIR,

            inputText: "",

            suggestY: 0
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
        },
        log: {
            deep: true,
            handler() {
                this.scrollToBottom()
            }
        },
        value() {
            this.scrollToBottom()
        }
    },
    created() {
        // 受信処理
        ipcRenderer.on("inputBlock", (event, block) => {
            this.inputBlock(block)
        })
    },
    methods: {
        updateInputText(text) {
            this.inputText = text
        },
        send() {
            this.$emit("send")
            this.focus()
        },
        clickConsole() {
            this.focus()
        },
        focus() {
            this.$refs.inputForm.focus()
        },
        scrollToBottom() {
            this.$nextTick(() => {
                this.$refs.inner.scrollTop = this.$refs.inner.scrollHeight
            })
        },
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
            this.$refs.inputForm.focus()
        },
        formulaToArray(input) {
            let s = []

            for (let block of input) {
                s.push(block.val)
            }

            return s
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
