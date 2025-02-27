        let selectedTableType;
        let workbook;
        let generatedData = []; // Массив для хранения данных таблицы
        let generatedQuestions = []; // Массив для сохранения вопросов и данных для ответов
        let generatedChart = []; 
        let correctChartData = {};
        let userChart; // График пользователя
        let objectCount = 0; // Количество объектов
        let labels = [];
        let values = [];
        let userChartData = {};

        const tableTemplates = [
            {
                name: "Продажи в регионах",
                headers: ["Имя", "Регион", "Товар", "Количество", "Стоимость"],
                rows: () => [
                    [randomName(), randomRegion(), randomProduct(), getRandomInt(10, 100), getRandomInt(100, 1000)]
                ],
                questions: [
                    `Сколько товаров было продано в регионе {randomRegion()}?`,
                    "Какой товар продали больше всего?",
                    "Какова общая стоимость продаж для всех товаров?",
                    "Какова средняя стоимость одного товара?",
                    `Каков наибольший объём продаж в единицах на {randomRegion()}е?`
                ],
                chart: "Постройте круговую диаграмму, отображающую соотношение товаров из регионов: {randomRegion()}, {randomRegion()} и {randomRegion()}."
            },
            {
                name: "Учебные успеваемости",
                headers: ["Фамилия", "Имя", "Предмет", "Оценка", "Класс"],
                rows: () => [
                    [randomLastName(), randomName(), randomSubject(), getRandomGrade(2, 5), getRandomClass(5, 11)]
                ],
                questions: [
                    "Какова средняя оценка по {randomSubject()}?",
                    "Сколько учеников получили {getRandomGrade()} по {randomSubject()}?",
                    "В каком классе больше всего отличников?",
                    "Сколько учеников изучают {randomSubject()}?",
                    "Каков общий балл по {randomSubject()} в {getRandomClass()} классе?" 
                ],
                chart: "Постройте круговую диаграмму, отображающую соотношение среднего балла {getRandomClass()}, {getRandomClass()} и {getRandomClass()} классов."
                
            },
            {
                name: "Учет работы сотрудников",
                headers: ["Имя", "Должность", "Отдел", "Часы работы", "Проект"],
                rows: () => [
                    [randomName(), randomJobTitle(), randomDepartment(), getRandomInt(20, 160), randomProject()]
                ],
                questions: [
                    "Сколько часов отработал сотрудник '{randomName()}'?",
                    "Какова общая продолжительность работы по {randomProject()}?",
                    "Сколько сотрудников в отделе {randomDepartment()}?"
                ],
                chart: "Постройте круговую диаграмму, отображающую соотношение часов работы над {randomProject()}, {randomProject()} и {randomProject()}."
                
            },
            {
                name: "Наблюдения за погодой",
                headers: ["Месяц", "Температура", "Осадки", "Давление", "Ветер"],
                rows: () => [
                    [randomMonth(), getRandomInt(-10, 30), getRandomInt(0, 50), getRandomInt(720, 780), randomRegion()]
                ],
                questions: [
                    "Какова средняя температура за {randomMonth()}?",
                    "Сколько выпало осадков?",
                    "Какое наибольшее значение температуры было зафиксировано?",
                    "Сколько дней дул {randomRegion()} ветер?",
                    "Сколько раз был зафиксирован {randomRegion()} ветер?"
                ],
                chart: "Постройте круговую диаграмму, отображающую соотношение средней температуры для месяцев: {randomMonth()}, {randomMonth()} и {randomMonth()}."
                
            },
            {
                name: "Продажи в магазине",
                headers: ["Товар", "Категория", "Цена", "Количество", "Сумма"],
                rows: () => {
                    const price = getRandomInt(10, 500);
                    const quantity = getRandomInt(1, 50);
                    const total = price * quantity; // Вычисляем сумму
                    return [[randomProduct(), randomCategory(), price, quantity, total]];
                },
                questions: [
                    "Какова общая сумма продаж?",
                    "Какой товар продан в наибольшем количестве?",
                    "Какова средняя цена товаров в категории '{randomCategory()}'?",
                    "Сколько было продано '{randomProduct()}'?",
                    "Какой товар принес наибольшую выручку?",
                    "Какова сумма продаж для товаров из категории '{randomCategory()}'?"
                ],
                chart: "Постройте круговую диаграмму, отображающую соотношение проданного кол-ва товаров: {randomProduct()}, {randomProduct()} и {randomProduct()}."
                
            },
            {
                name: "Зарплата сотрудников",
                headers: ["Имя", "Фамилия", "Должность", "Оклад", "Премия"],
                rows: () => [
                    [randomName(), randomLastName(), randomJobTitle(), getRandomSalary(20000, 80000), getRandomBonus(0, 20000)]
                ],
                questions: [
                    "Каков средний оклад {randomJobTitle()}?",
                    "Какая наибольшая премия у {randomJobTitle()}?",
                    "Сколько сотрудников получают премию более {getRandomBonus()} рублей?",
                    "Какова общая зарплата сотрудников отдела {randomJobTitle()}?",
                    "Сколько сотрудников получают оклад более {getRandomSalary()}?"
                ],
                chart: "Постройте круговую диаграмму, отображающую соотношение кол-ва сотрудников на должностях: {randomJobTitle()}, {randomJobTitle()} и {randomJobTitle()}."
                
            },
          {
                name: "Население городов",
                headers: ["Город", "Численность населения(тыс)", "Страна"],
                rows: () => [
                    [randomCity(), getRandomInt(50, 500), randomCountry()]
                ],
                questions: [
                    "Сколько городов имеют численность населения менее {getRandomInt()}тыс. человек?",
                    "Сколько городов имеют численность населения более {getRandomInt()}тыс. человек?",
                    "Какова средняя численность населения {randomCountry()} городов?",
                ],
                chart: "Постройте круговую диаграмму, отображающую соотношение кол-ва городов из стран: {randomCountry()}, {randomCountry()} и {randomCountry()}."
            },
            {
                name: "Мед. данные учеников",
                headers: ["Фамилия", "Имя", "Класс", "Рост", "Вес"],
                rows: () => [
                    [randomLastName(), randomName(), getRandomClass(5, 11), getRandomHeight(150, 190), getRandomWeight(40, 90)]
                ],
                questions: [
                    "Каков вес самого тяжелого ученика {getRandomClass()} класса?",
                    "Какой процент учеников {getRandomClass()} класса имеет рост больше {getRandomHeight()}?",
                    "Каков средний рост в {getRandomClass()} классах?"
                ],
                chart: "Постройте круговую диаграмму, отображающую соотношение среднего роста для {getRandomClass()}, {getRandomClass()} и {getRandomClass()}."
            },
            {
                name: "Калорийность продуктов",
                headers: ["Продукт", "Жиры, г", "Белки, г", "Углеводы, г", "Калорийность, Ккал"],
                rows: () => {
                    const fats = getRandomFats(0, 50);
                    const proteins = getRandomProteins(1, 30);
                    const carbs = getRandomCarbohydrats(3, 50);
                    const calories = (proteins * 4) + (fats * 9) + (carbs * 4);  // Расчет калорийности
                    return [[randomFood(), fats, proteins, carbs, calories]];
                },
                questions: [
                    "Сколько продуктов содержат меньше {getRandomCarbohydrats()} г углеводов и больше {getRandomProteins()} г белков?",
                    "Какова средняя калорийность продуктов с содержанием углеводов {getRandomCarbohydrats()} г?",
                    "Сколько продуктов не содержат жиры?"
                ],
                chart: "Постройте круговую диаграмму, отображающую соотношение среднего количества жиров, белков и углеводов в первых 100 продуктах."
            }

        ];

        document.getElementById('generate_variant').onclick = generateTasks;
      
        // Обработчик для кнопки проверки диаграммы
