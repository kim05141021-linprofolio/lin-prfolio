(function () {
    const form = document.getElementById('contact-form');
    const toast = document.getElementById('toast');
    let toastTimer = null;

    function showToast(message, isError) {
        toast.textContent = message;
        toast.classList.toggle('is-error', !!isError);
        toast.classList.add('is-show');

        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            toast.classList.remove('is-show');
        }, 2000);
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // 攔截預設的整頁送出行為

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                showToast('已收到你的留言，謝謝您留下足跡。');
                form.reset();
            } else {
                showToast('送出時發生問題，請稍後再試一次。', true);
            }
        } catch (error) {
            showToast('網路異常，請稍後再試一次。', true);
        }
    });
})();