document.addEventListener('DOMContentLoaded', function() {
    loadNewsFromMarkdown();
});

// ニュースアイテムを格納する配列
let allNewsItems = [];
// 1ページあたりの表示件数
const itemsPerPage = 5;
// 現在のページ
let currentPage = 1;

async function loadNewsFromMarkdown() {
    try {
        // Markdownファイルのパス
        const mdFilePath = 'data/news.md';
        
        // ファイルを取得
        const response = await fetch(mdFilePath);
        if (!response.ok) {
            throw new Error('ファイルの読み込みに失敗しました');
        }
        
        const mdContent = await response.text();
        
        // Markdownを解析してニュースアイテムに変換
        allNewsItems = parseMarkdownToNewsItems(mdContent);
        
        // ニュースリストを表示（最初のページ）
        displayNewsPage(1);
    } catch (error) {
        console.error('ニュースデータの読み込みに失敗しました:', error);
        document.getElementById('news-list').innerHTML = '<p class="error-message">お知らせの読み込みに失敗しました。</p>';
    }
}

function parseMarkdownToNewsItems(mdContent) {
    // Markdownの各行を解析
    const lines = mdContent.split('\n');
    const newsItems = [];
    
    let currentItem = null;
    
    for (const line of lines) {
        // 新しいニュースアイテムの開始（## で始まる行）
        if (line.startsWith('## ')) {
            // 前のアイテムがあれば保存
            if (currentItem) {
                newsItems.push(currentItem);
            }
            
            // 新しいアイテムを作成
            const titleMatch = line.match(/## (.*)/);
            currentItem = {
                title: titleMatch ? titleMatch[1].trim() : '',
                date: '',
                category: '',
                link: '#'
            };
        } 
        // 日付の行
        else if (line.startsWith('- 日付:')) {
            const dateMatch = line.match(/- 日付: (.*)/);
            if (currentItem && dateMatch) {
                currentItem.date = dateMatch[1].trim();
            }
        } 
        // カテゴリーの行
        else if (line.startsWith('- カテゴリー:')) {
            const categoryMatch = line.match(/- カテゴリー: (.*)/);
            if (currentItem && categoryMatch) {
                currentItem.category = categoryMatch[1].trim();
            }
        } 
        // リンクの行
        else if (line.startsWith('- リンク:')) {
            const linkMatch = line.match(/- リンク: (.*)/);
            if (currentItem && linkMatch) {
                currentItem.link = linkMatch[1].trim();
            }
        }
    }
    
    // 最後のアイテムを追加
    if (currentItem) {
        newsItems.push(currentItem);
    }
    
    // 日付の新しい順にソート
    return newsItems.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });
}

function displayNewsPage(page) {
    currentPage = page;
    const newsListElement = document.getElementById('news-list');
    
    // 読み込み中の表示を削除
    newsListElement.innerHTML = '';
    
    // ページに表示するアイテムを計算
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = allNewsItems.slice(startIndex, endIndex);
    
    if (pageItems.length === 0) {
        newsListElement.innerHTML = '<p>現在お知らせはありません。</p>';
    } else {
        // 各ニュースアイテムをHTMLに追加
        pageItems.forEach(item => {
            // 日付をフォーマット
            const dateStr = formatDate(item.date);
            
            const newsItemHTML = `
                <div class="news-item">
                    <span class="news-date">${dateStr}</span>
                    <span class="news-category">${item.category}</span>
                    ${item.link !== '#' ? `<a href="${item.link}" class="news-link">${item.title}</a>` : `<span class="news-title">${item.title}</span>`}
                </div>
            `;
            
            newsListElement.insertAdjacentHTML('beforeend', newsItemHTML);
        });
    }
    
    // ページネーションを更新
    updatePagination();
}

function updatePagination() {
    const paginationElement = document.getElementById('news-pagination');
    const totalPages = Math.ceil(allNewsItems.length / itemsPerPage);
    
    if (totalPages <= 1) {
        paginationElement.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // 前へボタン
    paginationHTML += `<button class="pagination-btn prev-btn" ${currentPage === 1 ? 'disabled' : ''}>前へ</button>`;
    
    // ページ番号
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `<button class="pagination-btn page-num ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
    }
    
    // 次へボタン
    paginationHTML += `<button class="pagination-btn next-btn" ${currentPage === totalPages ? 'disabled' : ''}>次へ</button>`;
    
    paginationElement.innerHTML = paginationHTML;
    
    // イベントリスナーを追加
    const prevBtn = paginationElement.querySelector('.prev-btn');
    const nextBtn = paginationElement.querySelector('.next-btn');
    const pageButtons = paginationElement.querySelectorAll('.page-num');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                displayNewsPage(currentPage - 1);
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                displayNewsPage(currentPage + 1);
            }
        });
    }
    
    pageButtons.forEach(button => {
        button.addEventListener('click', () => {
            const page = parseInt(button.getAttribute('data-page'));
            displayNewsPage(page);
        });
    });
}

// 日付のフォーマット関数（YYYY.MM.DD形式に変換）
function formatDate(dateStr) {
    // 日付文字列をパース
    const date = new Date(dateStr);
    
    if (isNaN(date.getTime())) {
        // 日付が無効な場合はそのまま返す
        return dateStr;
    }
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}.${month}.${day}`;
} 
