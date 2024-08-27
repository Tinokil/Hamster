document.addEventListener('DOMContentLoaded', () => {
    const coin = document.getElementById('coin');
    const scoreElement = document.getElementById('score');
    const levelName = document.getElementById('level-name');
    const levelBar = document.getElementById('level-process');
    const energyElement = document.getElementById('energy-limit');

    let money = parseInt(localStorage.getItem('score')) || 0;
    let energy = parseInt(localStorage.getItem('energy-limit')) || 1000;


    scoreElement.textContent = money;
    energyElement.textContent = energy;

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
        } else if (money > 100000) {
            levelBar.style.width = '30%';
            levelName.textContent = 'MASTER';
        } else if (money > 50000) {
            levelBar.style.width = '20%';
            levelName.textContent = 'EXPERT';
        } else if (money > 10000) {
            levelBar.style.width = '10%';
            levelName.textContent = 'ADVANCED';
        } else {
            levelBar.style.width = '0%';
            levelName.textContent = 'NOVICE';
        }
    }
    checkLevel();

    // Обновление энергии раз в 1.4 секунды
    function updateEnergy() {
        energy += 2;
        energyElement.textContent = energy;
        localStorage.setItem('energy-limit', energy);
    }

    setInterval(updateEnergy, 1400);

    coin.addEventListener('click', (event) => {
        // Увеличение счета
        if (energy > 0) {
            money++;
            energy--;
        };
        scoreElement.textContent = money;
        energyElement.textContent = energy;
        checkLevel()
        localStorage.setItem('score', money);
        localStorage.setItem('energy-limit', energy);

        // Уменьшение монетки при клике
        coin.style.transform = 'scale(0.9)';
        setTimeout(() => {
            coin.style.transform = 'scale(1)';
        }, 20);
    });
});