document.getElementById('save_checking').onclick = () => {
    // Получаем данные диаграммы пользователя как словарь
    const userData = userChartData;
    console.log("User Data:", userData);
    console.log("Correct Chart Data:", correctChartData);
    // Проверяем с правильными данными
    const isCorrect = checkPieChart(userData, correctChartData);

    // Создаем оповещение для пользователя о правильности диаграммы
    const feedback = document.createElement("div");
    feedback.className = "feedback";
    feedback.textContent = isCorrect ? "Правильно!" : "Неправильно! Диаграмма не совпадает с правильными данными.";
    feedback.style.color = isCorrect ? "green" : "red";

    // Удаляем старое оповещение и добавляем новое
    const resultContainer = document.getElementById("result_14ex");
    resultContainer.innerHTML = ""; // Очищаем предыдущий результат
    resultContainer.appendChild(feedback);
};
      

        function generateTasks() {
    const questionsSection = document.getElementById("questions-section_14ex");
    questionsSection.innerHTML = "";

    generatedData = [];
    generatedQuestions = []; // Очищаем массив вопросов

    selectedTableType = tableTemplates[Math.floor(Math.random() * tableTemplates.length)];

    const selectedQuestions = shuffle(selectedTableType.questions).slice(0, 2);

    for (let i = 0; i < selectedQuestions.length; i++) {
        let questionText;
        let randomReplacementValue;
        let randomReplacementValue2;
        let randomReplacementValue3;
        let randomReplacementValue4;

        // Генерация вопроса и замена переменных в зависимости от типа таблицы
        switch (selectedTableType.name) {
            case 'Учебные успеваемости':
                randomReplacementValue = randomSubject(); // Например, случайный предмет
                randomReplacementValue2 = getRandomClass(5, 11); // Например, случайный класс
                randomReplacementValue3 = getRandomGrade(2, 5); // Например, случайная оценка

                // Замена плейсхолдеров в вопросе
                questionText = selectedQuestions[i]
                    .replace("{randomSubject()}", randomReplacementValue)
                    .replace("{getRandomClass()}", randomReplacementValue2)
                    .replace("{getRandomGrade()}", randomReplacementValue3);
                break;
            case 'Учет работы сотрудников':
                randomReplacementValue = randomDepartment(); // Например, случайный отдел
                randomReplacementValue2 = randomName();
                randomReplacementValue3 = randomProject(); 
                questionText = selectedQuestions[i]
                    .replace("{randomDepartment()}", randomReplacementValue)
                    .replace("{randomName()}", randomReplacementValue2)
                    .replace("{randomProject()}", randomReplacementValue3);
                break;
            case 'Наблюдения за погодой':
                randomReplacementValue = randomRegion(); // Например, случайный регион
                randomReplacementValue2 = randomMonth();
                questionText = selectedQuestions[i]
                    .replace("{randomRegion()}", randomReplacementValue)
                    .replace("{randomMonth()}", randomReplacementValue2);
                break;
            case 'Продажи в магазине':
                randomReplacementValue = randomProduct(); // Например, случайный товар
                randomReplacementValue2 = randomCategory();
                questionText = selectedQuestions[i]
                    .replace("{randomProduct()}", randomReplacementValue)
                    .replace("{randomCategory()}", randomReplacementValue2);
                break;
            case 'Зарплата сотрудников':
                randomReplacementValue = randomJobTitle(); // Например, случайная должность
                randomReplacementValue2 = getRandomBonus(0, 20000); 
                randomReplacementValue3 = getRandomSalary(20000, 80000);
                questionText = selectedQuestions[i]
                    .replace("{randomJobTitle()}", randomReplacementValue)
                    .replace("{getRandomBonus()}", randomReplacementValue2)
                    .replace("{getRandomSalary()}", randomReplacementValue3);
                break;
            case 'Продажи в регионах':
                randomReplacementValue = randomRegion(); // Генерируем случайный регион
                questionText = selectedQuestions[i].replace("{randomRegion()}", randomReplacementValue);
                break;
            case 'Население городов':
                randomReplacementValue = getRandomInt(50, 500);   
                randomReplacementValue2 = randomCountry();
                questionText = selectedQuestions[i]
                    .replace("{getRandomInt()}", randomReplacementValue)
                    .replace("{randomCountry()}", randomReplacementValue2);
                break;
            case 'Мед. данные учеников':
                randomReplacementValue = getRandomClass(5, 11);
                randomReplacementValue2 = getRandomHeight(150, 190);
                questionText = selectedQuestions[i]
                    .replace("{getRandomClass()}", randomReplacementValue)
                    .replace("{getRandomHeight()}", randomReplacementValue2);
                break;
            case 'Калорийность продуктов':
                randomReplacementValue = getRandomProteins(1, 30);  
                randomReplacementValue2 = getRandomCarbohydrats(3, 50);
                questionText = selectedQuestions[i]
                    .replace("{getRandomProteins()}", randomReplacementValue)
                    .replace("{getRandomCarbohydrats()}", randomReplacementValue2);
                break;
            default:
                questionText = selectedQuestions[i]; // Вопрос без динамических вставок
        }

        // Сохраняем текст вопроса и логику вычисления ответа
        generatedQuestions.push({
            questionText: questionText,
            correctAnswerFunction: () => calculateCorrectAnswer(i, randomReplacementValue, randomReplacementValue2, randomReplacementValue3, randomReplacementValue4)
        });

        const questionContainer = document.createElement("div");
        questionContainer.className = "question-container";

        const questionTitle = document.createElement("div");
        questionTitle.className = "question-title";
        questionTitle.innerText = `Задание ${i + 1}: ${questionText}`;

        const answerContainer = document.createElement("div");
        answerContainer.className = "answer-container";

        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.placeholder = "Ваш ответ";

        const checkAnswerBtn = document.createElement("button");
        checkAnswerBtn.innerText = "Проверить ответ";
      
        const showAnswerBtn = document.createElement("button");
        showAnswerBtn.innerText = "Показать ответ";

        // Добавляем обработчик события на кнопку в момент её создания
        checkAnswerBtn.onclick = () => {
            const userAnswer = inputField.value;
            const correctAnswer = generatedQuestions[i].correctAnswerFunction();

            // Удаляем старое оповещение, если оно есть
            const existingFeedback = answerContainer.querySelector(".feedback");
            if (existingFeedback) {
                existingFeedback.remove();
            }

            // Создаем новое оповещение
            const feedback = document.createElement("div");
            feedback.className = "feedback";

            if (checkAnswer(userAnswer, correctAnswer)) {
                feedback.textContent = "Правильно!";
                feedback.style.color = "green";
            } else {
                feedback.textContent = `Неправильно!`;
                feedback.style.color = "red";
            }

            answerContainer.appendChild(feedback);
        };
      
        showAnswerBtn.onclick = () => {
            const correctAnswer = generatedQuestions[i].correctAnswerFunction();

            // Удаляем старое оповещение, если оно есть
            const existingFeedback = answerContainer.querySelector(".feedback");
            if (existingFeedback) {
                existingFeedback.remove();
            }

            // Создаем новое оповещение
            const feedback = document.createElement("div");
            feedback.className = "feedback";


            feedback.textContent = correctAnswer;
            feedback.style.color = "green";
 

            answerContainer.appendChild(feedback);
        };

        answerContainer.appendChild(inputField);
        answerContainer.appendChild(checkAnswerBtn);
        answerContainer.appendChild(showAnswerBtn);

        questionContainer.appendChild(questionTitle);
        questionContainer.appendChild(answerContainer);

        questionsSection.appendChild(questionContainer);
        
    }

    // Генерация данных для таблицы в зависимости от выбранного типа
    populateTable(selectedTableType);

    // Создаем новую книгу Excel и заполняем её данными
    workbook = XLSX.utils.book_new();
    const ws_data = [selectedTableType.headers];

    // Генерация строк данных в зависимости от выбранного типа таблицы
    for (let i = 0; i < 1000; i++) {
        ws_data.push(generateRow(selectedTableType));
    }

    const worksheet = XLSX.utils.aoa_to_sheet(ws_data);
    XLSX.utils.book_append_sheet(workbook, worksheet, selectedTableType.name);

    // Показать кнопку скачивания только после генерации
    const downloadBtn = document.getElementById('download-btn_14ex');
    downloadBtn.style.display = "inline";
    downloadBtn.onclick = () => downloadExcel(workbook);
          
    generateChartTask(selectedTableType);      
}

      
        function generateChartTask(selectedTableType) {
    const chartSection = document.getElementById("chart-section_14ex");
    chartSection.innerHTML = ""; // Очищаем секцию диаграмм

    let chartText = selectedTableType.chart;
    let uniqueCondition, uniqueValue, uniqueValue2, uniqueValue3;

    if (selectedTableType.chart) {
        // Генерация уникальных значений в зависимости от типа таблицы
        switch (selectedTableType.name) {
            case 'Учебные успеваемости':
                uniqueCondition = generateUniqueValues(3, getRandomClass, 5, 11);
                uniqueValue = uniqueCondition[0]
                uniqueValue2 = uniqueCondition[1]
                uniqueValue3 = uniqueCondition[2]
                chartText = chartText.replace("{getRandomClass()}", uniqueValue)
                                     .replace("{getRandomClass()}", uniqueValue2)
                                     .replace("{getRandomClass()}", uniqueValue3);
                break;
            case 'Продажи в регионах':
                uniqueCondition = generateUniqueValues(3, randomRegion);
                uniqueValue = uniqueCondition[0]
                uniqueValue2 = uniqueCondition[1]
                uniqueValue3 = uniqueCondition[2]
                chartText = chartText.replace("{randomRegion()}", uniqueValue)
                                     .replace("{randomRegion()}", uniqueValue2)
                                     .replace("{randomRegion()}", uniqueValue3);
                break;
            case 'Учет работы сотрудников':
                uniqueCondition = generateUniqueValues(3, randomProject);
                uniqueValue = uniqueCondition[0]
                uniqueValue2 = uniqueCondition[1]
                uniqueValue3 = uniqueCondition[2]
                chartText = chartText.replace("{randomProject()}", uniqueValue)
                                     .replace("{randomProject()}", uniqueValue2)
                                     .replace("{randomProject()}", uniqueValue3);
                break;
            case 'Наблюдения за погодой':
                uniqueCondition = generateUniqueValues(3, randomMonth);
                uniqueValue = uniqueCondition[0]
                uniqueValue2 = uniqueCondition[1]
                uniqueValue3 = uniqueCondition[2]
                chartText = chartText.replace("{randomMonth()}", uniqueValue)
                                     .replace("{randomMonth()}", uniqueValue2)
                                     .replace("{randomMonth()}", uniqueValue3);
                break;
            case 'Продажи в магазине':
                uniqueCondition = generateUniqueValues(3, randomProduct);
                uniqueValue = uniqueCondition[0]
                uniqueValue2 = uniqueCondition[1]
                uniqueValue3 = uniqueCondition[2]
                chartText = chartText.replace("{randomProduct()}", uniqueValue)
                                     .replace("{randomProduct()}", uniqueValue2)
                                     .replace("{randomProduct()}", uniqueValue3);
                break;
            case 'Зарплата сотрудников':
                uniqueCondition = generateUniqueValues(3, randomJobTitle);
                uniqueValue = uniqueCondition[0]
                uniqueValue2 = uniqueCondition[1]
                uniqueValue3 = uniqueCondition[2]
                chartText = chartText.replace("{randomJobTitle()}", uniqueValue)
                                     .replace("{randomJobTitle()}", uniqueValue2)
                                     .replace("{randomJobTitle()}", uniqueValue3);
                break;
            case 'Население городов':
                uniqueCondition = generateUniqueValues(3, randomCountry);
                uniqueValue = uniqueCondition[0]
                uniqueValue2 = uniqueCondition[1]
                uniqueValue3 = uniqueCondition[2]
                chartText = chartText.replace("{randomCountry()}", uniqueValue)
                                     .replace("{randomCountry()}", uniqueValue2)
                                     .replace("{randomCountry()}", uniqueValue3);
                break;
            case 'Мед. данные учеников':
                uniqueCondition = generateUniqueValues(3, getRandomClass, 5, 11);
                uniqueValue = uniqueCondition[0]
                uniqueValue2 = uniqueCondition[1]
                uniqueValue3 = uniqueCondition[2]
                chartText = chartText.replace("{getRandomClass()}", uniqueValue)
                                     .replace("{getRandomClass()}", uniqueValue2)
                                     .replace("{getRandomClass()}", uniqueValue3);
                break;
            // Добавьте дополнительные случаи для других типов таблиц
            default:
                // Если тип таблицы не требует динамических значений
                chartText = selectedTableType.chart;
        }

        // Используем calculateCorrectChart сразу после генерации значений
        correctChartData = calculateCorrectChart(chartText, uniqueValue, uniqueValue2, uniqueValue3);


        // Создание HTML-элементов для задания
        const chartContainer = document.createElement("div");
        chartContainer.className = "chart-container";

        const chartTitle = document.createElement("div");
        chartTitle.className = "chart-title";
        chartTitle.innerText = `Задание 3: ${chartText}`;

        const chartAnswerContainer = document.createElement("div");
        chartAnswerContainer.className = "chart-answer-container";

        chartContainer.appendChild(chartTitle);
        chartContainer.appendChild(chartAnswerContainer);

        chartSection.appendChild(chartContainer);
    } else {
        const noChartMessage = document.createElement("div");
        noChartMessage.innerText = "Для этого типа таблицы не предусмотрено задание с диаграммой.";
        chartSection.appendChild(noChartMessage);
    }
}
      
      
        // Функция для добавления полей ввода
        function addObjectInput() {
            objectCount++;
            const container = document.getElementById('object-inputs_14ex');
            const div = document.createElement('div');
            div.className = 'object-row';
            div.id = `object-row-${objectCount}`;
            
            const objectLabel = document.createElement('input');
            objectLabel.type = 'text';
            objectLabel.placeholder = `Объект ${objectCount}`;
            objectLabel.id = `object-${objectCount}`;
            
            const objectValue = document.createElement('input');
            objectValue.type = 'number';
            objectValue.placeholder = `Значение ${objectCount}`;
            objectValue.id = `value-${objectCount}`;
            
            div.appendChild(objectLabel);
            div.appendChild(objectValue);
            container.appendChild(div);
        }

        // Функция для удаления последнего объекта
        function removeObjectInput() {
            if (objectCount > 0) {
                const lastObject = document.getElementById(`object-row-${objectCount}`);
                lastObject.remove();
                objectCount--;
            }
        }

        // Добавляем первые 5 объектов по умолчанию
        for (let i = 0; i < 5; i++) {
            addObjectInput();
        }

        document.getElementById('add-btn_14ex').addEventListener('click', addObjectInput);
        document.getElementById('remove-btn_14ex').addEventListener('click', removeObjectInput);

                // Функция для построения диаграммы
