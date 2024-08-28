document.addEventListener('DOMContentLoaded', () => {
    const coin = document.getElementById('coin');
    const scoreElement = document.getElementById('score');
    const levelName = document.getElementById('level-name');
    const levelBar = document.getElementById('level-process');
    const energyElement = document.getElementById('energy-limit');

    let money = parseInt(localStorage.getItem('score')) || 0;
    let energy = parseInt(localStorage.getItem('energy')) || 1000;
    let maxEnergy = parseInt(localStorage.getItem('energy-limit')) || 1000;


    scoreElement.textContent = money;
    energyElement.textContent = energy;

    // Провека уровня
    function checkLevel() {
        if (money > 5000000000) {
            levelBar.style.width = '100%';
            levelName.textContent = 'RULER';
        } else if (money > 500000000) {
            levelBar.style.width = '90%';
            levelName.textContent = 'SAGE';
        } else if (money > 150000000) {
            levelBar.style.width = '80%';
            levelName.textContent = 'GANGSTER';
        } else if (money > 70000000) {
            levelBar.style.width = '70%';
            levelName.textContent = 'ELITE';
        } else if (money > 10000000) {
            levelBar.style.width = '60%';
            levelName.textContent = 'PRO';
        } else if (money > 1000000) {
            levelBar.style.width = '50%';
            levelName.textContent = 'HERO';
        } else if (money > 500000) {
            levelBar.style.width = '40%';
            levelName.textContent = 'LEGEND';
        } else if (money > 120000) {
            levelBar.style.width = '30%';
            levelName.textContent = 'MASTER';
        } else if (money > 60000) {
            levelBar.style.width = '20%';
            levelName.textContent = 'EXPERT';
        } else if (money > 20000) {
            levelBar.style.width = '10%';
            levelName.textContent = 'ADVANCED';
        } else {
            levelBar.style.width = '0%';
            levelName.textContent = 'NOVICE';
        }
    }
    checkLevel();

    function updateEnergyIcon() {
        energyPicture = document.getElementById('energy-image');
        if (energy <= 0) {
            energyPicture.src = 'https://github.com/Tinokil/Hamster/blob/main/static/images/bulb/light%20bulb%200.png?raw=true';
        } else if (energy < maxEnergy * 0.25) {
            energyPicture.src = 'https://github.com/Tinokil/Hamster/blob/main/static/images/bulb/light%20bulb%201.png?raw=true';
        } else if (energy < maxEnergy * 0.5) {
            energyPicture.src = 'https://github.com/Tinokil/Hamster/blob/main/static/images/bulb/light%20bulb%202.png?raw=true';
        } else if (energy < maxEnergy * 0.75) {
            energyPicture.src = 'https://github.com/Tinokil/Hamster/blob/main/static/images/bulb/light%20bulb%203.png?raw=true';
        } else if (energy < maxEnergy) {
            energyPicture.src = 'https://github.com/Tinokil/Hamster/blob/main/static/images/bulb/light%20bulb%204.png?raw=true';
        } else {
            energyPicture.src = 'https://github.com/Tinokil/Hamster/blob/main/static/images/bulb/light%20bulb%205.png?raw=true';
        };
    }

    // Обновление энергии раз в 1,7 секунды
    function updateEnergy() {
        if (energy + 2 <= maxEnergy) {
            energy += 2;
        } else if (energy + 1 <= maxEnergy) {
            energy += 1;
        }
        energyElement.textContent = energy;
        localStorage.setItem('energy', energy);
        updateEnergyIcon()
    }

    setInterval(updateEnergy, 1700);

    // Действия при клике на монету
    coin.addEventListener('click', (event) => {
        // Увеличение счета
        if (energy > 0) {
            money++;
            energy--;
        };

        updateEnergyIcon()

        scoreElement.textContent = money;
        energyElement.textContent = energy;

        checkLevel()
        // Сохранение данных
        localStorage.setItem('score', money);
        localStorage.setItem('energy', energy);

        // Уменьшение монетки при клике
        coin.style.transform = 'scale(0.9)';
        setTimeout(() => {
            coin.style.transform = 'scale(1)';
        }, 20);
    });
});
