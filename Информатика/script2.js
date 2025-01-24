let variants = [
    [["@", "+", "~"], ["@+", "@~", "~+", "~@", "+@", "+~"], ["@+~", "@~+", "+@~", "+~@", "~@+", "~+@"]],
    [["+", "*", "_"], ["+*", "+_", "*+", "*_", "_+", "_*"], ["+*_", "+_*", "*+_", "*_+", "_+*", "_*+"]],
    [["€", "?"], ["€?", "?€"], ["€??", "??€", "?€?", "€?€", "€€?"]],
    [["?", "!"], ["?!", "!?"], ["?!?", "?!!", "!?!", "!!?", "??!"]],
    [["@", "&"], ["@&", "&@"], ["@&&", "&&@", "&@&", "&&&", "@@&"]],
    [["Λ", "Ω"], ["ΛΩ", "ΩΛ"], ["ΛΩΩ", "ΩΛΛ", "ΩΩΛ", "ΛΛΩ", "ΛΩΛ"]],
    [["1", "0"], ["10", "01"], ["100", "001", "010", "110", "011", "101"]],
    [["0", "1", "2"], ["01", "02", "10", "12", "20", "21"], ["012", "021", "102", "120", "201", "210"]]
];

let encoding_types = [
    {
        description: "Ребята играли в шпионов и кодировали сообщения собственным шифром.",
        encoding: function(letter, encode) {
            return encode.length > 0 ? encode.splice(Math.floor(Math.random() * encode.length), 1)[0] : '?';
        }
    },
    {
        description: "От разведчика была получена шифрованная радиограмма, переданная с использованием азбуки Морзе.",
        encoding: function(letter) {
            switch (letter) {
                case "А": return "•-";
                case "Б": return "-•••";
                case "В": return "•--";
                case "Г": return "--•";
                case "Д": return "-••";
                case "Е": return "•";
                case "Ж": return "•••-";
                case "З": return "--••";
                case "И": return "••";
                case "Й": return "•---";
                case "К": return "-•-";
                case "Л": return "•-••";
                case "М": return "--";
                case "Н": return "-•";
                case "О": return "---";
                case "П": return "•--•";
                case "Р": return "•-•";
                case "С": return "•••";
                case "Т": return "-";
                case "У": return "••-";
                case "Ф": return "••-•";
                case "Х": return "••••";
                case "Ц": return "-•-•";
                case "Ч": return "---•";
                case "Ш": return "----";
                case "Щ": return "--•-";
                case "Ы": return "-•--";
                case "Э": return "••-••";
                case "Ю": return "••--";
                case "Я": return "•-•-";
                default: return "?";
            }
        }
    },
    {
        description: "Сообщение передается шифром.",
        encoding: function(letter, encode) {
            return encode.length > 0 ? encode.splice(Math.floor(Math.random() * encode.length), 1)[0] : '?';
        }
    },
    {
        description: "Агент 007, передавая важные сведения своему напарнику, закодировал сообщение придуманным шифром.",
        encoding: function(letter, encode) {
            return encode.length > 0 ? encode.splice(Math.floor(Math.random() * encode.length), 1)[0] : '?';
        }
    },
    {
        description: "Ваня шифрует русские слова, записывая вместо каждой буквы ее номер в алфавите (без пробелов).",
        encoding: function(letter) {
            switch (letter) {
                case "А": return "1";
                case "Б": return "2";
                case "В": return "3";
                case "Г": return "4";
                case "Д": return "5";
                case "Е": return "6";
                case "Ё": return "7";
                case "Ж": return "8";
                case "З": return "9";
                case "И": return "10";
                case "Й": return "11";
                case "К": return "12";
                case "Л": return "13";
                case "М": return "14";
                case "Н": return "15";
                case "О": return "16";
                case "П": return "17";
                case "Р": return "18";
                case "С": return "19";
                case "Т": return "20";
                case "У": return "21";
                case "Ф": return "22";
                case "Х": return "23";
                case "Ц": return "24";
                case "Ч": return "25";
                case "Ш": return "26";
                case "Щ": return "27";
                case "Ъ": return "28";
                case "Ы": return "29";
                case "Ь": return "30";
                case "Э": return "31";
                case "Ю": return "32";
                case "Я": return "33";
                default: return "?";
            }
        }
    },
    {
        description: "Вася шифрует английские слова, записывая вместо каждой буквы ее номер в алфавите (без пробелов).",
        encoding: function(letter) {
            switch (letter) {
                case "A": return "1";
                case "B": return "2";
                case "C": return "3";
                case "D": return "4";
                case "E": return "5";
                case "F": return "6";
                case "G": return "7";
                case "H": return "8";
                case "I": return "9";
                case "J": return "10";
                case "K": return "11";
                case "L": return "12";
                case "M": return "13";
                case "N": return "14";
                case "O": return "15";
                case "P": return "16";
                case "Q": return "17";
                case "R": return "18";
                case "S": return "19";
                case "T": return "20";
                case "U": return "21";
                case "V": return "22";
                case "W": return "23";
                case "X": return "24";
                case "Y": return "25";
                case "Z": return "26";
                default: return "?";
            }
        }
    }
];