function createPieChart(data) {
    const ctx = document.getElementById('userChart_14ex').getContext('2d');
    if (userChart) {
        userChart.destroy(); // Уничтожаем предыдущую диаграмму, если она есть
    }

    // Преобразуем данные из словаря в массивы для графика
    const labels = Object.keys(data);
    const values = Object.values(data);

    userChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: '',
                data: values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.raw;
                        }
                    }
                }
            }
        }
    });
}

        // Функция для получения данных от пользователя и построения диаграммы
document.getElementById('build-btn_14ex').addEventListener('click', function() {
    userChartData = {}; // Словарь для хранения данных пользователя

    // Получаем данные из текстового поля
    const inputData = document.getElementById('data-input_14ex').value.trim();
    if (inputData) {
        const rows = inputData.split('\n');
        for (const row of rows) {
            const [label, value] = row.split(/\s+/);
            if (label && value) {
                userChartData[label] = parseFloat(value);
            }
        }
    } else {
        // Если данные из текстового поля не введены, используем поля ввода
        for (let i = 1; i <= objectCount; i++) {
            const label = document.getElementById(`object-${i}`).value;
            const value = parseFloat(document.getElementById(`value-${i}`).value);

            if (label && value) {
                userChartData[label] = value;
            }
        }
    }

    // Строим диаграмму
    createPieChart(userChartData);
    console.log(userChartData);
    document.getElementById('check-btn').style.display = 'inline';
});



        function downloadExcel(workbook) {
            if (workbook) {
                XLSX.writeFile(workbook, `${selectedTableType.name}.xlsx`);
            } else {
                alert("Сначала сгенерируйте задания и таблицу!");
            }
        }

        function populateTable(tableType) {
            const tableHeaders = document.getElementById("table-headers_14ex");
            const tableData = document.getElementById("table-data_14ex");

            tableHeaders.innerHTML = "";
            tableData.innerHTML = "";

            tableType.headers.forEach(header => {
                const th = document.createElement("th");
                th.textContent = header;
                tableHeaders.appendChild(th);
            });

            for (let i = 0; i < 5; i++) {
                const row = generateRowForDisplay(tableType);
                const tr = document.createElement("tr");
                row.forEach(cell => {
                    const td = document.createElement("td");
                    td.textContent = cell;
                    tr.appendChild(td);
                });
                tableData.appendChild(tr);
            }
        }

 
        // Эта функция генерирует строки только для отображения в таблице
        function generateRowForDisplay(tableType) {
            return tableType.rows()[0].map(cell => 
            typeof cell === "function" ? cell() : cell
            );
      }
      
      
        function generateRow(tableType) {
            const row = tableType.rows()[0].map(cell => 
                typeof cell === "function" ? cell() : cell
            );
            generatedData.push(row); // Добавляем сгенерированную строку в массив
            return row;
            
        }

        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }
      
        function calculateCorrectAnswer(index, randomReplacementValue, randomReplacementValue2, randomReplacementValue3, randomReplacementValue4) {
    const question = generatedQuestions[index].questionText;

    if (question.includes("Сколько товаров было продано в регионе")) {
        return generatedData.reduce((total, row) => row[1] === randomReplacementValue ? total + row[3] : total, 0);
    }

    if (question.includes("Какой товар продали больше всего?")) {
        let productSales = {};
        generatedData.forEach(row => {
            const product = row[2];
            const quantity = row[3];
            productSales[product] = (productSales[product] || 0) + quantity;
        });
        const maxProduct = Object.keys(productSales).reduce((a, b) => productSales[a] > productSales[b] ? a : b);
        return maxProduct;
    }

    if (question.includes("Какова общая стоимость продаж для всех товаров?")) {
        return generatedData.reduce((total, row) =>  total + row[4], 0);
    }

    if (question.includes("Какова средняя стоимость одного товара?")) {
        const totalCost = generatedData.reduce((total, row) => total + row[4], 0);
        const totalQuantity = generatedData.reduce((total, row) => total + row[3], 0);
        return (totalCost / totalQuantity).toFixed(1).replace('.', ',');
    }
    

    if (question.includes("Каков наибольший объём продаж в единицах на")) {
        return Math.max(...generatedData.filter(row => row[1] === randomReplacementValue).map(row => row[3]));
    }
          
    // Учебные успеваемости
    if (question.includes("Какова средняя оценка по")) {
        const totalGrade = generatedData.reduce((total, row) => row[2] === randomReplacementValue ? total + row[3] : total, 0); 
        const count = generatedData.filter(row => row[2] === randomReplacementValue).length;
        return (totalGrade / count).toFixed(1).replace('.', ',');
    }

    if (question.includes("Сколько учеников получили")) {
        return generatedData.filter(row => row[2] === randomReplacementValue).filter(row => row[3] === randomReplacementValue3).lenght;
    }

    if (question.includes("В каком классе больше всего отличников?")) {
        let classExcellents = {};
        generatedData.forEach(row => {
            const gradeClass = row[4];
            const grade = row[3];
            if (grade === 5) {
                classExcellents[gradeClass] = (classExcellents[gradeClass] || 0) + 1;
            }
        });
        return Object.keys(classExcellents).reduce((a, b) => classExcellents[a] > classExcellents[b] ? a : b);
    }

    if (question.includes("Сколько учеников изучают")) {
        return generatedData.filter(row => row[2] === randomReplacementValue).length;
    }

    if (question.includes("Каков общий балл по")) {
        return generatedData.filter(row => row[2] === randomReplacementValue).filter(row => row[4] === randomReplacementValue2).reduce((total, row) => total + row[3], 0);
    }

    // Учет работы сотрудников
    if (question.includes("Сколько часов отработал сотрудник")) {
        return generatedData.filter(row => row[0] === randomReplacementValue2).reduce((total, row) => total + row[3], 0);
    }

    if (question.includes("Какова общая продолжительность работы по")) {
        return generatedData.filter(row => row[4] === randomReplacementValue3).reduce((total, row) => total + row[3], 0);
    }

    if (question.includes("Сколько сотрудников в отделе")) {
        return generatedData.filter(row => row[2] === randomReplacementValue).length;
    }

    // Наблюдения за погодой
    if (question.includes("Какова средняя температура за")) {
        const totalTemp = generatedData.filter(row => row[0] === randomReplacementValue2).reduce((total, row) => total + row[1], 0);
        const count = generatedData.filter(row => row[0] === randomReplacementValue2).length;
        return (totalTemp / count).toFixed(1).replace('.', ',');
    }

    if (question.includes("Сколько выпало осадков?")) {
        return generatedData.reduce((total, row) => total + row[2], 0);
    }

    if (question.includes("Какое наибольшее значение температуры было зафиксировано?")) {
        return Math.max(...generatedData.map(row => row[1]));
    }

    if (question.includes("Сколько дней дул")) {
        return generatedData.filter(row => row[4] === randomReplacementValue).length;
    }

    if (question.includes("Сколько раз был зафиксирован")) {
        return generatedData.filter(row => row[4] === randomReplacementValue).length;
    }

    // Продажи в магазине
    if (question.includes("Какова общая сумма продаж?")) {
        return generatedData.reduce((total, row) => total + row[4], 0);
    }

    if (question.includes("Какой товар продан в наибольшем количестве?")) {
        let productSales = {};
        generatedData.forEach(row => {
            const product = row[0];
            const quantity = row[3];
            productSales[product] = (productSales[product] || 0) + quantity;
        });
        return Object.keys(productSales).reduce((a, b) => productSales[a] > productSales[b] ? a : b);
    }

    if (question.includes("Какова средняя цена товаров в категории")) {
        const totalPrice = generatedData.filter(row => row[1] === randomReplacementValue2).reduce((total, row) => total + row[4], 0);
        const count = generatedData.filter(row => row[1] === randomReplacementValue2).reduce((total, row) => total + row[3], 0);
        return (totalPrice / count).toFixed(1).replace('.', ',');
    }

    if (question.includes("Сколько было продано")) {
        return generatedData.filter(row => row[0] === randomReplacementValue).reduce((total, row) => total + row[3], 0);
    }

    if (question.includes("Какой товар принес наибольшую выручку?")) {
        let productSales = {};
        generatedData.forEach(row => {
            const product = row[0];
            const revenue = row[4];
            productSales[product] = (productSales[product] || 0) + revenue;
        });
        return Object.keys(productSales).reduce((a, b) => productSales[a] > productSales[b] ? a : b);
    }

    if (question.includes("Какова сумма продаж для товаров из категории")) {
        return generatedData.filter(row => row[1] === randomReplacementValue2).reduce((total, row) => total + row[4], 0);
    }

    // Зарплата сотрудников
    if (question.includes("Каков средний оклад")) {
        const totalSalary = generatedData.filter(row => row[2] === randomReplacementValue).reduce((total, row) => total + row[3], 0);
        const count = generatedData.filter(row => row[2] === randomReplacementValue).length;
        return (totalSalary / count).toFixed(1).replace('.', ',');
    }

    if (question.includes("Какая наибольшая премия у")) {
        return Math.max(...generatedData.filter(row => row[2] === randomReplacementValue).map(row => row[4]));
    }

    if (question.includes("Сколько сотрудников получают премию более")) {
        return generatedData.filter(row => row[4] > randomReplacementValue2).length;
    }

    if (question.includes("Какова общая зарплата сотрудников отдела")) {
        return generatedData.filter(row => row[2] === randomReplacementValue).reduce((total, row) => total + row[3] + row[4], 0);
    }

    if (question.includes("Сколько сотрудников получают оклад более")) {
        return generatedData.filter(row => row[3] > randomReplacementValue3).length;
    }
       
    if (question.includes("Сколько городов имеют численность населения менее")) {
        return generatedData.filter(row => row[1] < randomReplacementValue).length;
      
    }
          
    if (question.includes("Сколько городов имеют численность населения более")) {
        return generatedData.filter(row => row[1] > randomReplacementValue).length;
      
    }

    if (question.includes("Какова средняя численность населения")) {
        const Cities = generatedData.filter(row => row[2] === randomReplacementValue2);
        const totalPopulation = Cities.reduce((total, row) => total + row[1], 0);
        return (totalPopulation / Cities.length).toFixed(1).replace('.', ',');
    }
          
    if (question.includes("Каков вес самого тяжелого ученика")) {
        const maxWeight = Math.max(...generatedData.filter(row => row[2] === randomReplacementValue).map(row => row[4]));
        return maxWeight;
    }

    if (question.includes("Какой процент учеников")) {  
        console.log(generatedData);
        const totalStudents = generatedData.filter(row => row[2] === randomReplacementValue).length;
        console.log(totalStudents);
    
        // Убедимся, что есть ученики в классе
        if (totalStudents === 0) return "0"; 

        const tallStudents = generatedData.filter(row => row[2] === randomReplacementValue && row[3] > randomReplacementValue2).length;
        console.log(tallStudents);
        return ((tallStudents / totalStudents) * 100).toFixed(1).replace('.', ',');
    }

    if (question.includes("Каков средний рост в")) { 
        const studentsInClass = generatedData.filter(row => row[2] === randomReplacementValue);

        // Убедимся, что в классе есть ученики
        if (studentsInClass.length === 0) return "0"; 
    
        const totalHeight = studentsInClass.reduce((total, row) => total + row[3], 0);
    
        return (totalHeight / studentsInClass.length).toFixed(1).replace('.', ',');
    }
          
    if (question.includes("Сколько продуктов содержат меньше")) {
        const count = generatedData.filter(row => row[3] < randomReplacementValue2 && row[2] > randomReplacementValue).length;
        return count;
    }

    if (question.includes("Какова средняя калорийность продуктов с содержанием углеводов")) {
        const zeroCarbProducts = generatedData.filter(row => row[3] === randomReplacementValue2);
        const avgCalories = zeroCarbProducts.reduce((total, row) => total + row[4], 0) / zeroCarbProducts.length;
        return avgCalories.toFixed(1).replace('.', ',');
    }
          
    if (question.includes("Сколько продуктов не содержат жиры")) {
        const count = generatedData.filter(row => row[1] === 0).length;
        return count;
    }

    

    return null;
}
      
        function calculateCorrectChart(chartText, uniqueValue, uniqueValue2, uniqueValue3) {
    const chartEx = chartText;
    let correctChartData = {}; // Словарь для хранения правильных данных

    if (chartEx.includes("Постройте круговую диаграмму, отображающую соотношение товаров из регионов:")) {
        correctChartData = {
            [uniqueValue]: generatedData.filter(row => row[1] === uniqueValue).reduce((total, row) => total + row[3], 0),
            [uniqueValue2]: generatedData.filter(row => row[1] === uniqueValue2).reduce((total, row) => total + row[3], 0),
            [uniqueValue3]: generatedData.filter(row => row[1] === uniqueValue3).reduce((total, row) => total + row[3], 0)
        };
    }

    if (chartEx.includes("Постройте круговую диаграмму, отображающую соотношение среднего балла")) {
        correctChartData = {
            [uniqueValue]: getAverageScoreForClass(uniqueValue),
            [uniqueValue2]: getAverageScoreForClass(uniqueValue2),
            [uniqueValue3]: getAverageScoreForClass(uniqueValue3)
        };
    }

    if (chartEx.includes("Постройте круговую диаграмму, отображающую соотношение часов работы над")) {
        correctChartData = {
            [uniqueValue]: getTotalWorkHoursForProject(uniqueValue),
            [uniqueValue2]: getTotalWorkHoursForProject(uniqueValue2),
            [uniqueValue3]: getTotalWorkHoursForProject(uniqueValue3)
        };
    }

    if (chartEx.includes("Постройте круговую диаграмму, отображающую соотношение средней температуры для месяцев:")) {
        correctChartData = {
            [uniqueValue]: getAverageTemperatureForMonth(uniqueValue),
            [uniqueValue2]: getAverageTemperatureForMonth(uniqueValue2),
            [uniqueValue3]: getAverageTemperatureForMonth(uniqueValue3)
        };
    }

    if (chartEx.includes("Постройте круговую диаграмму, отображающую соотношение проданного кол-ва товаров:")) { 
        correctChartData = {
            [uniqueValue]: getTotalSalesForProduct(uniqueValue),
            [uniqueValue2]: getTotalSalesForProduct(uniqueValue2),
            [uniqueValue3]: getTotalSalesForProduct(uniqueValue3)
        };
    }

    if (chartEx.includes("Постройте круговую диаграмму, отображающую соотношение кол-ва сотрудников на должностях:")) {
        correctChartData = {
            [uniqueValue]: getTotalEmployeesByJobTitle(uniqueValue),
            [uniqueValue2]: getTotalEmployeesByJobTitle(uniqueValue2),
            [uniqueValue3]: getTotalEmployeesByJobTitle(uniqueValue3)
        };
    }

    if (chartEx.includes("Постройте круговую диаграмму, отображающую соотношение кол-ва городов из стран:")) {
        correctChartData = {
            [uniqueValue]: getTotalCitiesByCountry(uniqueValue),
            [uniqueValue2]: getTotalCitiesByCountry(uniqueValue2),
            [uniqueValue3]: getTotalCitiesByCountry(uniqueValue3)
        };
    }

    if (chartEx.includes("Постройте круговую диаграмму, отображающую соотношение среднего роста для")) {
        correctChartData = {
            [uniqueValue]: getAverageHeightForClass(uniqueValue),
            [uniqueValue2]: getAverageHeightForClass(uniqueValue2),
            [uniqueValue3]: getAverageHeightForClass(uniqueValue3)
        };
    }

    if (chartEx.includes("Постройте круговую диаграмму, отображающую соотношение среднего количества жиров, белков и углеводов в первых 100 продуктах")) {
        correctChartData = {
            "Жиры": getAverageNutrientForProducts("fats"),
            "Белки": getAverageNutrientForProducts("proteins"),
            "Углеводы": getAverageNutrientForProducts("carbs")
        };
    }
    console.log(correctChartData);
    return correctChartData;
}

      
      
      function getAverageScoreForClass(classNumber) {
    const classData = generatedData.filter(row => row[4] === classNumber);
    const totalScore = classData.reduce((total, row) => total + row[3], 0);
    return (totalScore / classData.length).toFixed(1);
}

