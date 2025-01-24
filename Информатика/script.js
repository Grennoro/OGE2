$(document).ready(function() {
    var mas = [];
    var rand = "";
    var encoding = "";
    var bait = 0;
    var extraBytes = 0;
    var wordBytes = 0;
    var deltitBytes = 0;
    var symbols = 0;
  
    var consonants = 'bcdfghjklmnpqrstvwxyz';
    var vowels = 'aeiou';

    var encodings = ['KOI8', 'Unicode16', 'UTF32'];

    function getRandomEncoding() {
        return encodings[Math.floor(Math.random() * encodings.length)];
    }

    function generateRandomWord(length) {
        var word = '';
        var useVowel = Math.random() > 0.5;

        for (var i = 0; i < length; i++) {
            if (useVowel) {
                word += vowels.charAt(Math.floor(Math.random() * vowels.length));
            } else {
                word += consonants.charAt(Math.floor(Math.random() * consonants.length));
            }
            useVowel = !useVowel;
        }

        return word;
    }

    function generateWords() {
        mas = [];
        for (var i = 1; i <= 7; i++) {
            mas.push(generateRandomWord(i));
        }
        encoding = getRandomEncoding();
        updateLabel();
        $('#check').text('');
        $('#solution').hide();
        $('#hint_text').hide();
    }

    function getByteSize(word, encoding) {
        switch (encoding) {
            case 'KOI8':
                extraBytes = 2;
                deltitBytes = 1;
                return word.length + 2;
            case 'Unicode16':
                extraBytes = 4;
                deltitBytes = 2;
                return word.length * 2 + 4;
            case 'UTF32':
                extraBytes = 8;
                deltitBytes = 4;
                return word.length * 4 + 8;
            default:
                return word.length;
        }
    }

    function updateLabel() {
        var new_text = mas.join(", ");
        rand = mas[Math.floor(Math.random() * mas.length)];
        bait = getByteSize(rand, encoding);
        wordBytes = bait - extraBytes;
        symbols = wordBytes / deltitBytes;
        
        $('#label').html(
            `В кодировке ${encoding === 'KOI8' ? "КОИ-8" : encoding === 'Unicode16' ? "Unicode 16-bit" : "UTF-32"} каждый символ кодируется ${encoding === 'KOI8' ? "8 битами" : encoding === 'Unicode16' ? "16 битами" : "32 битами"}. <br>
            Ниже представлен текст (в нем нет лишних пробелов): <br>
            «${new_text}». <br>
            Ученик вычеркнул из списка название одного из объектов. Заодно он вычеркнул ставшие лишними запятые и пробелы — два пробела не должны идти подряд. <br>
            При этом размер нового предложения в данной кодировке оказался на ${bait} байта(ов) меньше, чем размер исходного предложения. <br>
            Напишите в ответе вычеркнутое название объекта.`
        );
    }

    $('#generate_words').click(function() {
        generateWords();
    });

    $('#button').click(function() {
        var a = $('#enter_ans').val();
        if (a === rand) {
            $('#check').text('Правильно');
            
            // Отправка запроса для обновления прогресса на сервер
            $.ajax({
                url: '/user/progress/informatics', // Обновленный URL для универсального обновления прогресса
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                data: JSON.stringify({ taskId: '1', increment: 1 }), // Параметры для обновления задания 1
                success: function(response) {
                    console.log('Прогресс для задания 1 обновлен', response);
                    // Выводим в интерфейсе подтверждение обновления прогресса
                    $('#check').append('<br>Прогресс обновлен!');
                },
                error: function(error) {
                    console.error('Ошибка при обновлении прогресса:', error);
                }
            });
        } else {
            $('#check').text('Неверно');
        }
    });

    $('#show_answer').click(function() {
        $('#check').text('Правильный ответ: ' + rand);
    });

    $('#how_to_solve').click(function() {
        $('#solution').html(
            `Для решения задания необходимо учитывать количество байт, которое занимает каждое слово в разных кодировках. 
            В данном случае, слово удаляется вместе с соответствующей запятой и пробелом, что изменяет общий размер текста на ${bait} байта(ов). 
            Вычисления производятся с учетом кодировки ${encoding === 'KOI8' ? "KOI8" : encoding === 'Unicode16' ? "Unicode16" : "UTF-32"}. 
            ${bait} байта(ов) - 1 пробел и 1 запятая => удалённое слово занимает ${wordBytes} байта(ов). 
            Это количество нужно разделить на вес 1 символа (${deltitBytes} байт(а)) => в слове ${symbols} символов. 
            Сопоставив количество символов, получаем слово ${rand}.`
        ).show();
    });

    $('#hint').click(function() {
        $('#hint_text').html(
            `Подсказка: 1 байт = 8 бит => на 1 символ приходится по ${encoding === 'KOI8' ? "1 байту" : encoding === 'Unicode16' ? "2 байта" : "4 байта"}. <br>
            Вычислите размер удаленного слова, учитывая запятые и пробелы.`
        ).show();
    });

    // Generate words on page load
    generateWords();
});
