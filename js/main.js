// ヒーローセクションのテキストアニメーション
function animateHeroText() {
    const textElements = document.querySelectorAll('.animate-text');
    const fadeElements = document.querySelectorAll('.animate-fade');

    // アニメーションをリセット
    textElements.forEach(element => {
        element.classList.remove('active');
        void element.offsetWidth;
    });
    fadeElements.forEach(element => {
        element.classList.remove('active');
        void element.offsetWidth;
    });

    // アニメーションを開始
    textElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('active');
        }, index * 400);
    });

    fadeElements.forEach((element) => {
        element.classList.add('active');
    });

    // 最後の要素のアニメーション完了から5秒後に再度アニメーションを実行
    const totalAnimationTime = (textElements.length * 400) + 5000;
    setTimeout(animateHeroText, totalAnimationTime);
}

// ページ読み込み時にアニメーションを開始
window.addEventListener('load', () => {
    animateHeroText();
});

// モバイルメニューの制御
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', function() {
        console.log('メニューボタンがクリックされました'); // デバッグ用
        navMenu.classList.toggle('active');
        
        // スタイルを直接操作
        if (navMenu.style.display === 'block') {
            navMenu.style.display = 'none';
            mobileMenuBtn.textContent = '☰';
        } else {
            navMenu.style.display = 'block';
            mobileMenuBtn.textContent = '×';
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // モバイルメニューの制御
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    mobileMenuBtn.addEventListener('click', function() {
        // メニューの表示/非表示を切り替え
        if (navMenu.style.display === 'block') {
            navMenu.style.display = 'none';
        } else {
            navMenu.style.display = 'block';
        }
    });

    // スクロールアニメーション
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}); 

document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    menuButton.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
}); 

// スクロールアニメーション
function initFlowAnimation() {
    const flowItems = document.querySelectorAll('.flow-item');
    
    const options = {
        root: null,
        rootMargin: '-50px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // 各要素のディレイを800msに増加
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 800);  // 500msから800msに変更
                observer.unobserve(entry.target);
            }
        });
    }, options);

    flowItems.forEach(item => {
        observer.observe(item);
    });
}

// DOMの読み込み完了後に実行
document.addEventListener('DOMContentLoaded', () => {
    initFlowAnimation();
}); 