function getTotalWorkHoursForProject(project) {
    return generatedData.filter(row => row[4] === project).reduce((total, row) => total + row[3], 0);
}

function getAverageTemperatureForMonth(month) {
    const monthData = generatedData.filter(row => row[0] === month);
    const totalTemp = monthData.reduce((total, row) => total + row[1], 0);
    return (totalTemp / monthData.length).toFixed(1);
}

function getTotalSalesForProduct(product) {
    return generatedData.filter(row => row[0] === product).reduce((total, row) => total + row[3], 0);
}

function getTotalEmployeesByJobTitle(jobTitle) {
    return generatedData.filter(row => row[2] === jobTitle).length;
}

function getTotalCitiesByCountry(country) {
    return generatedData.filter(row => row[2] === country).length;
}

function getAverageHeightForClass(classNumber) {
    const classData = generatedData.filter(row => row[2] === classNumber);
    const totalHeight = classData.reduce((total, row) => total + row[3], 0);
    return (totalHeight / classData.length).toFixed(1);
}

function getAverageNutrientForProducts(nutrient) {
    const nutrientIndex = {
        fats: 1,
        proteins: 2,
        carbs: 3
    };
    const first100Products = generatedData.slice(0, 100);
    const totalNutrient = first100Products.reduce((total, row) => total + row[nutrientIndex[nutrient]], 0);
    return (totalNutrient / first100Products.length).toFixed(1);
}

      
            // Функция для проверки данных диаграммы
