function updateProgressForTask7() {
            fetch('/user/progress/informatics/7', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ increment: 1 })  // Включите необходимые данные для обновления прогресса
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Прогресс обновлен');
                }
            })
            .then(data => {
                if (data.success) {
                    console.log("Прогресс для задания 7 обновлен.");
                    document.getElementById('result_7ex').textContent += " Прогресс обновлен.";
                } else {
                    console.error("Ошибка при обновлении прогресса для задания 7.");
                    document.getElementById('result_7ex').textContent += " Ошибка при обновлении прогресса.";
                }
            })
            .catch(error => console.error("Ошибка при обновлении прогресса:", error));
        }

        // Задание по URL
        const options_7ex = [
            { letter: 'А', value: '.com' },
            { letter: 'Б', value: 'ftp' },
            { letter: 'В', value: 'http' },
            { letter: 'Г', value: 'example' },
            { letter: 'Д', value: '://' },
            { letter: 'Е', value: '/' },
            { letter: 'Ж', value: '.org' },
            { letter: 'З', value: '.html' },
            { letter: 'И', value: '.net' },
            { letter: 'К', value: 'site' },
            { letter: 'Л', value: 'docs' },
            { letter: 'М', value: '.gif' },
            { letter: 'Н', value: 'file' },
            { letter: 'О', value: 'https' },
            { letter: 'П', value: 'jour' },
            { letter: 'Р', value: 'images' },
            { letter: 'С', value: 'index' },
            { letter: 'Т', value: '.jpg' },
            { letter: 'У', value: '.docx' },
            { letter: 'Ф', value: 'server' },
            { letter: 'Х', value: 'folder' }
        ];

        let selectedOptions = [];

	document.getElementById('generate_variant').addEventListener('click', generateTask_7ex);
	

        function generateTask_7ex() {
            document.getElementById('result_7ex').innerText = '';
            document.getElementById('correctAnswer_7ex').innerText = '';
            document.getElementById('solution_7ex').innerText = '';
            document.getElementById('result_7ex').className = '';
            document.getElementById('correctAnswer_7ex').style.display = 'none';
            document.getElementById('solution_7ex').style.display = 'none';
            document.querySelector('.task-url').style.display = 'none';
            document.querySelector('.task-ip').style.display = 'none';

            const taskType = Math.random() < 0.5 ? 'url' : 'ip';
            if (taskType === 'url') {
                document.getElementById('task-url_7ex').style.display = 'block';
		document.getElementById('save_checking').addEventListener('click', checkAnswer_7ex);
                generateUrlTask();
            } else {
                document.getElementById('task-ip_7ex').style.display = 'block';
		document.getElementById('save_checking').addEventListener('click', checkIpAnswer_7ex);
                generateIpTask();
            }
        }

        function generateUrlTask() {
            const protocols = ['Б', 'В', 'О'];
            const domains = ['Г', 'К', 'П', 'Ф'];
            const tlds = ['А', 'Ж', 'И'];
            const folders = ['Е'];
            const files = ['Н', 'С'];
            const extensions = ['З', 'М', 'Т', 'У'];

            const protocol = protocols[Math.floor(Math.random() * protocols.length)];
            const domain = domains[Math.floor(Math.random() * domains.length)];
            const tld = tlds[Math.floor(Math.random() * tlds.length)];
            const folder = folders[Math.floor(Math.random() * folders.length)];
            const file = files[Math.floor(Math.random() * files.length)];
            const extension = extensions[Math.floor(Math.random() * extensions.length)];

            selectedOptions = [
                { letter: protocol, value: options_7ex.find(opt => opt.letter === protocol).value },
                { letter: domain, value: options_7ex.find(opt => opt.letter === domain).value },
                { letter: tld, value: options_7ex.find(opt => opt.letter === tld).value },
                { letter: folder, value: options_7ex.find(opt => opt.letter === folder).value },
                { letter: file, value: options_7ex.find(opt => opt.letter === file).value },
                { letter: extension, value: options_7ex.find(opt => opt.letter === extension).value },
                { letter: 'Д', value: '://' },
            ];

            selectedOptions.sort((a, b) => a.letter.localeCompare(b.letter));

            const description = `Файл ${options_7ex.find(opt => opt.letter === file).value}${options_7ex.find(opt => opt.letter === extension).value} находится на сервере ${options_7ex.find(opt => opt.letter === domain).value}${options_7ex.find(opt => opt.letter === tld).value} и доступен по протоколу ${options_7ex.find(opt => opt.letter === protocol).value}. Запишите последовательность букв, кодирующую адрес указанного файла в сети Интернет.`;
            const answer = `${protocol}Д${domain}${tld}${folder}${file}${extension}`;
            const solution = `Адрес в сети Интернет формируется следующим образом: сначала протокол (${options_7ex.find(opt => opt.letter === protocol).value}), затем '://', затем сервер (${options_7ex.find(opt => opt.letter === domain).value}${options_7ex.find(opt => opt.letter === tld).value}), затем папка (${options_7ex.find(opt => opt.letter === folder).value}), и, наконец, имя файла (${options_7ex.find(opt => opt.letter === file).value}${options_7ex.find(opt => opt.letter === extension).value}). Следовательно, правильная последовательность: ${answer}.`;

            document.getElementById('taskDescription_7ex').innerText = description;
            displayOptions();
            document.getElementById('userAnswer_7ex').dataset.answer = answer.toUpperCase();
            document.getElementById('userAnswer_7ex').dataset.solution = solution;
            document.getElementById('userAnswer_7ex').disabled = false;
        }

        function displayOptions() {
            const optionsContainer = document.getElementById('options_7ex');
            optionsContainer.innerHTML = '';
            selectedOptions.forEach(option => {
                const button = document.createElement('button');
                button.innerText = `${option.letter}) ${option.value}`;
                button.className = 'btn';
                button.onclick = () => appendOption(option.letter);
                optionsContainer.appendChild(button);
            });
        }

        function appendOption(value) {
            const userAnswer = document.getElementById('userAnswer_7ex');
            userAnswer.value += value;
        }

        function checkAnswer_7ex() {
            const userAnswer = document.getElementById('userAnswer_7ex').value.trim().toUpperCase();
            const correctAnswer = document.getElementById('userAnswer_7ex').dataset.answer;
            if (userAnswer === correctAnswer) {
                document.getElementById('result_7ex').innerText = 'Правильно!';
                document.getElementById('result_7ex').className = 'result';
                updateProgressForTask7(); // Обновление прогресса для задания URL
            } else {
                document.getElementById('result_7ex').innerText = 'Неправильно. ';
		document.getElementById('correctAnswer_7ex').innerText = 'Правильная последовательность: ' + 		document.getElementById('userAnswer_7ex').dataset.answer;
            	document.getElementById('correctAnswer_7ex').style.display = 'block';
                document.getElementById('result_7ex').className = 'error';
            }
        }

        function showAnswer_7ex() {
            document.getElementById('correctAnswer_7ex').innerText = 'Правильная последовательность: ' + document.getElementById('userAnswer_7ex').dataset.answer;
            document.getElementById('correctAnswer_7ex').style.display = 'block';
        }

        function showSolution_7ex() {
            document.getElementById('solution_7ex').innerText = document.getElementById('userAnswer_7ex').dataset.solution;
            document.getElementById('solution_7ex').style.display = 'block';
        }

        // Задание по IP-адресам
        let partsDict = {};
        let correctOrder = [];

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function generateIpAddressParts() {
            // Генерация частей IP-адреса
            let part1 = `${getRandomInt(1, 9)}.${getRandomInt(10, 99)}`; // Десятичная дробь (2.12)
            let part2 = `${getRandomInt(10, 99)}`; // Целое число (22)
            let part3 = `.${getRandomInt(10, 99)}`; // Часть с точкой в начале (.30)
            let part4 = `${getRandomInt(1, 9)}.${getRandomInt(100, 999)}`; // Два целых числа с точкой (5.121)

            let parts = [part1, part2, part3, part4];
            parts.sort(() => Math.random() - 0.5);

            let labels = ['А', 'Б', 'В', 'Г'];
            partsDict = {};
            for (let i = 0; i < labels.length; i++) {
                partsDict[labels[i]] = parts[i];
            }
        }

        function formatTask(partsDict) {
            let taskText = "На месте преступления были обнаружены четыре обрывка бумаги. Следствие установило, что на них записаны фрагменты одного IP-адреса. Криминалисты обозначили эти фрагменты буквами А, Б, В и Г:<br><br>";
            for (let label in partsDict) {
                taskText += `${label} - ${partsDict[label]}<br>`;
            }
            taskText += "<br>Восстановите IP-адрес. В ответе укажите последовательность букв, обозначающих фрагменты, в порядке, соответствующем IP-адресу.";
            return taskText;
        }

        function findCorrectOrder(partsDict) {
            let order = [];

            // Находим первую часть (целое число)
            for (let label in partsDict) {
                if (!partsDict[label].includes('.')) {
                    order.push(label);
                    break;
                }
            }

            // Находим часть с двумя числами (формат x.y)
            for (let label in partsDict) {
                if (partsDict[label].includes('.') && !partsDict[label].startsWith('.') && !partsDict[label].endsWith('.')) {
                    order.push(label);
                }
            }

            // Находим часть, начинающуюся с точки
            for (let label in partsDict) {
                if (partsDict[label].startsWith('.')) {
                    order.push(label);
                }
            }

            // Находим последнюю часть (десятичная дробь)
            for (let label in partsDict) {
                if (!order.includes(label)) {
                    order.push(label);
                }
            }

            return order;
        }

        function reconstructIp(partsDict, correctOrder) {
            let ip = correctOrder.map(label => partsDict[label]).join('');
            ip = ip.replace('..', '.');
            return ip;
        }

        function validateIp(ipAddress) {
            let parts = ipAddress.split('.');
            if (parts.length !== 4) return false;
            return parts.every(part => !isNaN(part) && part >= 0 && part <= 255);
        }

        function generateValidTask() {
            let order;
            do {
                generateIpAddressParts();
                order = findCorrectOrder(partsDict);
            } while (!validateIp(reconstructIp(partsDict, order)));
            correctOrder = order;
        }

        function generateIpTask() {
            generateValidTask();
            document.getElementById('task_7ex').innerHTML = formatTask(partsDict);
            document.getElementById('ipAnswer_7ex').innerHTML = "";
            document.getElementById('ipResult_7ex').innerHTML = "";
            document.getElementById('userIpAnswer_7ex').value = "";
            document.getElementById('ipSolution_7ex').innerHTML = "";
        }

        function showIpAnswer_7ex() {
            if (correctOrder.length > 0) {
                document.getElementById('ipAnswer_7ex').innerHTML = "Правильный ответ: " + correctOrder.join("");
            } else {
                document.getElementById('ipAnswer_7ex').innerHTML = "Сначала сгенерируйте задание.";
            }
        }

        function showIpSolution_7ex() {
            const ip = reconstructIp(partsDict, correctOrder);
            const solutionText = `
                IP-адрес представляет собой четыре разделенных точками числа, каждое из которых не больше 255.<br>
                Правильный IP-адрес: ${ip}<br>
                Последовательность фрагментов: ${correctOrder.join("")}
            `;
            document.getElementById('ipSolution_7ex').innerHTML = solutionText;
        }

        function validateUserIpAnswer(ipAddress) {
            // Паттерн для проверки формата IP-адреса
            const ipPattern = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
            const match = ipAddress.match(ipPattern);

            if (!match) return false;

            // Проверяем, что каждое число в IP-адресе находится в диапазоне от 0 до 255
            return match.slice(1).every(num => Number(num) >= 0 && Number(num) <= 255);
        }

        function checkIpAnswer_7ex() {
            const userAnswer = document.getElementById('userIpAnswer_7ex').value.toUpperCase().replace(/\s+/g, '');
            const reconstructedIp = reconstructIp(partsDict, correctOrder);

            // Проверяем, соответствует ли ответ формату IP-адреса
            if (!validateUserIpAnswer(reconstructedIp)) {
                document.getElementById('ipResult_7ex').innerText = 'Ответ не соответствует формату IP-адреса. Попробуйте еще раз.';
                document.getElementById('ipResult_7ex').className = 'error';
                return;
            }

            // Проверка ответа пользователя
            if (userAnswer === correctOrder.join("")) {
                document.getElementById('ipResult_7ex').innerText = 'Правильно!';
                document.getElementById('ipResult_7ex').className = 'result';
                updateProgressForTask7();
            } else {
                document.getElementById('ipResult_7ex').innerText = 'Неправильно. ';
		document.getElementById('ipAnswer_7ex').innerHTML = "Правильный ответ: " + correctOrder.join("");
                document.getElementById('ipResult_7ex').className = 'error';
            }
        }