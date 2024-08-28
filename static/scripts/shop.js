let money = parseInt(localStorage.getItem('score')) || 0;

function addMoney(amount) {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
        console.error('Неверная сумма. Введите положительное число');
        return;
    }
    money += parsedAmount;
    console.log(`Деньги добавлены. Текущая сумма: ${money}`);
    localStorage.setItem('score', money);
    document.getElementById('score').textContent = money;
}

function removeMoney(amount) {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
        console.error('Неверная сумма. Введите положительное число');
        return;
    }
    money -= parsedAmount;
    console.log(`Деньги списаны. Текущая сумма: ${money}`);
    localStorage.setItem('score', money);
    document.getElementById('score').textContent = money;
}

function delMoney() {
    money = 0
    console.log(`Счёт обнулён`);
    localStorage.setItem('score', money);
    document.getElementById('score').textContent = money;
}

function delStorage() {
    localStorage.clear()
}

function delPurchItems() {
    localStorage.setItem('add-energy-lvl', 0)
    localStorage.setItem('autoclicker-lvl', 0)
    localStorage.setItem('click-power-lvl', 0)
    document.getElementById('add-energy-lvl').textContent = '0 LVL';
    document.getElementById('click-power-lvl').textContent = '0 LVL';
    document.getElementById('autoclicker-lvl').textContent = '0 LVL';
}

document.addEventListener('DOMContentLoaded', () => {
    const scoreElement = document.getElementById('score');

    scoreElement.textContent = money;

    document.getElementById('add-energy-lvl').textContent = `${localStorage.getItem('add-energy-lvl') || '0'} LVL`;
    document.getElementById('autoclicker-lvl').textContent = `${localStorage.getItem('autoclicker-lvl') || '0'} LVL`;
    document.getElementById('click-power-lvl').textContent = `${localStorage.getItem('click-power-lvl') || '0'} LVL`;

    document.getElementById('add-energy-price').textContent = 4000 * 2 ** parseInt(localStorage.getItem('add-energy-lvl')) || 4000;
    document.getElementById('autoclicker-price').textContent = 7000 * 2 ** parseInt(localStorage.getItem('autoclicker-lvl')) || 7000;
    document.getElementById('click-power-price').textContent = 10000 * 2 ** parseInt(localStorage.getItem('click-power-lvl')) || 10000;

    // Функция для покупки предмета
    function buyItem(itemId) {
        const itemPriceElement = parseInt(document.getElementById(`${itemId}-price`).textContent);
        const itemLvlElement = document.getElementById(`${itemId}-lvl`);
        let itemLvl = parseInt(localStorage.getItem(`${itemId}-lvl`)) || 0;

        if (money >= itemPriceElement) {
            money -= itemPriceElement;
            if (itemId == 'add-energy') {
                localStorage.setItem('energy-limit', (itemLvl + 2) * 1000)
                console.log(localStorage)
            }
            itemLvl++;
            scoreElement.textContent = money;
            itemLvlElement.textContent = `${itemLvl} LVL`;
            document.getElementById(`${itemId}-price`).textContent = itemPriceElement * 2
            localStorage.setItem('score', money);
            localStorage.setItem(`${itemId}-lvl`, itemLvl);
        }
    }

    // Обработчики кликов на элементы товаров
    document.getElementById('add-energy').addEventListener('click', () => buyItem('add-energy'));
    document.getElementById('autoclicker').addEventListener('click', () => buyItem('autoclicker'));
    document.getElementById('click-power').addEventListener('click', () => buyItem('click-power'));
});
