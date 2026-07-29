(function () {
    // 1. 書籍代號 → 圖片路徑 + 書籍資訊，一本書一筆資料
    const bookMap = {
        'naval': {
            img: './book/book-1.png',
            title: '納瓦爾寶典',
            subtitle: '從白手起家到財務自由，矽谷傳奇創投家的投資哲學與人生智慧',
            meta: '作者:艾瑞克・喬根森 ｜ 出版社:天下雜誌',
        },
        'decisive': {
            img: './book/book-2.png',
            title: '零偏見決斷法',
            subtitle: '如何擊退阻礙工作與生活的四大惡棍，用好決策扭轉人生',
            meta: '作者:奇普・希思、丹・希思 ｜ 出版社:大塊文化',
        },
        'putdown': {
            img: './book/book-3.png',
            title: '人生就是一次次的得到與放下',
            subtitle: '走到中年，黃大米最溫暖也最沈重的告白',
            meta: '作者:黃大米 ｜ 出版社:時報出版',
        },
        'sameasever': {
            img: './book/book-4.jpg',
            title: '一如既往',
            subtitle: '不變的人性法則與致富心態',
            meta: '作者:摩根．豪瑟 ｜ 出版社:天下文化',
        },
        'team': {
            img: './book/book-5.jpg',
            title: '全球最強團隊都在用的「心理安全感」溝通用語',
            meta: '作者:原田將嗣（著）、石井遼介（監修） ｜ 出版社:方舟文化',
        },
        'wave': {
            img: './book/book-6.png',
            title: '控制邊緣',
            subtitle: '未來科技與全球秩序的抉擇',
            meta: '作者:穆斯塔法．蘇萊曼、麥可．巴斯卡 ｜ 出版社:感電出版',
        },
        'safty': {
            img: './book/book-7.png',
            title: '心理安全感提問的技術',
            subtitle: '5步驟深掘對話，建立安心溝通循環，理解沒明說的想法，收穫隱藏的智慧',
            meta: '作者:傑夫．偉特斯勒 ｜ 出版社:天下雜誌',
        },
        // 之後新增書籍，照這個格式繼續加
    };

    // 2. 抓到彈窗需要控制的幾個元素
    const modal = document.getElementById('bookModal');
    const img = document.getElementById('bookModalImg');
    const titleEl = document.getElementById('bookModalTitle');
    const subtitleEl = document.getElementById('bookModalSubtitle');
    const metaEl = document.getElementById('bookModalMeta');
    const closeBtn = document.getElementById('bookModalClose');

    // 3. 開啟彈窗：這次要同時填入圖片、書名、資訊，比PDF那版多兩行
    function openModal(book) {
        img.src = book.img;
        img.alt = book.title;
        titleEl.textContent = book.title;
        subtitleEl.textContent = book.subtitle;
        metaEl.textContent = book.meta;
        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }

    // 4. 關閉彈窗
    function closeModal() {
        modal.classList.remove('is-open');
        document.body.style.overflow = '';
        setTimeout(() => { img.src = ''; }, 350);
    }

    // 5. 監聽所有帶 data-book 的元素
    document.querySelectorAll('[data-book]').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const slug = trigger.dataset.book;
            const book = bookMap[slug];

            if (!book) {
                console.warn(`找不到代號「${slug}」對應的書籍資料，檢查 bookMap 裡有沒有漏加這一筆`);
                return;
            }
            openModal(book);
        });
    });

    // 6. 三種關閉方式
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    });
})();