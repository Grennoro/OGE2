
document.getElementById('generate_variant').addEventListener('click', generateTask_12ex);
document.getElementById('save_checking').addEventListener('click', checkAnswer_12ex);

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function generateRandomTask() {
        const directories = ["Есенин", "Лермонтов", "Проза", "Поэзия", "DEMO-12", "Task12"];
        const extensions = [".htm", ".rtf", ".pdf", ".docx", ".txt"];
        const sizeConditions = ["более", "не более"];
        const randomDirectory = directories[getRandomInt(0, directories.length - 1)];
        const randomExtension = extensions[getRandomInt(0, extensions.length - 1)];
        const randomSizeCondition = sizeConditions[getRandomInt(0, sizeConditions.length - 1)];
        const randomSize = getRandomInt(1, 10); // Максимум 10 Кб
        
        const taskVariants = [
            `Сколько файлов с расширением ${randomExtension} ${randomSizeCondition} ${randomSize} Кб содержится в подкаталогах каталога ${randomDirectory}? В ответе укажите только число.`,
            `Укажите количество файлов с расширением ${randomExtension} размером ${randomSizeCondition} ${randomSize} Кб в каталоге ${randomDirectory}.`,
            `Определите, сколько файлов с расширением ${randomExtension} и размером ${randomSizeCondition} ${randomSize} Кб находится в папке ${randomDirectory}.`
        ];
        
        const question = taskVariants[getRandomInt(0, taskVariants.length - 1)];
        
        return { question, randomDirectory, randomExtension, randomSizeCondition, randomSize };
    }

    let currentTask_12ex;

    function generateTask_12ex() {
        currentTask_12ex = generateRandomTask();
        document.getElementById("task_12ex").innerText = currentTask_12ex.question;
        document.getElementById("userAnswer_12ex").value = '';
        document.getElementById("result_12ex").innerText = '';
        document.getElementById("correctAnswer_12ex").classList.add("hidden");
        document.getElementById("solution_12ex").classList.add("hidden");

        const zip = new JSZip();
        const mainFolder = zip.folder("file_catalog");

        const subfolders = ["Есенин", "Лермонтов", "Проза", "Поэзия", "Task12"];
        const extensions = [".htm", ".rtf", ".pdf", ".docx", ".txt", ".html", ".js", ".py", ".odt"];
        let answerCount = 0;
        let solutionDetails = [];

        function createFileWithExactSize(sizeKb) {
            const content = new Array(sizeKb * 1024).fill(' ').join(''); // Контент с точным размером
            return content;
        }

        subfolders.forEach(folderName => {
            const folder = mainFolder.folder(folderName);
            for (let i = 1; i <= getRandomInt(20, 30); i++) {
                const randomExtension = extensions[getRandomInt(0, extensions.length - 1)];
                const fileSizeKb = getRandomInt(1, 10); 
                const fileName = `file${i}${randomExtension}`;
                const content = createFileWithExactSize(fileSizeKb);

                folder.file(fileName, content);

                // Проверка соответствия размера и условий задания
                if (folderName === currentTask_12ex.randomDirectory && randomExtension === currentTask_12ex.randomExtension) {
                    if ((currentTask_12ex.randomSizeCondition === "более" && fileSizeKb > currentTask_12ex.randomSize) ||
                        (currentTask_12ex.randomSizeCondition === "не более" && fileSizeKb <= currentTask_12ex.randomSize)) {
                        answerCount++;
                        solutionDetails.push(`Файл "${fileName}" размером ${fileSizeKb} Кб.`);
                    }
                }
            }
        });

        // Если файлов, соответствующих условиям, недостаточно, добавляем их вручную
        while (answerCount < 1) {
            const matchingFileSizeKb = currentTask_12ex.randomSizeCondition === "более" ? currentTask_12ex.randomSize + 1 : currentTask_12ex.randomSize - 1;
            const extraFileName = `extraFileMatch${currentTask_12ex.randomExtension}`;
            const extraContent = createFileWithExactSize(matchingFileSizeKb);
            mainFolder.folder(currentTask_12ex.randomDirectory).file(extraFileName, extraContent);
            answerCount++;
            solutionDetails.push(`Файл "${extraFileName}" размером ${matchingFileSizeKb} Кб`);
        }

        currentTask_12ex.answer = answerCount;
        currentTask_12ex.solution = `В каталоге "${currentTask_12ex.randomDirectory}" найдены файлы, соответствующие условиям:\n` + solutionDetails.join("\n");

        zip.generateAsync({ type: "blob" })
            .then(function(content) {
                const downloadLink = document.getElementById("downloadLink_12ex");
                downloadLink.href = URL.createObjectURL(content);
            });
    }

    function checkAnswer_12ex() {
        const userAnswer = parseInt(document.getElementById("userAnswer_12ex").value, 10);
        if (userAnswer === currentTask_12ex.answer) {
            document.getElementById("result_12ex").innerText = "Правильно!";
        } else {
            document.getElementById("result_12ex").innerText = "Неверно";
 	    document.getElementById("answer_12ex").innerText = currentTask_12ex.answer;
	    document.getElementById("correctAnswer_12ex").classList.remove("hidden");            
        }
    }

    function showAnswer_12ex() {
        document.getElementById("correctAnswer_12ex").classList.remove("hidden");
        document.getElementById("answer_12ex").innerText = currentTask_12ex.answer;
    }

    function showSolution_12ex() {
        document.getElementById("solution_12ex").classList.remove("hidden");
        document.getElementById("solutionText_12ex").innerText = currentTask_12ex.solution;
    }

