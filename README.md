# ケアぷらん樹 公式ウェブサイト

## 概要
介護サービス「ケアぷらん樹」の公式ウェブサイトのソースコードです。

## 機能
- 会社概要の紹介
- 提供サービスの案内
  - 訪問介護
  - デイサービス
  - ケアプラン作成
- お問い合わせフォーム
- よくある質問（FAQ）
- お知らせ機能

## 技術スタック
- HTML5
- CSS3
- JavaScript
- Cloudflare Pages（ホスティング）

## ローカルでの実行方法
1. リポジトリをクローン
```bash
git clone https://github.com/sueccho/hp_itsuki.git
```
2. `index.html` をブラウザで開く

## デプロイ方法
このプロジェクトは継続的デプロイメント（CD）が設定されています：

1. mainブランチへの変更をプッシュ
2. 自動的にCloudflare Pagesへデプロイが開始
3. デプロイ完了後、本番環境に反映

## 開発者向け情報
- アクセス認証が必要です
  - ID: halo
  - パスワード: smile
- 各種設定は `js/` ディレクトリ内のファイルで管理されています
- ヘッダーとフッターは共通コンポーネントとして管理
  - `components/header.html`と`components/footer.html`を`common.js`で各ページに読み込み

## EmailJS設定手順（careplanitsuki@gmail.comで作成済み）

1. EmailJSアカウントの作成
   - [EmailJS公式サイト](https://www.emailjs.com/)でアカウントを作成
   - Gmailアカウントとの連携を許可

2. EmailJSサービスの設定
   - ダッシュボードから「Email Services」を選択
   - Gmail連携を選択し設定
   - 現在のService ID: `service_8g4z15n`

3. メールテンプレートの作成
   - 「Email Templates」から新規テンプレートを作成
   - 以下の変数を使用してテンプレートを作成：
     - {{from_name}} - 送信者名
     - {{from_email}} - 送信者のメールアドレス
     - {{phone}} - 電話番号
     - {{subject}} - お問い合わせ項目
     - {{message}} - お問い合わせ内容
   - 現在のTemplate ID: `template_xppje39`

4. Public Keyの設定
   - 「Account」から「API Keys」セクションで確認可能
   - 現在のPublic Key: `_9kqBU4yGpjuFwWcS`

注意: これらのIDやKeyを変更した場合は、`contact.html`の対応する値も更新が必要です。送信先はcareplanitsuki@gmail.com。

## 更新履歴
### v1.0.0 (2025-03-09)
- githubでリモートリポジトリを作成して制作開始

### v1.1.0 (2025-03-09)
- トップページの作成
- 会社概要の作成
- サービス案内の作成

### v1.2.0 (2025-03-13)
- Cloudflare Pagesとの連携
- 自動デプロイの設定

### v1.3.0 (2025-03-15)
- ログイン方式をPromptからHTMLに変更
- お問合せの作成
- FAQの作成
- ヘッダーやフッターを別ファイルにして1つで管理し各ページに挿入するJSを追加
- Responsive対応でヘッダーのハンバーガーメニュー化（動かなかったため改修）

### v1.4.0 (2025-04-15)
- 会社概要ページの画像サイズ最適化と代表取締役の画像更新
- ヒーローセクションのデザイン改善とアニメーション調整

### v1.5.0 (2025-04-16)
- FAQセクションのスクロール機能改善とiOS Safari対応
- CSSスタイルの最適化とフォントサイズ調整
- ニュース項目のリンク表示改善

### v1.6.0 (2025-04-22)
- お知らせセクションのスクロール機能改善
- プライバシーポリシーの更新とニュースリスト機能強化

### v1.7.0 (2025-04-30)
- contact.htmlのメール送信機能強化（reCAPTCHA導入）
- プライバシーポリシーの更新日修正
- 会社概要の役職名表記統一

### v1.8.0 (2025-05-28)
- reCAPTCHA検証機能の実装完了
- メインブランチのマージと開発環境の整理


## ファイル構成
```plaintext
hp_itsuki/
├── index.html          # トップページ
├── index_test.html     # テスト用トップページ
├── company.html        # 会社概要ページ
├── services.html       # サービス案内ページ
├── contact.html        # お問い合わせページ
├── faq.html           # よくある質問ページ
├── privacy-policy.html # プライバシーポリシーページ
├── verify_recaptcha.php # reCAPTCHA検証用スクリプト
├── 重要事項説明書.doc   # 重要事項説明書
├── 運営規定.docx       # 運営規定
├── original_yamashita.jpg # オリジナル画像
├── css/               # スタイルシート関連ファイル
├── js/                # JavaScriptファイル
├── components/        # 共通コンポーネント
├── data/             # データファイル
├── images/           # 画像ファイル
└── .vscode/          # VSCode設定ファイル
```

## メモ
- ダミー画像記述：https://placehold.jp/350x250.png?text=




# サーバ
- [XServer](https://www.xserver.ne.jp/)

