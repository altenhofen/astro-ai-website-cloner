<div align="center">

# Astro AI ウェブサイトクローン

### 1つのコマンドで、あらゆるウェブサイトをクローン

AI コーディングエージェントに URL を渡すだけで、ウェブサイトをクリーンな Astro サイトとして再現できます。

このプロジェクトは [Astro AI ウェブサイトクローン](https://github.com/altenhofen/astro-ai-website-cloner) です。[JCodesMore の AI Website Cloner](https://github.com/JCodesMore/ai-website-cloner-template) をベースにしています。

</div>

## 前提条件

- Git
- [Node.js](https://nodejs.org/) 24 以降
- Node.js に含まれる npm
- `AGENTS.md` に従うエディターまたはコーディングエージェント

## 始め方

1. このテンプレートから自分のリポジトリを作成するか、フォークします。
2. コピーしたリポジトリをクローンして、プロジェクトディレクトリに移動します。

   ```bash
   git clone https://github.com/<owner>/<repository>.git
   cd <repository>
   ```

   すでにローカルでリポジトリを開いている場合は、この手順を飛ばします。

3. ロックされた依存関係をインストールします。

   ```bash
   npm ci
   ```

4. プロジェクトをエディターで開きます。VS Code の場合は次を実行します。

   ```bash
   code .
   ```

5. `AGENTS.md` を読みます。これはリポジトリ唯一の指示ファイルです。
6. クローンを始める前に `docs/research/CLONE_WORKFLOW.md` を読みます。

## ローカルでサイトを実行する

Astro の開発サーバーを起動します。

```bash
npm run dev
```

Astro が表示する URL を開きます。通常は [http://localhost:4321](http://localhost:4321) です。`src/`、`public/`、プロジェクト設定の変更は開発サーバーに自動反映されます。`Ctrl+C` で停止できます。

利用できるコマンド:

```bash
npm run dev        # 開発サーバーを起動
npm run build      # dist/ に静的サイトを生成
npm run preview    # 最新の dist/ ビルドをプレビュー
npm run lint       # Astro と Vanilla JavaScript をチェック
npm run typecheck  # astro check を実行
npm run check      # lint、typecheck、build を実行
```

コードやドキュメントを変更したら `npm run check` を実行します。`npm run preview` は最後に完了したビルドを配信するため、新しい変更を確認するときは先に `npm run build` を実行してください。

### Docker を使う場合（任意）

```bash
docker compose up dev --build   # ポート 3001 で開発サーバーを起動
docker compose up app --build   # ポート 3000 で本番プレビューを起動
```

コンテナを停止するには `docker compose down` を実行します。

## 対象サイトをクローンする

1. 作業中に結果を確認したい場合は、開発サーバーを起動します。
2. `AGENTS.md` と `docs/research/CLONE_WORKFLOW.md` を読みます。
3. 1つ以上の対象 URL をコーディングエージェントに渡します。
4. 元サイトをデスクトップ、タブレット、モバイル幅で調査します。
5. 抽出した調査結果を `docs/research/` に、スクリーンショットを `docs/design-references/` に保存します。
6. クローンのルートを `src/pages/` に、再利用可能な Astro コンポーネントを `src/components/` に、ダウンロードしたアセットを `public/` に保存します。
7. セマンティック HTML、Tailwind CSS、ブラウザ標準の Vanilla JavaScript を使います。小さな操作のためにフレームワークアイランドを追加しないでください。
8. `npm run check` を実行し、最後に `npm run preview` でビルド済みサイトを確認します。


## プロジェクト標準

`AGENTS.md` がリポジトリ唯一の指示ファイルです。エディターに依存しないワークフローを維持し、`docs/research/` の調査文書に従ってください。

**AI エージェントの動作に関する Issue は作成しないでください。このリポジトリは自分用のテンプレートであり、動作結果は対象サイトやエージェントによって異なります。**
