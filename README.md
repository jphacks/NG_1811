# <img src="docs/assets/favicon.png" height="24"> Eterm

[![jphacks](https://img.shields.io/badge/jphacks-NG__1811-brightgreen.svg)](https://2018.jphacks.com/information/jphacks-award-finalists/)
[![award](https://img.shields.io/badge/award-Best_Hack_Day-yellow.svg)](https://2018.jphacks.com/information/jphacks-award-finalists/)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

公式サイト: https://eterm.tokyo

[![Thumbnail](docs/assets/screen.png)](https://eterm.tokyo)

[Hack Day時点の動画を再生](https://vimeo.com/296239145)

## 黒い画面 x Tech
黒い画面（CUI）は非常に便利かつ、ITエンジニアには必須なものです。   
しかし、その操作は初めての人には分かりにくく、学習は容易ではありません。  
そこで、プログラミングにおける[Scratch](https://scratch.mit.edu)のようなターミナルがあればよいのではないかと考えました。

## 特長

### 1. 独自のインターフェース
どこに何を入力すればよいのかが一目で分かる、グラフィカルなインターフェースを採用しています。  
コマンドやオプションの選択を、キーボードだけでなくマウスでも行えます。  

### 2. コマンドの推薦アルゴリズム
木構造のデータを用いた推薦機能を搭載しています。
専用のデータは、[モデルフォーマット](model)に従い作成できます。

## 解決出来ること
CUIのハードルを下げ、簡単に学べるようにします。

## 活用した技術
* [Electron](https://github.com/electron/electron)
* [Vue](https://github.com/vuejs/vue)

## 独自開発技術（Hack Dayで開発したもの）
* コマンド推薦アルゴリズムおよびモデル
* 独自のインターフェースを持ったデスクトップアプリケーション

