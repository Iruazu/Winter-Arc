# GitHub Pages デプロイガイド

このガイドでは、Winter Arc Tracker を GitHub Pages にデプロイする手順を説明します。

## 📋 事前準備

1. **GitHub アカウント**を持っていること
2. **Git** がインストールされていること
3. プロジェクトファイルを準備

## 🚀 デプロイ手順

### ステップ 1: リポジトリ名を確認・設定

`vite.config.ts` の `base` オプションを、あなたのリポジトリ名に合わせて変更してください。

```typescript
// 例: リポジトリ名が "winter-arc-tracker" の場合
base: process.env.NODE_ENV === 'production' ? '/winter-arc-tracker/' : '/',
```

**重要**: リポジトリ名の前後に `/` を付けてください。

### ステップ 2: GitHub にリポジトリを作成

1. GitHub で新しいリポジトリを作成
   - リポジトリ名: `winter-arc-tracker` (または任意の名前)
   - Public または Private (Public 推奨)
   - README, .gitignore, license は追加しない（既にローカルにあるため）

2. ローカルでリポジトリを初期化

```bash
cd winter-arc-tracker  # プロジェクトディレクトリに移動
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/winter-arc-tracker.git
git push -u origin main
```

**注意**: `YOUR_USERNAME` を実際の GitHub ユーザー名に置き換えてください。

### ステップ 3: GitHub Pages を有効化

1. GitHub のリポジトリページで、**Settings** タブをクリック
2. 左サイドバーで **Pages** をクリック
3. **Source** セクションで以下を選択:
   - Source: `GitHub Actions`

これで、`main` ブランチにプッシュするたびに自動的にデプロイされます。

### ステップ 4: デプロイの確認

1. **Actions** タブで、ワークフローの実行状況を確認
2. 緑のチェックマークが表示されたら、デプロイ完了
3. アクセス URL: `https://YOUR_USERNAME.github.io/winter-arc-tracker/`

## 🔄 更新時のデプロイ

コードを変更した後、以下のコマンドで自動的にデプロイされます:

```bash
git add .
git commit -m "Update: 変更内容の説明"
git push
```

約 1-2 分後に、変更が反映されます。

## 🎨 カスタムドメインの設定（オプション）

独自ドメインを使用したい場合:

1. GitHub Pages 設定で **Custom domain** に独自ドメインを入力
2. DNS プロバイダーで CNAME レコードを設定:
   ```
   CNAME: www → YOUR_USERNAME.github.io
   ```
3. `public/` ディレクトリに `CNAME` ファイルを作成し、ドメイン名を記載

## 🛠️ トラブルシューティング

### デプロイが失敗する

**原因 1**: `base` パスが間違っている
- `vite.config.ts` の `base` がリポジトリ名と一致しているか確認

**原因 2**: GitHub Actions の権限が不足
- Settings → Actions → General → Workflow permissions
- "Read and write permissions" を選択

### ページが真っ白になる

**原因**: `base` パスが設定されていない
- `vite.config.ts` の `base` を正しく設定してください

### CSS が適用されない

**原因**: ビルド時のパスの問題
- ブラウザの開発者ツールでコンソールを確認
- 404 エラーが出ている場合、`base` パスを確認

### PWA 機能が動作しない

**原因**: HTTPS が必要
- GitHub Pages は自動的に HTTPS になるため、問題ないはずです
- アイコンファイル（`pwa-192x192.png`, `pwa-512x512.png`）が `public/` に存在するか確認

## 📱 モバイルでホーム画面に追加

1. Safari（iOS）または Chrome（Android）でサイトにアクセス
2. 「ホーム画面に追加」を選択
3. アプリのように起動できます

## 🔐 Private リポジトリでのデプロイ

GitHub Pages は Free プランでは Public リポジトリのみサポートしています。
Private リポジトリで GitHub Pages を使用するには、GitHub Pro 以上のプランが必要です。

## 🎯 デプロイ完了チェックリスト

- [ ] `vite.config.ts` の `base` をリポジトリ名に設定
- [ ] GitHub にリポジトリを作成
- [ ] ローカルでコミット・プッシュ
- [ ] Settings → Pages で GitHub Actions を有効化
- [ ] Actions タブでビルドが成功していることを確認
- [ ] デプロイされた URL にアクセスして動作確認

## 📞 サポート

問題が解決しない場合:
1. GitHub Actions のログを確認
2. ブラウザの開発者ツールでエラーを確認
3. Issue を作成して質問

---

Happy Winter Arc! 🏔️❄️
