## ⚠️ デプロイ前に必ず確認してください

### リポジトリ名の設定

GitHub Pages にデプロイする前に、`vite.config.ts` の **base** オプションを、あなたの **実際のリポジトリ名** に変更する必要があります。

#### 現在の設定（デフォルト）

```typescript
base: process.env.NODE_ENV === 'production' ? '/winter-arc-tracker/' : '/',
```

#### あなたのリポジトリ名が異なる場合

例えば、リポジトリ名を `my-winter-arc` にする場合:

```typescript
base: process.env.NODE_ENV === 'production' ? '/my-winter-arc/' : '/',
```

**重要**:
- リポジトリ名の前後に `/` を必ず付けてください
- スペルミスがないか確認してください
- ローカル開発時は常に `/` になります（自動切り替え）

---

### リポジトリ名の確認方法

GitHub でリポジトリを作成した後、URL を確認してください:

```
https://github.com/YOUR_USERNAME/your-repo-name
                                  ^^^^^^^^^^^^^^^^
                                  これがリポジトリ名
```

この `your-repo-name` の部分を `vite.config.ts` に設定してください。

---

### 設定例

| リポジトリ名 | vite.config.ts の設定 |
|-------------|---------------------|
| `winter-arc-tracker` | `'/winter-arc-tracker/'` |
| `winter-arc` | `'/winter-arc/'` |
| `habit-tracker` | `'/habit-tracker/'` |
| `my-tracker-2026` | `'/my-tracker-2026/'` |

---

### 変更後のテスト

1. ローカルで動作確認:
   ```bash
   npm run dev
   ```

2. ビルドして確認:
   ```bash
   npm run build
   npm run preview
   ```

3. 問題なければ GitHub にプッシュ

---

詳細は [DEPLOY_GITHUB_PAGES.md](./DEPLOY_GITHUB_PAGES.md) を参照してください。
