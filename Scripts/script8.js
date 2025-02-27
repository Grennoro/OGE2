const words = [
        "Кровать", "Стул", "Шахматы", "Теннис", "Зима",
        "Средиземноморье", "Морепродукты", "Погода",
        "Футбол", "Чтение", "Путешествия", "Книги",
        "Спорт", "Музыка", "Искусство", "Кулинария"
    ];

    let currentTask_8ex = {};
    document.getElementById('generate_variant').addEventListener('click', generateTask_8ex);
    document.getElementById('save_checking').addEventListener('click', checkAnswer_8ex);

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function generateOrQuery(word1, word2) {
        return `${word1} | ${word2}`;
    }

    function generateAndQuery(word1, word2) {
        return `${word1} & ${word2}`;
    }

    function generateTask_8ex() {
        const word1 = words[getRandomInt(0, words.length - 1)];
        let word2 = words[getRandomInt(0, words.length - 1)];
	console.log(word1, word2);

        while (word1 === word2) {
            word2 = words[getRandomInt(0, words.length)];
        }

        const andQuery = generateAndQuery(word1, word2);
        const orQuery = generateOrQuery(word1, word2);

        const pagesWord1 = getRandomInt(1000, 5000);
        const pagesWord2 = getRandomInt(1000, 5000);
        const pagesAnd = getRandomInt(100, Math.min(pagesWord1, pagesWord2));
        const pagesOr = pagesWord1 + pagesWord2 - pagesAnd;

        currentTask_8ex = {
            orQuery: orQuery,
            andQuery: andQuery,
            word1: word1,
            word1Pages: pagesWord1,
            word2: word2,
            word2Pages: pagesWord2,
            andPages: pagesAnd,
            orPages: pagesOr
        };

        displayTask();
    }

    function displayTask() {
        const randomWord = getRandomInt(0, 4);
        let questionWord = '';
        let correctAnswer = 0;

        if (randomWord === 0) {
            questionWord = currentTask_8ex.word1;
            correctAnswer = currentTask_8ex.word1Pages;
        } else if (randomWord === 1) {
            questionWord = currentTask_8ex.word2;
            correctAnswer = currentTask_8ex.word2Pages;
        } else if (randomWord === 2) {
            questionWord = currentTask_8ex.orQuery;
            correctAnswer = currentTask_8ex.orPages;
        } else {
            questionWord = currentTask_8ex.andQuery;
            correctAnswer = currentTask_8ex.andPages;
        }

        const questions_8ex = [
            `Какое количество страниц (в тысячах) будет найдено по запросу ${questionWord}?`,
            `Сколько страниц будет по запросу ${questionWord}?`,
            `Какое количество страниц соответствует запросу ${questionWord}?`,
            `Какое количество страниц найдено для ${questionWord}?`
        ];

        document.getElementById('question_8ex').textContent = questions_8ex[getRandomInt(0, questions_8ex.length - 1)];

        let otherQueries = '';
        if (questionWord === currentTask_8ex.word1) {
            otherQueries = `
                <p>${currentTask_8ex.word2}: ${currentTask_8ex.word2Pages} тыс.</p>
                <p>${currentTask_8ex.orQuery}: ${currentTask_8ex.orPages} тыс.</p>
                <p>${currentTask_8ex.andQuery}: ${currentTask_8ex.andPages} тыс.</p>
            `;
        } else if (questionWord === currentTask_8ex.word2) {
            otherQueries = `
                <p>${currentTask_8ex.word1}: ${currentTask_8ex.word1Pages} тыс.</p>
                <p>${currentTask_8ex.orQuery}: ${currentTask_8ex.orPages} тыс.</p>
                <p>${currentTask_8ex.andQuery}: ${currentTask_8ex.andPages} тыс.</p>
            `;
        } else if (questionWord === currentTask_8ex.orQuery) {
            otherQueries = `
                <p>${currentTask_8ex.word1}: ${currentTask_8ex.word1Pages} тыс.</p>
                <p>${currentTask_8ex.word2}: ${currentTask_8ex.word2Pages} тыс.</p>
                <p>${currentTask_8ex.andQuery}: ${currentTask_8ex.andPages} тыс.</p>
            `;
        } else {
            otherQueries = `
                <p>${currentTask_8ex.word1}: ${currentTask_8ex.word1Pages} тыс.</p>
                <p>${currentTask_8ex.word2}: ${currentTask_8ex.word2Pages} тыс.</p>
                <p>${currentTask_8ex.orQuery}: ${currentTask_8ex.orPages} тыс.</p>
            `;
        }

        document.getElementById('queries_8ex').innerHTML = otherQueries;

        currentTask_8ex.correctAnswer = correctAnswer;
        document.getElementById('feedback_8ex').textContent = '';
        document.getElementById('answer_8ex').value = '';
        document.getElementById('solution_8ex').classList.add('hidden');
        document.getElementById('solution_8ex').textContent = '';
    }

    function checkAnswer_8ex() {
        const userAnswer = document.getElementById('answer_8ex').value;

        if (userAnswer == currentTask_8ex.correctAnswer) {
            document.getElementById('feedback_8ex').textContent = "Правильно!";
        } else {
            document.getElementById('feedback_8ex').textContent = `Неправильно. Правильный ответ: ${currentTask_8ex.correctAnswer} тыс.`;
        }
    }

    function showAnswer_8ex() {
        document.getElementById('feedback_8ex').textContent = `Правильный ответ: ${currentTask_8ex.correctAnswer} тыс.`;
    }

    function showSolution_8ex() {
        let solutionText = `<p>Слова: ${currentTask_8ex.word1} и ${currentTask_8ex.word2}</p>`;
        solutionText += `<p>Количество страниц по слову "${currentTask_8ex.word1}": ${currentTask_8ex.word1Pages} тыс.</p>`;
        solutionText += `<p>Количество страниц по слову "${currentTask_8ex.word2}": ${currentTask_8ex.word2Pages} тыс.</p>`;
        
        // Display the OR and AND query pages
        solutionText += `<p>Количество страниц по запросу "${currentTask_8ex.orQuery}": ${currentTask_8ex.orPages} тыс.</p>`;
        solutionText += `<p>Количество страниц по запросу "${currentTask_8ex.andQuery}": ${currentTask_8ex.andPages} тыс.</p>`;

        // Formula for the OR query
        if (currentTask_8ex.correctAnswer === currentTask_8ex.orPages) {
            solutionText += `<p>Формула для вычисления количества страниц по запросу "${currentTask_8ex.orQuery}":</p>`;
            solutionText += `<p>N1 + N2 - N3 = ${currentTask_8ex.word1Pages} + ${currentTask_8ex.word2Pages} - ${currentTask_8ex.andPages} = ${currentTask_8ex.orPages} тыс.</p>`;
        }

        // Formula for the AND query
        if (currentTask_8ex.correctAnswer === currentTask_8ex.andPages) {
            solutionText += `<p>Формула для вычисления количества страниц по запросу "${currentTask_8ex.andQuery}":</p>`;
            solutionText += `<p>N1 + N2 - N3 = ${currentTask_8ex.word1Pages} + ${currentTask_8ex.word2Pages} - ${currentTask_8ex.orPages} = ${currentTask_8ex.andPages} тыс.</p>`;
        }

        // Formula to calculate the pages for the second word
        if (currentTask_8ex.correctAnswer === currentTask_8ex.word2Pages) {
            solutionText += `<p>Формула для вычисления количества страниц по слову "${currentTask_8ex.word2}":</p>`;
            solutionText += `<p>N2 = N(${currentTask_8ex.orQuery}) - N1 + N(${currentTask_8ex.andQuery})</p>`;
            solutionText += `<p>N2 = ${currentTask_8ex.orPages} - ${currentTask_8ex.word1Pages} + ${currentTask_8ex.andPages} = ${currentTask_8ex.word2Pages} тыс.</p>`;
        }

        // Formula to calculate the pages for the first word
        if (currentTask_8ex.correctAnswer === currentTask_8ex.word1Pages) {
            solutionText += `<p>Формула для вычисления количества страниц по слову "${currentTask_8ex.word1}":</p>`;
            solutionText += `<p>N1 = N(${currentTask_8ex.orQuery}) - N2 + N(${currentTask_8ex.andQuery})</p>`;
            solutionText += `<p>N1 = ${currentTask_8ex.orPages} - ${currentTask_8ex.word2Pages} + ${currentTask_8ex.andPages} = ${currentTask_8ex.word1Pages} тыс.</p>`;
        }

        document.getElementById('solution_8ex').innerHTML = solutionText;
        document.getElementById('solution_8ex').classList.remove('hidden');
    }