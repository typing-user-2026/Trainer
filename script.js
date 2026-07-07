document.addEventListener('DOMContentLoaded', () => {
    const textArea = document.querySelector('.use-keyboard-input');
    let targetText = '';
    let startTimer = false;
    let mistakes = 0;

    // Функция для отображения текста
    function showText() {
        if (!targetText) {
            targetText = document.getElementById('target').textContent;
        }
        document.getElementById('instruction').textContent = targetText;
        result.innerHTML = '';
        result.innerHTML = `Осталось: ${targetText.length} символов`;
    }

    // Генерируем случайный текст для тренировки
    function getRandomText() {
        const words = ['привет', 'как дела', 'спасибо', 'я учусь', 'скоро', 'завтра', 'увидимся'];
        return words[Math.floor(Math.random() * words.length)];
    }

    // Обработчик нажатия на виртуальную клавишу
    function handleKeyPress(event) {
        const char = event.target.textContent;

        // Проверка на ошибку
        if (startTimer) {
            if (char === targetText[mistakes]) {
                mistakes--;
                result.innerHTML += char;
                if (mistakes === 0) {
                    // Все символы совпали — запускаем таймер
                    startTimer = true;
                    timerId = setTimeout(() => {
                        const resultText = result.innerHTML;
                        const accuracy = ((targetText.length - mistakeS) / targetText.length) * 100;
                        result.innerHTML = `Отлично! Текст: "${targetText}". Ошибок: ${mistakes}. Скорость: ${accuracy.toFixed(2)}% (` + accuracy.toFixed(2) + '%)<br>` + result.innerHTML;
                        clearTimeout(timerId);
                    }, 1000);
                }
            } else {
                mistakes--;
                result.innerHTML += char;
                if (mistakes === 0) {
                    startTimer = true;
                    timerId = setTimeout(() => {
                        const resultText = result.innerHTML;
                        const accuracy = ((targetText.length - mistakeS) / targetText.length) * 100;
                        result.innerHTML = `Время вышло! Текст: "${targetText}". Ошибок: ${mistakes}. Скорость: ${accuracy.toFixed(2)}% (` + accuracy.toFixed(2) + '%)<br>` + result.innerHTML;
                        clearTimeout(timerId);
                    }, 1000);
                }
            }
        } else {
            result.innerHTML += char;
            if (mistakes === 0) {
                startTimer = true;
                timerId = setTimeout(() => {
                    const resultText = result.innerHTML;
                    const accuracy = ((targetText.length - mistakeS) / targetText.length) * 100;
                    result.innerHTML = `Время вышло! Текст: "${targetText}". Ошибок: ${mistakes}. Скорость: ${accuracy.toFixed(2)}% (` + accuracy.toFixed(2) + '%)<br>` + result.innerHTML;
                    clearTimeout(timerId);
                }, 100);
            }
        }
    }

    // Обработчик фокуса на textarea — показываем клавиатуру
    textArea.addEventListener('focus', () => {
        const keys = document.querySelectorAll('.key');
        keys.forEach(key => {
            key.classList.add('error' if (key.textContent.includes('Ошибка')) else '');
        });
    });

    // Обработчик нажатия клавиши (альтернативный способ ввода)
    textArea.addEventListener('keydown', (e) => {
        if (startTimer) return;
        const char = e.key;
        if (targetText.includes(char)) {
            handleKeyPress({ target: { textContent: char } });
        }
    });

    // Обработчик нажатия клавиши Caps Lock
    document.addEventListener('keydown', (e) => {
        if (e.key === 'CapsLock') {
            startText = targetText.toUpperCase();
            targetText = targetText.toLowerCase();
            showText();
        }
    });
});