function get_random_letters(length, exclude, alphabet) {
    let letters = "";
    while (letters.length < length) {
        let letter = alphabet[Math.floor(Math.random() * alphabet.length)];
        if (!letters.includes(letter) && !exclude.includes(letter)) {
            letters += letter;
        }
    }
    return letters;
}

function generate_random_word(length, alphabet) {
    return get_random_letters(length, "", alphabet);
}

function count_decodings(encoded_message, cipher_table) {
    let n = encoded_message.length;
    let dp = new Array(n + 1).fill(0);
    dp[0] = 1;

    for (let i = 1; i <= n; i++) {
        for (let letter in cipher_table) {
            let code = cipher_table[letter];
            let code_len = code.length;
            if (i >= code_len && encoded_message.substring(i - code_len, i) === code) {
                dp[i] += dp[i - code_len];
            }
        }
    }

    return dp[n];
}

function get_random_int(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function main() {
    let output = document.getElementById('output');
    let answerInput = document.getElementById('answerInput');
    let alphabet = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЫЭЮЯ";
    let alphabetENG = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let answ = '';
    let encoding_type = encoding_types[Math.floor(Math.random() * encoding_types.length)];
    let index = Math.floor(Math.random() * variants.length);
    let symbols = variants[index];
    let encode = [];
    outputans.innerHTML = ``;
    answer.innerHTML = '';

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < symbols[i].length; j++) {
            encode.push(symbols[i][j]);
        }
    }

    let word;
    if (encoding_type["description"] === "Вася шифрует английские слова, записывая вместо каждой буквы ее номер в алфавите (без пробелов).") {
        word = generate_random_word(get_random_int(4, 6), alphabetENG);
    } else if (encoding_type["description"] === "Ваня шифрует русские слова, записывая вместо каждой буквы ее номер в алфавите (без пробелов).") {
        word = generate_random_word(get_random_int(4, 6), alphabet);
    } else {
        word = generate_random_word(get_random_int(4, 6), alphabet);
    }

    let table = {};
    let encoded_message = "";

    for (let letter of word) {
        if (!table.hasOwnProperty(letter)) {
            table[letter] = encoding_type["encoding"](letter, encode);
        }
        encoded_message += table[letter];
    }

    let random_letters;
    if (encoding_type["description"] === "Вася шифрует английские слова, записывая вместо каждой буквы ее номер в алфавите (без пробелов).") {
        random_letters = get_random_letters(get_random_int(1, 3), word, alphabetENG);
    } else {
        random_letters = get_random_letters(get_random_int(1, 3), word, alphabet);
    }

    for (let letter of random_letters) {
        if (!table.hasOwnProperty(letter)) {
            table[letter] = encoding_type["encoding"](letter, encode);
        }
    }

    let shuffled_table = Object.entries(table);
    shuffled_table.sort(() => Math.random() - 0.5);

    let possible_decodings = count_decodings(encoded_message, table);
    if (possible_decodings > 1) {
        main();
        return;
    }

    output.innerHTML = encoding_type['description'] + "<br>";
    if (encoding_type["description"] === "Ваня шифрует русские слова, записывая вместо каждой буквы ее номер в алфавите (без пробелов)." ||
        encoding_type["description"] === "Вася шифрует английские слова, записывая вместо каждой буквы ее номер в алфавите (без пробелов).") {
        answ = 'Введите расшифрованное сообщение: ';

        let full_alphabet = (encoding_type["description"].includes("русские")) ? alphabet : alphabetENG;
        let full_table = {};
        for (let letter of full_alphabet) {
            full_table[letter] = encoding_type["encoding"](letter, encode);
        }

        output.innerHTML += "<br>Кодовая таблица:<br>";
        let count = 0;
        for (let [letter, code] of Object.entries(full_table)) {
            output.innerHTML += `${letter} ${code}&nbsp;&nbsp;`;
            if (++count % 4 === 0) {
                output.innerHTML += "<br>";
            }
        }

        output.innerHTML += "<br>Некоторые шифровки можно расшифровать не одним способом. Даны четыре шифровки:<br>";

        let encoded_messages = [encoded_message];

        while (encoded_messages.length < 4) {
            let new_word = generate_random_word(get_random_int(4, 6), full_alphabet);
            let new_encoded_message = "";
            for (let letter of new_word) {
                new_encoded_message += full_table[letter] || "?";
            }
            encoded_messages.push(new_encoded_message);
        }

        encoded_messages.sort(() => Math.random() - 0.5);

        for (let message of encoded_messages) {
            output.innerHTML += message + "<br>";
        }

        if (index === 7) {
            output.innerHTML += "<br>Только одна из них расшифровывается единственным способом. Найдите ее и расшифруйте. В качестве ответа запишите количество БУКВ в сообщении.";
            answ = 'Введите количество букв: ';
        } else {
            output.innerHTML += "<br>Только одна из них расшифровывается единственным способом. Найдите ее и расшифруйте. Получившееся слово запишите в качестве ответа.";
            answ = 'Введите расшифрованное сообщение: ';
        }
        
    } else {
        output.innerHTML += "Кодовая таблица:<br>";
        for (let [letter, code] of shuffled_table) {
            output.innerHTML += `${letter}: ${code}<br>`;
        }
        output.innerHTML += `Закодированное сообщение: ${encoded_message}<br>`;
        if (index === 7) {
            output.innerHTML += "Сколько БУКВ в сообщении, если присутствуют только буквы из таблицы, которые не повторяются?<br>";
            answ = 'Введите количество букв: ';
        } else {
            output.innerHTML += "Какое сообщение закодировано, если присутствуют только буквы из таблицы, которые не повторяются?<br>";
            answ = 'Введите расшифрованное сообщение: ';
        }
    }

    answerInput.setAttribute("data-correct-answer", word);
    answerInput.setAttribute("data-expected-input", index === 7 ? "length" : "message");
}

