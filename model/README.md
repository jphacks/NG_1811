# モデルのフォーマット
```json
{
  "cmd1":{
    "type":"command",
    "des":"コマンドの説明です",
    "val":"cmd",
    "predict":true,
    "@next":{
        "cmd2":{...},
        "cmd3":{...}
    }
  }
}
```
| item | Descripion |
| :-----: | :-----:|
| cmd | コマンドの要素(git,brew,-aなど) |
| des | コマンドの要素の説明文 |
| val | コマンドの名前 |
| type | コマンドの要素の種類 (command,option,arg,pipeなど) |
| predict |  Try木の次ノードに遷移するかどうか |
| ignore | predict = falseの場合のみ存在する。<br>現在のコマンドが選択された場合に同時に使えないコマンドの要素の名前<br>(findの場合-Hと-Lなど)
| @next | predict = trueの場合のみ存在する。<br>次の予測|

