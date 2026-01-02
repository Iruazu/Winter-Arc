# ❌ エラー解決ガイド: "Failed to load module script"

## エラーメッセージ
```
Failed to load module script: Expected a JavaScript-or-Wasm module script 
but the server responded with a MIME type of "application/octet-stream"
```

## 原因

このエラーは、Vite の開発サーバーを使わずに `index.html` を直接開いていることが原因です。

## ✅ 正しい起動方法

### ステップ 1: ターミナル/コマンドプロンプトを開く

**Windows (PowerShell またはコマンドプロンプト)**
- Win + R → `cmd` または `powershell` と入力 → Enter

**Mac (ターミナル)**
- Cmd + Space → `terminal` と入力 → Enter

**Linux**
- Ctrl + Alt + T

### ステップ 2: プロジェクトディレクトリに移動

```bash
cd path/to/winter-arc-tracker
```

例:
```bash
# Windows
cd C:\Users\YourName\Downloads\winter-arc-tracker

# Mac/Linux
cd ~/Downloads/winter-arc-tracker
```

### ステップ 3: 依存関係をインストール（初回のみ）

```bash
npm install
```

**注意**: この処理には 2-5 分かかる場合があります。完了するまで待ってください。

### ステップ 4: 開発サーバーを起動

```bash
npm run dev
```

成功すると、以下のようなメッセージが表示されます:

```
  VITE v7.0.0  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### ステップ 5: ブラウザでアクセス

ブラウザが自動的に開かない場合、以下にアクセス:

```
http://localhost:5173
```

---

## 🚫 やってはいけないこと

### ❌ index.html をダブルクリックして開く

```
file:///C:/Users/.../winter-arc-tracker/index.html
```

このようなパス（`file://`）で開くと、モジュールが読み込めません。

### ✅ 必ず開発サーバー経由でアクセス

```
http://localhost:5173
```

---

## 🔧 その他のトラブルシューティング

### エラー: "npm: command not found"

**原因**: Node.js がインストールされていない

**解決方法**:
1. [Node.js 公式サイト](https://nodejs.org/) にアクセス
2. LTS（推奨版）をダウンロードしてインストール
3. ターミナルを再起動
4. `node --version` で確認

### エラー: "Cannot find module"

**原因**: 依存関係が正しくインストールされていない

**解決方法**:
```bash
# キャッシュをクリアして再インストール
rm -rf node_modules package-lock.json
npm install
```

Windows の場合:
```bash
rmdir /s /q node_modules
del package-lock.json
npm install
```

### ポート 5173 が既に使用されている

**解決方法**:
```bash
# 別のポートで起動
npm run dev -- --port 3000
```

### 開発サーバーが自動的に閉じる

**原因**: ターミナルを閉じた

**解決方法**:
- ターミナルは開いたままにしておく
- アプリを使用する間はターミナルを閉じない
- 終了する場合は Ctrl + C

---

## 📱 本番環境（GitHub Pages）の場合

GitHub Pages にデプロイ済みの場合、以下の URL でアクセスしてください:

```
https://YOUR_USERNAME.github.io/winter-arc-tracker/
```

ローカルの `index.html` を開く必要はありません。

---

## ✅ 正常に動作している場合

以下の画面が表示されます:

- ダークブルーの背景
- "Winter Arc" のタイトル
- 3つのデイリーミッション
- 進捗バー
- フッターに宣言文

---

## 🆘 それでも解決しない場合

1. ターミナルのエラーメッセージ全文をコピー
2. ブラウザの開発者ツール（F12）→ Console のエラーを確認
3. Node.js のバージョンを確認: `node --version`（18以上が必要）
4. npm のバージョンを確認: `npm --version`

これらの情報を添えて、問題を報告してください。
