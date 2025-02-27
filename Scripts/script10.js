 // Задание
        let maxDecimal;
        let correctIndex;
        let decimalValues = [];

        function generateTask_10ex() {
            const number1 = Math.floor(Math.random() * 501); // Случайное число для двоичной системы
            const number2 = Math.floor(Math.random() * 501); // Случайное число для восьмеричной системы
            const number3 = Math.floor(Math.random() * 501); // Случайное число для шестнадцатеричной системы

            const binaryNumber = number1.toString(2);   // Двоичная система
            const octalNumber = number2.toString(8);    // Восьмеричная система
            const hexNumber = number3.toString(16);      // Шестнадцатеричная система
            
            decimalValues = [
                parseInt(binaryNumber, 2),
                parseInt(octalNumber, 8),
                parseInt(hexNumber, 16)
            ];

            document.getElementById("numbers_10ex").textContent = 
                `1. ${binaryNumber} (двоичная система счисления)\n` +
                `2. ${octalNumber} (восьмеричная система счисления)\n` +
                `3. ${hexNumber} (шестнадцатеричная система счисления)`;

            // Находим максимальное число среди трех
            maxDecimal = Math.max(...decimalValues);
            correctIndex = decimalValues.indexOf(maxDecimal) + 1;
            document.getElementById("result_10ex").textContent = ""; // Очищаем предыдущий результат
        }

        function checkAnswer_10ex() {
            const userAnswer = parseInt(document.getElementById("userAnswer_10ex").value);
            const resultDiv = document.getElementById("result_10ex");

            if (userAnswer === maxDecimal) {
                resultDiv.textContent = "Правильно!";
            } else {
                resultDiv.textContent = `Неверно. Правильный ответ: ${maxDecimal}`;
            }
        }

        function showAnswer_10ex() {
            const resultDiv = document.getElementById("result_10ex");
            resultDiv.textContent = `Правильный ответ: ${maxDecimal}, он находится под номером ${correctIndex}.`;
        }

        function showSolution_10ex() {
            const resultDiv = document.getElementById("result_10ex");
            const solution = 
                `Для нахождения наибольшего числа мы преобразовали числа из различных систем счисления в десятичную:\n` +
                `- Двоичное: ${decimalValues[0]} (из ${document.getElementById("numbers_10ex").textContent.split('\n')[0].match(/\d+/)[0]})\n` +
                `- Восьмеричное: ${decimalValues[1]} (из ${document.getElementById("numbers_10ex").textContent.split('\n')[1].match(/\d+/)[0]})\n` +
                `- Шестнадцатеричное: ${decimalValues[2]} (из ${document.getElementById("numbers_10ex").textContent.split('\n')[2].match(/\d+/)[0]})\n\n` +
                `Наибольшее число — это ${maxDecimal}.`;

            resultDiv.innerHTML = solution.replaceAll('\n', '<br/>');
        }

        document.getElementById("generate_variant").addEventListener("click", generateTask_10ex);
        document.getElementById("save_checking").addEventListener("click", checkAnswer_10ex);
        document.getElementById("showAnswer_10ex").addEventListener("click", showAnswer_10ex);
        document.getElementById("showSolution_10ex").addEventListener("click", showSolution_10ex);

        // Рисовалка
        const canvas = document.getElementById('canvas_10ex');
        const ctx = canvas.getContext('2d');
        let drawing = false;
        let mode = 'draw';
        let color = '#000000';
        let size = 5;

        // Настройка размера холста
        canvas.width = window.innerWidth - 40;
        canvas.height = window.innerHeight - 100;

        function startDrawing(e) {
            drawing = true;
            draw(e);
        }

        function endDrawing() {
            drawing = false;
            ctx.beginPath();
        }

        function draw(e) {
            if (!drawing) return;

            ctx.lineWidth = size;
            ctx.lineCap = 'round';
            ctx.strokeStyle = color;

            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            if (mode === 'draw') {
                ctx.lineTo(x, y);
                ctx.stroke();
            } else if (mode === 'erase') {
                ctx.clearRect(x - size / 2, y - size / 2, size, size);
            } else {
                // Draw shapes
                ctx.beginPath();
                if (mode === 'line') {
                    ctx.moveTo(x, y);
                    ctx.lineTo(x + size, y + size);
                } else if (mode === 'rect') {
                    ctx.rect(x, y, size, size);
                } else if (mode === 'circle') {
                    ctx.arc(x, y, size, 0, Math.PI * 2);
                } else if (mode === 'triangle') {
                    ctx.moveTo(x, y);
                    ctx.lineTo(x + size, y + size);
                    ctx.lineTo(x - size, y + size);
                    ctx.closePath();
                }
                ctx.stroke();
            }
        }

        document.getElementById('colorPicker').addEventListener('input', (e) => {
            color = e.target.value;
        });

        document.getElementById('sizePicker_10ex').addEventListener('input', (e) => {
            size = e.target.value;
        });

        document.getElementById('modeSelect_10ex').addEventListener('change', (e) => {
            mode = e.target.value;
        });

        document.getElementById('clearCanvas_10ex').addEventListener('click', () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        });

        document.getElementById('saveCanvas_10ex').addEventListener('click', () => {
            const link = document.createElement('a');
            link.download = 'drawing.png';
            link.href = canvas.toDataURL();
            link.click();
        });

        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mouseup', endDrawing);
        canvas.addEventListener('mousemove', draw);

        // Переключение между секциями
        document.getElementById('toggleSection_10ex').addEventListener('click', () => {
            const taskSection = document.getElementById('taskSection_10ex');
            const drawingSection = document.getElementById('drawingSection_10ex');
            const toggleButton = document.getElementById('toggleSection_10ex');

            if (taskSection.classList.contains('hidden')) {
                taskSection.classList.remove('hidden');
                drawingSection.classList.add('hidden');
                toggleButton.textContent = 'Перейти к рисовалке';
            } else {
                taskSection.classList.add('hidden');
                drawingSection.classList.remove('hidden');
                toggleButton.textContent = 'Перейти к заданию';
            }
        });