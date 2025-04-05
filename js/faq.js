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
        const data = jsyaml.load(yamlSection);
        
        const faqContainer = document.getElementById('faq-list');
        
        data.questions.forEach((item, index) => {
            const faqId = `faq-${index + 1}`;
            const faqItem = document.createElement('div');
            faqItem.className = 'faq-item';
            faqItem.id = faqId;
            
            faqItem.innerHTML = `
                <div class="faq-question" onclick="toggleAnswer(this)">
                    <h3>${escapeHTML(item.question)}</h3>
                    <span class="toggle-btn">+</span>
                </div>
                <div class="faq-answer">
                    <p>${escapeHTML(item.answer)}</p>
                </div>
            `;
            
            faqContainer.appendChild(faqItem);

            // URLのハッシュと一致する場合は自動的に開く
            if (window.location.hash === `#${faqId}`) {
                setTimeout(() => {
                    const questionElement = faqItem.querySelector('.faq-question');
                    questionElement.click();
                    faqItem.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        });
    } catch (error) {
        console.error('FAQの読み込みに失敗しました:', error);
        const faqList = document.getElementById('faq-list');
        if (faqList) {
            faqList.innerHTML = '<p class="error-message">FAQの読み込みに失敗しました。</p>';
        }
    }
}

function toggleAnswer(element) {
    const answer = element.nextElementSibling;
    const toggleBtn = element.querySelector('.toggle-btn');
    
    if (answer.style.display === 'block') {
        answer.style.display = 'none';
        toggleBtn.textContent = '+';
    } else {
        answer.style.display = 'block';
        toggleBtn.textContent = '-';
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