document.getElementById('startBtn').addEventListener('click', main);


document.getElementById('submitBtn').addEventListener('click', function() {
    console.log("Кнопка отправки нажата"); // Проверка привязки обработчика

    let outputans = document.getElementById('outputans');
    let answerInput = document.getElementById('answerInput');
    let answer = answerInput.value.trim().toUpperCase();
    let correctAnswer = answerInput.getAttribute("data-correct-answer").toUpperCase();
    let expectedInput = answerInput.getAttribute("data-expected-input");

    // Убедимся, что условие правильно срабатывает
    if ((expectedInput === "length" && parseInt(answer) === correctAnswer.length) || 
        (expectedInput === "message" && answer === correctAnswer)) {
        
        console.log("Ответ правильный, отправляем запрос на обновление прогресса"); // Проверка условия

        outputans.innerHTML = "<br>Правильно!";
        
        // Отправляем запрос для обновления прогресса для задания 2
        fetch('/user/progress/informatics', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ taskId: "2", increment: 1 })
        })

        .then(response => {
            if (response.ok) {
                console.log('Прогресс для задания 2 обновлен на клиенте');
                return response.json();
            } else {
                throw new Error('Ошибка при обновлении прогресса');
            }
        })
        .then(data => console.log(data))
        .catch(error => console.error(error));
    } else {
        console.log("Ответ неверный, прогресс не обновляется"); // Проверка неверного ответа
        outputans.innerHTML = `<br>Неправильно.`;
    }
});



    

document.getElementById('show_answer').addEventListener('click', function() {
    let answer = document.getElementById('answer');
    let answerInput = document.getElementById('answerInput');
    let correctAnswer = answerInput.getAttribute("data-correct-answer").toUpperCase();
    let expectedInput = answerInput.getAttribute("data-expected-input");
    if (expectedInput === "length") {
        answer.innerHTML = `<br>Правильный ответ: ${correctAnswer.length}`;
    } else {
        answer.innerHTML = `<br>Правильный ответ: ${correctAnswer}`;
    }
});