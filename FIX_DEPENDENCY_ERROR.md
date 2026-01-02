# 🔧 依存関係エラーの修正方法

## 発生したエラー
```
npm error ERESOLVE unable to resolve dependency tree
npm error peer vite@"^3.1.0 || ^4.0.0 || ^5.0.0" from vite-plugin-pwa
```

## ✅ 解決済み

`package.json` を修正して、互換性のあるバージョンに更新しました。

## インストール方法（修正版）

### 方法 1: 更新された package.json でインストール（推奨）

最新の `package.json` を使用している場合:

```bash
npm install
```

これで問題なくインストールできるはずです。

---

### 方法 2: それでもエラーが出る場合

以下のコマンドを実行:

```bash
npm install --legacy-peer-deps
```

このフラグは、依存関係のバージョンチェックを緩和します。

---

### 方法 3: クリーンインストール

キャッシュをクリアして最初からインストール:

```bash
# Windows (PowerShell)
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install

# Windows (コマンドプロンプト)
rmdir /s /q node_modules
del package-lock.json
npm install

# Mac/Linux
rm -rf node_modules package-lock.json
npm install
```

---

## 📦 修正内容

| パッケージ | 旧バージョン | 新バージョン |
|-----------|------------|------------|
| vite | ^7.0.0 | ^6.0.5 |
| vite-plugin-pwa | ^0.20.5 | ^0.21.1 |

**理由**: Vite 7 は最新すぎて一部のプラグインが未対応のため、安定版の Vite 6 に変更しました。

---

## ✅ インストール成功の確認

インストールが成功すると、以下のようなメッセージが表示されます:

```
added 500 packages, and audited 501 packages in 2m

100 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

警告（WARN）が出ても問題ありません。エラー（ERROR）が出なければOKです。

---

## 🚀 次のステップ

インストール成功後、開発サーバーを起動:

```bash
npm run dev
```

成功すると:
```
  VITE v6.0.5  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

ブラウザで `http://localhost:5173` にアクセスしてください。

---

## 🆘 それでも解決しない場合

### Node.js のバージョン確認

```bash
node --version
```

**必要なバージョン**: v18.0.0 以上

古いバージョンの場合:
1. [Node.js 公式サイト](https://nodejs.org/ja) から最新の LTS 版をダウンロード
2. インストール後、ターミナルを再起動
3. 再度 `npm install` を実行

### npm のバージョン確認

```bash
npm --version
```

**必要なバージョン**: v9.0.0 以上

古い場合は更新:
```bash
npm install -g npm@latest
```

---

## 📝 よくある質問

**Q: `--legacy-peer-deps` を使っても大丈夫？**
A: はい、問題ありません。アプリは正常に動作します。

**Q: 警告がたくさん出るけど大丈夫？**
A: 黄色い警告（WARN）は無視して大丈夫です。赤いエラー（ERROR）がなければOKです。

**Q: インストールに時間がかかる**
A: 初回は 2-5 分かかることがあります。ネットワーク速度によります。

---

問題が解決したら、次は `npm run dev` でアプリを起動してください！
