<template>
  <div></div>
</template>

<script>
export default {
    props: ["input"],
    data() {
        return {
        }
    },
    watch: {
        input: {
            deep: true,
            handler() {
                this.update()
            }
        }
    },
    mounted() {
        this.update()
    },
    methods: {
        update() {
            const list = [
                {
                    type: "command",
                    val: "ls"
                },
                {
                    type: "option",
                    val: "-l"
                },
                {
                    type: "pipe"
                },
                {
                    type: "command",
                    val: "grep",
                    args: [
                        {
                            placeholder: "ワード",
                            val: ".json"
                        }
                    ]
                },
                {
                    type: "command",
                    val: "cat",
                    args: [
                        {
                            placeholder: "ファイル名",
                            val: "README.txt"
                        }
                    ]
                },
                {
                    type: "command",
                    val: "ping",
                    args: [
                        {
                            placeholder: "ホスト名"
                        }
                    ]
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
            ]
            this.$emit("update", list)
        }
    }
}
</script>
