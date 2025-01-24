document.getElementById('generate_variant').addEventListener('click', generateTask_3ex);
document.getElementById('save_checking').addEventListener('click', checkAnswer_3ex);  

       function generateTask_3ex() {
            document.getElementById("feedback_3ex").textContent = '';
            document.getElementById("answer_3ex").value = '';
            document.getElementById("correct-answer_3ex").classList.add("hidden");
            document.getElementById("solution_3ex").classList.add("hidden");

            // Случайный выбор типа задания
            const taskType = Math.floor(Math.random() * 5);
            let questionText = "";
            let answer = "";
            let solutionText = "";

            if (taskType === 0) {
                // Тип задания 1: Найти единственное подходящее число из четырёх
                // Гарантируем, что одно число будет нечётным и меньше или равно 500, а остальные нет
                const correctNumber = Math.floor(Math.random() * 250) * 2 + 1; // нечётное число <= 500
                const otherNumbers = [
                    Math.floor(Math.random() * 500) + 501, // число > 500
                    Math.floor(Math.random() * 500) + 501, // число > 500
                    Math.floor(Math.random() * 250) * 2    // чётное число <= 500
                ];
                const numbers = [correctNumber, ...otherNumbers].sort(() => Math.random() - 0.5); // перемешиваем

                questionText = `Дано четыре числа: ${numbers.join(", ")}. Для какого из приведённых чисел истинно высказывание: НЕ (Число > 500) И (Число нечётное).`;
                answer = correctNumber;
                solutionText = `Число должно быть нечётным и меньше или равно 500. Подходит число: ${answer}.`;

            } else if (taskType === 1) {
                // Тип задания 2: Подсчет чётных двузначных чисел
                questionText = "Определите количество натуральных двузначных чисел, для которых истинно логическое выражение: НЕ (x нечётное) И НЕ (x > 51).";
                const validNumbers = [];
                for (let x = 10; x <= 51; x++) {
                    if (x % 2 === 0) validNumbers.push(x);
                }
                answer = validNumbers.length;
                solutionText = `Количество двузначных чётных чисел, меньше или равно 51, составляет ${answer}.`;

            } else if (taskType === 2) {
                // Тип задания 3: Найти наибольшее число, удовлетворяющее условию
                const upperLimit = Math.floor(Math.random() * 10) + 5;
                questionText = `Напишите наибольшее натуральное число x, для которого истинно высказывание: (x < ${upperLimit + 1}) И НЕ (x < ${upperLimit - 1}).`;
                answer = upperLimit;
                solutionText = `Наибольшее число, которое меньше ${upperLimit + 1} и больше или равно ${upperLimit - 1}, это ${answer}.`;

            } else if (taskType === 3) {
                // Тип задания 4: Подсчет чисел в диапазоне
                const rangeStart = Math.floor(Math.random() * 20) + 10;
                const rangeEnd = rangeStart + Math.floor(Math.random() * 10) + 5;
                questionText = `Определите количество натуральных чисел x, для которых истинно логическое выражение: НЕ (x < ${rangeStart}) И (x < ${rangeEnd}).`;
                const validNumbers = [];
                for (let x = rangeStart; x < rangeEnd; x++) {
                    validNumbers.push(x);
                }
                answer = validNumbers.length;
                solutionText = `Количество натуральных чисел от ${rangeStart} до ${rangeEnd - 1} составляет ${answer}.`;

            } else if (taskType === 4) {
                // Тип задания 5: Найти минимальное число, удовлетворяющее условиям
                const threshold = Math.floor(Math.random() * 50) + 20;
                questionText = `Напишите наименьшее целое число, для которого истинно высказывание: НЕ (x < ${threshold}) И НЕ (x > ${threshold + 10}).`;
                answer = threshold;
                solutionText = `Минимальное число, удовлетворяющее условию, это ${answer}, так как оно больше или равно ${threshold} и меньше или равно ${threshold + 10}.`;
            }

            document.getElementById("question_3ex").textContent = questionText;
            document.getElementById("correct-answer_3ex").textContent = `Ответ: ${answer}`;
            document.getElementById("solution_3ex").textContent = solutionText;

            window.currentAnswer = answer;
        }

        async function checkAnswer_3ex() {
            const userAnswer = document.getElementById("answer_3ex").value;
            if (userAnswer == window.currentAnswer) {
                document.getElementById("feedback_3ex").textContent = "Правильно!";
                console.log("Отправка запроса на обновление прогресса...");  // Проверка отправки запроса

                // Отправка прогресса на сервер
                try {
                    const response = await fetch('/user/progress/informatics/3', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'token': localStorage.getItem('token')
                        }
                    });
                    if (response.ok) {
                        console.log("Прогресс успешно обновлен");  // Подтверждение обновления
                        document.getElementById("feedback_3ex").textContent += " Прогресс обновлен.";
                    } else {
                        console.error("Ошибка обновления прогресса:", response.statusText);
                        document.getElementById("error-message").textContent = 'Ошибка обновления прогресса';
                    }
                } catch (error) {
                    console.error("Ошибка сети при обновлении прогресса:", error);
                    document.getElementById("error-message").textContent = 'Ошибка сети';
                }
            } else {
                document.getElementById("feedback_3ex").textContent = `Неправильно. `;
		document.getElementById("correct-answer_3ex").classList.remove("hidden");
            }
        }



        function showAnswer_3ex() {
            document.getElementById("correct-answer_3ex").classList.remove("hidden");
        }

        function showSolution_3ex() {
            document.getElementById("solution_3ex").classList.remove("hidden");
        }

