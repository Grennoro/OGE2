const executors = [            
            { name: "Вычислитель", commands: ["умножь на b", "прибавь 1"], operation: (value, b, cmd) => cmd === 1 ? value * b : value + 1 },
            { name: "Сигма", commands: ["прибавь 1", "раздели на b"], operation: (value, b, cmd) => cmd === 2 && value % b === 0 ? value / b : value + 1 },
            { name: "Омега", commands: ["прибавь 4", "умножь на b"], operation: (value, b, cmd) => cmd === 1 ? value + 4 : value * b },
            { name: "Умножитель", commands: ["вычти 1", "умножь на b"], operation: (value, b, cmd) => cmd === 1 ? value - 1 : value * b },
            { name: "Сумматор", commands: ["прибавь b", "умножь на 3"], operation: (value, b, cmd) => cmd === 1 ? value + b : value * 3 },
        ];

        let currentTask_5ex = {};

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

	document.getElementById('generate_variant').addEventListener('click', generateTask_5ex);
 	document.getElementById('save_checking').addEventListener('click', checkAnswer_5ex);

        function generateTask_5ex() {
            const executor = executors[getRandomInt(0, executors.length - 1)];
            const bValue = getRandomInt(2, 10);
            let startValue = getRandomInt(1, 50);
            let targetValue = getRandomInt(5, 200);

            let currentValue = startValue;
            let program = "";

            // Генерируем команду так, чтобы она не делила число с остатком
            for (let i = 0; i < 5; i++) {
                const command = getRandomInt(1, 2);
                const result = executor.operation(currentValue, bValue, command);
                
                if (command === 1 && (executor.commands[command - 1].includes("раздели") || executor.commands[command - 1].includes("на b")) && result % 1 !== 0) {
                    i--;
                    continue;
                } else {
                    program += command;
                    currentValue = result;
                }
            }

            const isValidEnd = Math.abs(currentValue - targetValue) <= 10;
            document.getElementById("task_5ex").innerHTML = `
                У исполнителя ${executor.name} две команды:<br>
                1. ${executor.commands[0]}<br>
                2. ${executor.commands[1]}<br>
                Программа ${program} переводит число ${startValue} в ${isValidEnd ? targetValue : currentValue}. Определите значение b.
            `;
            currentTask_5ex = { program, bValue, executor, startValue, targetValue };
            document.getElementById("feedback_5ex").textContent = "";
            document.getElementById("answer_5ex").textContent = "";
            document.getElementById("solution_5ex").textContent = "";
        }

        function updateProgressForTask5() {
            fetch('/user/progress/informatics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ taskId: '5', increment: 1 })
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Ошибка при обновлении прогресса');
                }
            })
            .then(data => {
                console.log("Прогресс по заданию 5 успешно обновлен:", data);
                document.getElementById("feedback_5ex").textContent += " Прогресс обновлен.";
            })
            .catch(error => {
                console.error("Ошибка при обновлении прогресса:", error);
                document.getElementById("feedback_5ex").textContent += " Ошибка при обновлении прогресса.";
            });
        }

        function checkAnswer_5ex() {
            const userAnswer = document.getElementById("userAnswer_5ex").value;
            const correctAnswer = currentTask_5ex.bValue;
            if (userAnswer == correctAnswer) {
                document.getElementById("feedback_5ex").textContent = "Правильно!";
                updateProgressForTask5();
            } else {
                document.getElementById("feedback_5ex").textContent = "Неправильно. ";
		document.getElementById("answer_5ex").textContent = `Ответ: ${currentTask_5ex.bValue}`;
            	document.getElementById("answer_5ex").classList.remove("hidden");
            }
        }

        
        function showAnswer_5ex() {
            document.getElementById("answer_5ex").textContent = `Ответ: ${currentTask_5ex.bValue}`;
            document.getElementById("answer_5ex").classList.remove("hidden");
        }

        function showSolution_5ex() {
            const { program, startValue, bValue, executor } = currentTask_5ex;
            let value = startValue;
            let solutionSteps = `Начальное значение: ${startValue}<br>`;
            for (let i = 0; i < program.length; i++) {
                const command = parseInt(program[i]);
                value = executor.operation(value, bValue, command);
                solutionSteps += `Шаг ${i + 1}: ${executor.commands[command - 1]} → ${value}<br>`;
            }
            document.getElementById("solution_5ex").innerHTML = `Решение:<br>${solutionSteps}`;
            document.getElementById("solution_5ex").classList.remove("hidden");
        }