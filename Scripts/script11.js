	document.getElementById('generate_variant').addEventListener('click', generateTask_11ex);
	document.getElementById('save_checking').addEventListener('click', checkAnswer_11ex);
       const authorsWithWorks = {
            "Толстой": [
                { 
                    work: "Анна Каренина", 
                    file: "Anna Karenina", 
                    questions: [
                        ["Кем работал брат Анны Карениной?", "Как звали брата Анны?"],
                        ["Как зовут возлюбленного Анны Карениной?", "Кто был любовником Анны?"],
                        ["Как звали мужа Анны Карениной?", "Как зовут супруга Анны?"],
                        ["Где происходят основные события романа?", "Какой город описан в начале романа?"],
                        ["Какой трагический поступок совершила Анна в финале?", "Чем заканчивается история Анны?"]
                    ],
                    answers: ["Стив Облонский", "Вронский", "Каренин", "Санкт-Петербург", "Самоубийство"]
                },
                { 
                    work: "Война и мир", 
                    file: "War and Peace", 
                    questions: [
                        ["Как зовут жену Пьера Безухова?", "Кто была первой женой Пьера?"],
                        ["В какой битве участвовал князь Андрей Болконский?", "Какая битва занимает важное место в романе?"],
                        ["Кем был Наполеон в романе?", "Как описан Наполеон в произведении?"],
                        ["Как зовут друга Андрея Болконского?", "Кто был лучшим другом Болконского?"],
                        ["Как зовут сестру Пьера Безухова?", "Кто родственница Пьера?"]
                    ],
                    answers: ["Элен", "Бородинская битва", "Император Франции", "Пьер Безухов", "Вера"]
                }
            ],
            "Достоевский": [
                { 
                    work: "Преступление и наказание", 
                    file: "Crime and Punishment", 
                    questions: [
                        ["Как зовут сестру Раскольникова?", "Как зовут Дуняшу в романе?"],
                        ["Кто сосед Раскольникова по квартире?", "Как зовут соседа Раскольникова?"],
                        ["Что нашел Раскольников в доме старухи-процентщицы?", "Какую ценность забрал Раскольников?"],
                        ["Как зовут возлюбленную Раскольникова?", "Кто помогал Раскольникову после преступления?"],
                        ["Что заставило Раскольникова признаться в преступлении?", "Какое событие привело к его признанию?"]
                    ],
                    answers: ["Дуня", "Разумихин", "Деньги", "Соня", "Раскаяние"]
                },
                { 
                    work: "Идиот", 
                    file: "The Idiot", 
                    questions: [
                        ["Как зовут главного героя романа 'Идиот'?", "Кто князь Мышкин?"],
                        ["Как зовут возлюбленную князя Мышкина?", "Кто Настасья Филипповна?"],
                        ["Какова основная тема романа?", "Что символизирует князь Мышкин в романе?"],
                        ["Как Мышкин относится к деньгам?", "Как князь распоряжается своим наследством?"],
                        ["Чем заканчивается роман?", "Какая судьба постигла Настасью?"]
                    ],
                    answers: ["Князь Мышкин", "Настасья Филипповна", "Столкновение добра и зла", "Он раздает деньги", "Ее убивают"]
                }
            ],
            "Чехов": [
                { 
                    work: "Чайка", 
                    file: "The Seagull", 
                    questions: [
                        ["Как зовут писателя, который появляется в пьесе?", "Кто Тригорин?"],
                        ["Что символизирует чайка в пьесе?", "Почему пьеса названа 'Чайка'?"],
                        ["Где разворачиваются события пьесы?", "В каком месте происходят основные действия?"],
                        ["Какова основная тема пьесы?", "О чем размышляют герои пьесы?"],
                        ["Как заканчивается судьба главного героя Треплева?", "Что происходит с Треплевым в конце?"]
                    ],
                    answers: ["Тригорин", "Символ неудавшихся мечтаний", "В загородной усадьбе", "Творческий кризис", "Он совершает самоубийство"]
                },
                { 
                    work: "Дама с собачкой", 
                    file: "Lady with the Dog", 
                    questions: [
                        ["Как зовут главную героиню 'Дамы с собачкой'?", "Как зовут женщину с собачкой?"],
                        ["Где встречаются главные герои?", "Как называется место встречи Гурова и Анны?"],
                        ["Как Гуров относился к своим любовным отношениям?", "Какие чувства у Гурова к Анне в начале?"],
                        ["Что символизирует собачка в рассказе?", "Какую роль играет собачка в рассказе?"],
                        ["Как заканчиваются отношения Гурова и Анны?", "Что происходит с героями в конце рассказа?"]
                    ],
                    answers: ["Анна Сергеевна", "Ялта", "Безразличие", "Символ случайных встреч", "Они остаются вместе, но без перспектив"]
                }
            ],
            "Пушкин": [
                {
                    work: "Евгений Онегин",
                    file: "Eugene Onegin",
                    questions: [
                        ["Кто является автором письма Онегину?", "Кто пишет Онегину?"],
                        ["Где происходит дуэль между Онегиным и Ленским?", "Каков результат дуэли в романе?"],
                        ["Как зовут друга Онегина?", "Кто был другом Онегина до дуэли?"],
                        ["Какая трагическая ошибка была сделана Онегиным?", "Чем заканчивается его отношение с Татьяной?"],
                        ["Кто такая Татьяна в романе?", "Какова роль Татьяны Лариной в жизни Онегина?"]
                    ],
                    answers: ["Татьяна Ларина", "В деревне", "Ленский", "Он отвергает Татьяну", "Она его судьба"]
                },
                {
                    work: "Капитанская дочка",
                    file: "The Captain's Daughter",
                    questions: [
                        ["Кто был лидером восстания, описанного в романе?", "Как зовут лидера мятежников?"],
                        ["Как зовут главного героя романа?", "Кто Петр Гринев?"],
                        ["Какую роль играет Швабрин в романе?", "Кем был Швабрин в жизни Петра?"],
                        ["Кто была возлюбленной Петра Гринева?", "Как зовут девушку, которую любит Гринев?"],
                        ["Каковы основные темы романа?", "О чем повествует 'Капитанская дочка'?"]
                    ],
                    answers: ["Пугачев", "Петр Гринев", "Предатель", "Маша Миронова", "Честь, любовь, верность"]
                }
            ],
            "Тургенев": [
                {
                    work: "Отцы и дети",
                    file: "Fathers and Sons",
                    questions: [
                        ["Как зовут главного героя романа?", "Кто Базаров?"],
                        ["Кто является другом Базарова?", "Как зовут товарища главного героя?"],
                        ["Какую идею олицетворяет Базаров?", "Какую философию поддерживает главный герой?"],
                        ["Как заканчивается жизнь Базарова?", "Что произошло с Базаровым в конце романа?"],
                        ["Какие разногласия существуют между 'отцами' и 'детьми'?", "В чем смысл конфликта между поколениями?"]
                    ],
                    answers: ["Евгений Базаров", "Аркадий", "Нигилизм", "Он умирает от тифа", "Идеологический конфликт"]
                },
                {
                    work: "Ася",
                    file: "Asya",
                    questions: [
                        ["Как зовут главную героиню?", "Кто Ася?"],
                        ["Где происходит действие романа?", "В каком городе разворачиваются события?"],
                        ["Какова основная тема романа?", "О чем размышляет автор в 'Асе'?"],
                        ["Как складываются отношения героев?", "Что происходит с героиней в финале?"],
                        ["Какие чувства испытывает герой к Асе?", "Как изменяются его чувства к ней?"]
                    ],
                    answers: ["Ася", "Кёльн", "Любовь и упущенные возможности", "Герои не остаются вместе", "Любовь и сожаление"]
                }
            ],
                "Лермонтов": [
                {
                    work: "Герой нашего времени",
                    file: "A Hero of Our Time",
                    questions: [
                        ["Как зовут главного героя романа?", "Кто является главным героем в 'Герое нашего времени'?"],
                        ["В каком месте происходит действие первой части романа?", "Где разворачиваются события?"],
                        ["Как зовут возлюбленную Печорина?", "Кто была возлюбленной Печорина?"],
                        ["Какое событие привело к дуэли Печорина?", "Какова причина дуэли между Печориным и Грушницким?"],
                        ["Чем заканчивается судьба главного героя?", "Как заканчивается жизнь Печорина?"]
                    ],
                    answers: ["Григорий Печорин", "Кавказ", "Вера", "Ревность", "Он умирает"]
                },
                {
                    work: "Мцыри",
                    file: "Mtsyri",
                    questions: [
                        ["Какова основная тема поэмы 'Мцыри'?", "О чем повествует поэма?"],
                        ["Что символизирует образ Мцыри?", "Какое значение имеет образ героя?"],
                        ["Где происходят основные события поэмы?", "В каком месте разворачивается действие?"],
                        ["Какова главная цель жизни Мцыри?", "К чему стремится главный герой?"],
                        ["Чем заканчивается судьба Мцыри?", "Что происходит с главным героем в конце поэмы?"]
                    ],
                    answers: ["Свобода", "Борьба за свободу", "Монастырь", "Вернуться на родину", "Он умирает в борьбе за свободу"]
                }
            ],
            "Гоголь": [
                {
                    work: "Мертвые души",
                    file: "Dead Souls",
                    questions: [
                        ["Как зовут главного героя 'Мертвых душ'?", "Кто является главным героем романа?"],
                        ["Какую аферу планирует Чичиков?", "Каков план Чичикова?"],
                        ["Каковы основные темы романа?", "Какие проблемы освещает автор в 'Мертвых душах'?"],
                        ["Где происходит основное действие романа?", "В каком месте разворачиваются события?"],
                        ["Как заканчиваются события романа?", "Чем завершается история Чичикова?"]
                    ],
                    answers: ["Павел Чичиков", "Скупка мертвых душ", "Коррупция, жадность", "В провинциальном городе", "Чичиков разоблачен"]
                },
                {
                    work: "Ревизор",
                    file: "The Government Inspector",
                    questions: [
                        ["Как зовут главного героя?", "Кто является главным персонажем в 'Ревизоре'?"],
                        ["Какую ошибку совершают чиновники?", "Какова главная интрига пьесы?"],
                        ["Какие пороки общества критикует автор?", "Что осмеивает Гоголь в своей пьесе?"],
                        ["Как заканчивается пьеса?", "Чем завершаются события 'Ревизора'?"],
                        ["Какую роль играет городничий?", "Кто такой городничий в 'Ревизоре'?"]
                    ],
                    answers: ["Хлестаков", "Принимают Хлестакова за ревизора", "Коррупция, лицемерие", "Настоящий ревизор приезжает в город", "Глава города, организатор интриг"]
                }
            ]
        };

        const tasks = [];

        function generateText(content) {
            return content + ". ".repeat(100).trim();
        }

        // Генерация множества вопросов
        for (let i = 0; i < 500000; i++) {
            const randomAuthor = Object.keys(authorsWithWorks)[Math.floor(Math.random() * Object.keys(authorsWithWorks).length)];
            const randomWorkObj = authorsWithWorks[randomAuthor][Math.floor(Math.random() * authorsWithWorks[randomAuthor].length)];
            const randomQuestionSet = randomWorkObj.questions[Math.floor(Math.random() * randomWorkObj.questions.length)];
            const randomQuestion = randomQuestionSet[Math.floor(Math.random() * randomQuestionSet.length)];
            const answerIndex = randomWorkObj.questions.indexOf(randomQuestionSet);
            
            const task = {
                task: `В произведении "${randomWorkObj.work}" автора ${randomAuthor}, ${randomQuestion}.`,
                answer: randomWorkObj.answers[answerIndex],
                solution: `Для ответа ознакомьтесь с архивом произведения "${randomWorkObj.work}" автора ${randomAuthor}.`,
                fileStructure: {
                    [randomAuthor]: {
                        [`${randomWorkObj.file}.txt`]: generateText(`Ответ: ${randomWorkObj.answers[answerIndex]}`)
                    },
                    "Комментарии и пояснения": {
                        [`Справка_${i + 1}.txt`]: generateText("Дополнительный текст для изучения")
                    }
                }
            };
            tasks.push(task);
        }

        let currentTask_11ex = {};

        function generateTask_11ex() {
            currentTask_11ex = tasks[Math.floor(Math.random() * tasks.length)];
            document.getElementById("task_11ex").innerHTML = `${currentTask_11ex.task} <br><a href='#' onclick="downloadArchive(currentTask_11ex.fileStructure)">Скачать архив</a>`;
            document.getElementById("feedback_11ex").textContent = '';
            document.getElementById("userAnswer_11ex").value = '';
            document.getElementById("correct-answer_11ex").classList.add("hidden");
            document.getElementById("solution_11ex").classList.add("hidden");
        }

        function checkAnswer_11ex() {
            const userAnswer = document.getElementById("userAnswer_11ex").value.trim();
            if (userAnswer.toLowerCase() === currentTask_11ex.answer.toLowerCase()) {
                document.getElementById("feedback_11ex").textContent = "Правильно!";
            } else {
                document.getElementById("feedback_11ex").textContent = "Неправильно.";
		document.getElementById("correct-answer_11ex").textContent = `Ответ: ${currentTask_11ex.answer}`;
            	document.getElementById("correct-answer_11ex").classList.remove("hidden");
            }
        }

        function showAnswer_11ex() {
            document.getElementById("correct-answer_11ex").textContent = `Ответ: ${currentTask_11ex.answer}`;
            document.getElementById("correct-answer_11ex").classList.remove("hidden");
        }

        function showSolution_11ex() {
            document.getElementById("solution_11ex").textContent = currentTask_11ex.solution;
            document.getElementById("solution_11ex").classList.remove("hidden");
        }

        function downloadArchive(fileStructure) {
            const zip = new JSZip();
            for (const folderName in fileStructure) {
                const folder = zip.folder(folderName);
                const files = fileStructure[folderName];
                for (const fileName in files) {
                    folder.file(fileName, files[fileName]);
                }
            }

            zip.generateAsync({ type: "blob" }).then(function (content) {
                saveAs(content, "LiteratureArchive.zip");
            });
        }
        
