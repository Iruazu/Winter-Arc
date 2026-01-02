# Winter Arc Tracker

2026年1月1日〜3月31日の自己改善期間（Winter Arc）を追跡するためのPWA対応習慣トラッカー。

## 機能

- **3つのデイリーミッション**
  - 全身トレーニング 15分（緊急避難ルール適用）
  - 英語スピーキング 5-10分
  - 技術スタック強化

- **進捗表示**
  - フェーズ表示（1月: 基礎固め / 2月: インターン開始 / 3月: 成果創出）
  - 進捗バー
  - 期末試験期間アラート（2/3 - 2/9）

- **英語学習ログ**
  - 毎日覚えた英文を記録
  - 履歴表示・削除機能

- **モチベーション管理**
  - フッターに「最後の宣言」を表示（開閉可能）

## セットアップ

### 必要な環境

- Node.js 18以上
- npm または yarn

### インストール手順

1. 依存関係のインストール:
```bash
npm install
```

2. 開発サーバーの起動:
```bash
npm run dev
```

ブラウザで `http://localhost:5173` が自動的に開きます。

### ビルド

```bash
npm run build
```

ビルドされたファイルは `dist/` ディレクトリに生成されます。

### プレビュー

```bash
npm run preview
```

## 技術スタック

- **フレームワーク**: React 18 + TypeScript
- **ビルドツール**: Vite 7
- **スタイリング**: Tailwind CSS
- **アイコン**: Lucide React
- **日付処理**: date-fns
- **PWA**: vite-plugin-pwa
- **状態管理**: React Hooks (useState, useEffect)
- **永続化**: LocalStorage

## プロジェクト構造

```
.
├── src/
│   ├── components/
│   │   └── winter-arc/
│   │       ├── WinterArcApp.tsx      # メインコンテナ
│   │       ├── Header.tsx            # フェーズ・進捗表示
│   │       ├── DailyChecklist.tsx    # タスクリスト
│   │       ├── SentenceLog.tsx       # 英語学習ログ
│   │       ├── FooterDeclaration.tsx # モチベーション文
│   │       └── types.ts              # 型定義
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## カスタマイズ

### フッターの宣言文を編集

`src/components/winter-arc/FooterDeclaration.tsx` を編集してください。

### フェーズ期間の変更

`src/components/winter-arc/types.ts` で以下の定数を変更:
```typescript
export const WINTER_ARC_START = new Date('2026-01-01');
export const WINTER_ARC_END = new Date('2026-03-31');
```

### テーマカラーの変更

`tailwind.config.js` の `colors` セクションを編集してください。

## ライセンス

Private use only.

## 🚀 GitHub Pages へのデプロイ

詳細な手順は [DEPLOY_GITHUB_PAGES.md](./DEPLOY_GITHUB_PAGES.md) を参照してください。

### クイックスタート

1. `vite.config.ts` の `base` をリポジトリ名に設定
2. GitHub にリポジトリを作成してプッシュ
3. Settings → Pages で GitHub Actions を有効化

デプロイ後、`https://YOUR_USERNAME.github.io/winter-arc-tracker/` でアクセス可能になります。