function checkPieChart(userData, correctChartData) {
    // Проверка, что оба параметра — объекты
    if (typeof userData !== 'object' || userData === null) {
        console.error("userData is not a valid object:", userData);
        return false; 
    }

    if (typeof correctChartData !== 'object' || correctChartData === null) {
        console.error("correctChartData is not a valid object:", correctChartData);
        return false; 
    }

    // Проверка количества объектов
    if (Object.keys(userData).length !== Object.keys(correctChartData).length) {
        console.log("false_количество");
        return false;
    }

    // Преобразуем userData и correctChartData в массивы для сортировки и сравнения
    const sortedUserData = Object.entries(userData).sort((a, b) => a[0].localeCompare(b[0]));
    const sortedCorrectData = Object.entries(correctChartData).sort((a, b) => a[0].localeCompare(b[0]));

    console.log("Sorted User Data:", sortedUserData);
    console.log("Sorted Correct Data:", sortedCorrectData);

    // Сравниваем каждый объект и его значение
    for (let i = 0; i < sortedUserData.length; i++) {
        const [userLabel, userValue] = sortedUserData[i];
        const [correctLabel, correctValue] = sortedCorrectData[i];

        console.log(`Comparing user: ${userLabel} (${userValue}) with correct: ${correctLabel} (${correctValue})`);

        if (userLabel !== correctLabel || Number(userValue) !== Number(correctValue)) {
            console.log("неправильные метки");
            return false; // Если метка или значение не совпадает
        }
    }
    return true; // Все метки и значения совпадают
}

      
      

      
      function checkAnswer(userAnswer, correctAnswer) {
    // Проверяем числовые ответы
    if (!isNaN(userAnswer) && !isNaN(correctAnswer)) {
        return parseFloat(userAnswer) === parseFloat(correctAnswer);
    }
    // Проверяем текстовые ответы (например, названия товаров)
    return userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
}



        // Функции для генерации случайных данных
        function randomName() {
            const names = ["Иван", "Анна", "Мария", "Сергей", "Петр"];
            return names[Math.floor(Math.random() * names.length)];
        }

        function randomRegion() {
            const regions = ["Север", "Юг", "Запад", "Восток"];
            return regions[Math.floor(Math.random() * regions.length)];
        }

        function randomProduct() {
            const products = ["Ручка", "Карандаш", "Тетрадь", "Книга", "Ластик"];
            return products[Math.floor(Math.random() * products.length)];
        }

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        

        function randomSubject() {
            const subjects = ["Математика", "Русский язык", "Литература", "Физика", "Химия"];
            return subjects[Math.floor(Math.random() * subjects.length)];
        }
        
        function randomLastName() {
            const lastNames = ["Иванов", "Смирнов", "Кузнецов", "Попов", "Соколов"];
            return lastNames[Math.floor(Math.random() * lastNames.length)];
        }
        
        function getRandomGrade(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        
        function getRandomClass(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        
        function randomJobTitle() {
            const jobTitles = ["Менеджер", "Разработчик", "Дизайнер", "Аналитик", "Инженер"];
            return jobTitles[Math.floor(Math.random() * jobTitles.length)];
        }
        
        function randomDepartment() {
            const departments = ["Отдел продаж", "Маркетинг", "Технический отдел", "Кадровый отдел"];
            return departments[Math.floor(Math.random() * departments.length)];
        }
        
        function randomProject() {
            const projects = ["Проект A", "Проект B", "Проект C", "Проект D"];
            return projects[Math.floor(Math.random() * projects.length)];
        }
        
        function randomMonth() {
            const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
            return months[Math.floor(Math.random() * months.length)];
        }
        
        function randomCategory() {
            const categories = ["Канцелярские товары", "Книги", "Игрушки", "Одежда", "Электроника"];
            return categories[Math.floor(Math.random() * categories.length)];
        }
        
        function getRandomSalary(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        
        function getRandomBonus(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
              
        function randomCity() {
            const cities = ["Город Х", "Город Y", "Город C", "Город A", "Город B"];
            return cities[Math.floor(Math.random() * cities.length)];
        }
        
        function randomCountry() {
            const countries = ["Россия", "Германия", "США", "Китай", "Индия"];
            return countries[Math.floor(Math.random() * countries.length)];
        }
        
        function getRandomHeight(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        
        function getRandomWeight(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        
        function getRandomFats(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        
        function getRandomProteins(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        
        function getRandomCarbohydrats(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
      
        function randomFood() {
            const products = ["Продукт X", "Продукт Y", "Продукт A", "Продукт D", "Продукт B"];
            return products[Math.floor(Math.random() * products.length)];
        }
      
        // Генерация уникальных значений
        function generateUniqueValues(count, generatorFunction, ...args) {
    let uniqueValues = new Set();
    let maxAttempts = count * 10; // Ограничим количество попыток для предотвращения бесконечного цикла
    let attempts = 0;

    while (uniqueValues.size < count && attempts < maxAttempts) {
        uniqueValues.add(generatorFunction(...args));
        attempts++;
    }

    if (uniqueValues.size < count) {
        console.warn("Невозможно сгенерировать достаточное количество уникальных значений.");
    }

    return [...uniqueValues];
}
