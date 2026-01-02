# Winter Arc Tracker - セットアップガイド

## 📦 インストール手順

### 1. プロジェクトのセットアップ

ダウンロードしたファイルを任意のディレクトリに展開してください。

```bash
cd winter-arc-tracker
```

### 2. 依存関係のインストール

```bash
npm install
```

**注意**: 初回インストールには数分かかる場合があります。

### 3. 開発サーバーの起動

```bash
npm run dev
```

成功すると、以下のようなメッセージが表示され、ブラウザが自動的に開きます:

```
VITE v7.0.0  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### 4. ブラウザで確認

`http://localhost:5173` にアクセスして、アプリが正しく動作することを確認してください。

## 🔧 トラブルシューティング

### エラー: "Failed to load module script"

**原因**: TypeScript設定または Vite 設定が不完全

**解決方法**:
1. `node_modules` を削除して再インストール:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. キャッシュをクリア:
   ```bash
   npm run dev -- --force
   ```

### エラー: "Cannot find module"

**原因**: 依存関係が正しくインストールされていない

**解決方法**:
```bash
npm install --legacy-peer-deps
```

### ポート 5173 が既に使用されている

**解決方法**:
```bash
npm run dev -- --port 3000
```

または、`vite.config.ts` の `server.port` を変更してください。

### Tailwind CSS が適用されない

**解決方法**:
1. `postcss.config.js` が存在することを確認
2. `tailwind.config.js` の `content` パスが正しいことを確認
3. 開発サーバーを再起動

## 📱 PWA（ホーム画面追加）機能の有効化

### アイコンの準備

1. `public/` ディレクトリに以下のファイルを配置:
   - `pwa-192x192.png` (192x192 pixels)
   - `pwa-512x512.png` (512x512 pixels)

2. 簡易的には、`public/icon.svg` を PNG に変換して使用できます:
   ```bash
   # ImageMagick を使用する場合
   convert public/icon.svg -resize 192x192 public/pwa-192x192.png
   convert public/icon.svg -resize 512x512 public/pwa-512x512.png
   ```

3. オンラインツールを使用:
   - https://realfavicongenerator.net/
   - https://www.favicon-generator.org/

### ビルドとデプロイ

```bash
npm run build
```

ビルドされたファイルは `dist/` ディレクトリに生成されます。

Vercel、Netlify、GitHub Pages などにデプロイして、HTTPS 経由でアクセスすることで、PWA 機能（ホーム画面追加、オフライン動作）が有効になります。

## 🎨 カスタマイズ

### フェーズ期間の変更

`src/components/winter-arc/types.ts`:
```typescript
export const WINTER_ARC_START = new Date('2026-01-01');
export const WINTER_ARC_END = new Date('2026-03-31');
```

### テーマカラーの変更

`tailwind.config.js`:
```javascript
colors: {
  midnight: {
    900: '#0f172a', // 背景色
    800: '#1e293b',
    700: '#334155',
  },
  ice: {
    DEFAULT: '#A5F3FC', // アクセントカラー
    500: '#A5F3FC',
    400: '#22d3ee',
  }
}
```

### モチベーション文の編集

`src/components/winter-arc/FooterDeclaration.tsx` を編集してください。

## 📊 データの永続化

現在、データは **LocalStorage** に保存されます（ブラウザ内のみ）。

### データのバックアップ

ブラウザの開発者ツール（F12）→ Application → Local Storage から手動でエクスポート可能です。

### クラウド同期の追加（将来の拡張）

Firebase、Supabase、または独自のバックエンドを統合して、複数デバイス間でのデータ同期が可能です。

## 🚀 本番環境へのデプロイ

### Vercel へのデプロイ

```bash
npm install -g vercel
vercel
```

### Netlify へのデプロイ

```bash
npm install -g netlify-cli
netlify deploy --prod
```

### GitHub Pages へのデプロイ

1. `vite.config.ts` に base を追加:
   ```typescript
   export default defineConfig({
     base: '/winter-arc-tracker/',
     // ...
   })
   ```

2. ビルドしてデプロイ:
   ```bash
   npm run build
   # dist/ をデプロイ
   ```

## 📝 ライセンス

Private use only.

---

問題が解決しない場合は、issue を作成するか、開発者に連絡してください。
