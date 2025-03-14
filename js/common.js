// ヘッダーの読み込み
fetch('components/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;
        
        // ヘッダー読み込み後にアクティブページを設定
        setActiveNavItem();

        // ヘッダー読み込み後にハンバーガーメニューの制御を初期化
        initMobileMenu();

        // スクロールイベントを監視
        window.addEventListener('scroll', function() {
            const header = document.querySelector('.header');
            if (window.scrollY > 0) {
                header.classList.add('scrolled'); // スクロール時にクラスを追加
            } else {
                header.classList.remove('scrolled'); // スクロールが戻ったらクラスを削除
            }
        });
    });

// フッターの既存のコード
document.addEventListener('DOMContentLoaded', function() {
    fetch('components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('フッターの読み込みに失敗しました:', error));
});

// アクティブなナビゲーションアイテムを設定する関数
function setActiveNavItem() {
    // 現在のページのパスを取得
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop();

    // すべてのナビゲーションリンクを取得
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        // リンクのhref属性から対象ページを取得
        const linkPath = link.getAttribute('href');
        
        // 現在のページとリンクが一致する場合、activeクラスを追加
        if (pageName === linkPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ハンバーガーメニューの制御を関数化
function initMobileMenu() {
    const hamburger = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav-menu');

    if (hamburger && nav) {
        // ハンバーガーメニューのクリックイベント
        hamburger.addEventListener('click', function() {
            nav.classList.toggle('active');
            const isOpen = nav.classList.contains('active');
            hamburger.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
        });

        // 画面外クリックでメニューを閉じる
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.nav-menu') && !event.target.closest('.mobile-menu-btn')) {
                nav.classList.remove('active');
                hamburger.setAttribute('aria-label', 'メニューを開く');
            }
        });

        // メニュー項目クリックでメニューを閉じる
        const navLinks = nav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                hamburger.setAttribute('aria-label', 'メニューを開く');
            });
        });
    }
}
