<template>
    <div class="App">
        <Sidebar :blocks="candidate" @inputBlock="inputBlock" />
        <Console :log="log" v-model="inputForm" @send="send" />
    </div>
</template>

<script>
import Console from "@/components/Console"
import Sidebar from "@/components/Sidebar"

export default {
    components: {
        Console,
        Sidebar
    },
    data() {
        return {
            candidate: [
                {
                    type: "command",
                    val: "vi",
                    args: [
                        {
                            placeholder: "ファイル名"
                        },
                        {
                            placeholder: "ファイル名2"
                        }
                    ]
                },
                {
                    type: "command",
                    val: "vi",
                    args: [
                        {
                            placeholder: "ファイル名",
                            val: "README.txt"
                        }
                    ]
                },
                {
                    type: "command",
                    val: "sl"
                },
                {
                    type: "option",
                    val: "-l"
                },
                {
                    type: "option",
                    val: "-n",
                    args: [
                        {
                            placeholder: "回数"
                        }
                    ]
                }
            ],
            log: [],
            inputForm: []
        }
    },
    methods: {
        inputBlock(block) {
            this.inputForm.push(block)
        },
        send() {
            const f = JSON.parse(JSON.stringify(this.inputForm))
            console.log(f)
            this.log.push({
                inputFormula: f,
                outputString: "output sample"
            })
            this.inputForm.splice(0)
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
