document.addEventListener('DOMContentLoaded', () => {
    const scoreElement = document.getElementById('score');
    const copyButton = document.querySelector('.refferal button');
    const referralUrl = document.querySelector('#refferal-url');

    let money = parseInt(localStorage.getItem('score')) || 0;
    scoreElement.textContent = money;

    copyButton.addEventListener('click', function() {
        // Используем Clipboard API для копирования текста
        navigator.clipboard.writeText(referralUrl.textContent)
            .catch(err => {
                // Обработка ошибок при копировании
                console.error('Ошибка при копировании: ', err);
            });
    });
});