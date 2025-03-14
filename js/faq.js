async function loadFAQ() {
    try {
        const response = await fetch('./data/faq.md');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        
        // Front MatterのYAMLをパース
        const parts = text.split('---');
        if (parts.length < 3) {
            throw new Error('Invalid FAQ markdown format');
        }
        const yamlSection = parts[1];
        const faqData = jsyaml.load(yamlSection);
        
        const faqContainer = document.getElementById('faq-list');
        
        faqData.questions.forEach(item => {
            const faqHTML = `
                <div class="faq-item">
                    <div class="faq-question">
                        <h3>${escapeHTML(item.question)}</h3>
                        <span class="toggle-btn">＋</span>
                    </div>
                    <div class="faq-answer">
                        <p>${escapeHTML(item.answer)}</p>
                    </div>
                </div>
            `;
            faqContainer.insertAdjacentHTML('beforeend', faqHTML);
        });

        // アコーディオン機能の設定
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                const toggleBtn = question.querySelector('.toggle-btn');
                
                answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
                toggleBtn.textContent = answer.style.display === 'block' ? '－' : '＋';
            });
        });
    } catch (error) {
        console.error('FAQの読み込みに失敗しました:', error);
        const faqList = document.getElementById('faq-list');
        if (faqList) {
            faqList.innerHTML = '<p>FAQの読み込みに失敗しました。</p>';
        }
    }
}

// HTMLエスケープ用のヘルパー関数
function escapeHTML(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
} 