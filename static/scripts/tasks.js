// Создание уведомления
const notification = document.createElement('div');
notification.className = 'notification';
document.body.appendChild(notification);

// Функция для отображения уведомления на 5 секунд
function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
        notification.classList.add('hide');
        setTimeout(() => {
            notification.classList.remove('hide');
        }, 400); // Время анимации исчезновения
    }, 5000);
}


// Функция для обработки клика на задачу
function handleTaskClick(event) {
    event.preventDefault();

    let money = parseInt(localStorage.getItem('score')) || 0;
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

// Удаление уведомления при нажатии
notification.addEventListener('click', () => {
    notification.classList.remove('show');
    notification.classList.add('hide');
    setTimeout(() => {
        notification.classList.remove('hide');
    }, 400); // Время анимации исчезновения
});
