let money = parseInt(localStorage.getItem('score')) || 0;

// Создание уведомления
const notification = document.createElement('div');
notification.className = 'notification';
document.body.appendChild(notification);

// Функция для отображения уведомления на 5сек
function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);
}

// Функция для обработки клика на задачу
function handleTaskClick(event) {
    event.preventDefault();

    const taskElement = event.currentTarget;
    const taskId = taskElement.getAttribute('data-id');
    const rewardAmount = parseInt(taskElement.querySelector('.task-reward span').textContent, 10);
    const redirectUrl = taskElement.getAttribute('data-url');

    // Проверка, была ли задача уже выполнена
    if (localStorage.getItem(`task-completed-${taskId}`)) {
        showNotification('Задание уже выполнено');
        return;
    }

    // Обновление баланса
    money += rewardAmount;
    localStorage.setItem('score', money);

    // Помечаем задачу как выполненную
    localStorage.setItem(`task-completed-${taskId}`, 'true');

    // Показываем уведомление
    showNotification('Задание выполнено!');

    // Перенаправление на указанную ссылку
    if (redirectUrl) {
        window.location.href = redirectUrl;
    }
}

// Привязка обработчика событий к каждому контейнеру задачи
document.querySelectorAll('.task').forEach(task => {
    task.addEventListener('click', handleTaskClick);
});
