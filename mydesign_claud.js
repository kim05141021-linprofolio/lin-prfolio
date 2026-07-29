(function () {
    // 1. 專案代號 → PDF 路徑，一個專案一行，之後新增作品只要加一行
    const pdfMap = {
        'bizsonar': './pdf_zip/Bizsonar_compressed.pdf',
        'mrt': './pdf_zip/MRT_compressed.pdf',
        'news': './pdf_zip/news_compressed.pdf',
        'mei': './pdf_zip/MEI_compressed.pdf',
        'dash-board': './pdf_zip/dash_board_compressed.pdf',
        'scane': './pdf_zip/scane_compressed.pdf',
        'dm': './pdf_zip/DM_compressed.pdf',
        'interview': './pdf_zip/Interview_compressed.pdf',
        'coffee': './pdf_zip/coffee_compressed.pdf'
        // 之後新增作品，就在這裡多加一行 'slug': '路徑'
    };

    // 2. 抓到彈窗需要控制的幾個元素
    const modal = document.getElementById('pdfModal');
    const frame = document.getElementById('pdfModalFrame');
    const closeBtn = document.getElementById('pdfModalClose');

    // 3. 開啟彈窗
    function openModal(pdfPath) {
        frame.src = pdfPath;
        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }

    // 4. 關閉彈窗
    function closeModal() {
        modal.classList.remove('is-open');
        document.body.style.overflow = '';
        setTimeout(() => { frame.src = ''; }, 350);
    }

    // 5. 監聽所有帶 data-project 的元素
    document.querySelectorAll('[data-project]').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const slug = trigger.dataset.project;
            const pdfPath = pdfMap[slug];

            if (!pdfPath) {
                console.warn(`找不到代號「${slug}」對應的 PDF，檢查 pdfMap 裡有沒有漏加這一筆`);
                return;
            }
            openModal(pdfPath);
        });
    });

    // 6. 三種關閉方式
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    });
})();