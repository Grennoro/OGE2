const cities = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'К', 'Л', 'М', 'Н', 'П'];
        let graph = {};
        let currentTask_9ex = {};
	let userAnswer_9ex;
	document.getElementById('generate_variant').addEventListener('click', generateTask_9ex);
	document.getElementById('save_checking').addEventListener('click', showAnswer_9ex);

        function getRandomInt_9ex(max) {
            return Math.floor(Math.random() * max);
        }

        function generateGraph() {
            graph = {};
            cities.forEach(city => graph[city] = []);
            const levels = [
                ['А'],
                ['Б', 'В', 'Г'],
                ['Д', 'Е', 'Ж'],
                ['К', 'Л', 'М', 'Н', 'П']
            ];

            // Генерация случайных соединений для уникальности графа
            for (let i = 0; i < levels.length - 1; i++) {
                levels[i].forEach(fromCity => {
                    const toCities = levels[i + 1];
                    let connections = new Set();
                    const minConnections = 2;
                    const maxConnections = Math.min(4, toCities.length); // до 4 соединений для случайности

                    while (connections.size < minConnections + getRandomInt_9ex(maxConnections - minConnections + 1)) {
                        const toCity = toCities[getRandomInt_9ex(toCities.length)];
                        connections.add(toCity);
                    }

                    connections.forEach(toCity => {
                        if (!graph[fromCity].includes(toCity)) {
                            graph[fromCity].push(toCity);
                        }
                    });
                });
            }
        }

        function drawGraph() {
            const canvas = document.getElementById('graphCanvas_9ex');
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const cityCoordinates = {
                'А': { x: 50, y: 150 },
                'Б': { x: 150, y: 50 },
                'В': { x: 150, y: 150 },
                'Г': { x: 150, y: 250 },
                'Д': { x: 250, y: 50 },
                'Е': { x: 250, y: 150 },
                'Ж': { x: 250, y: 250 },
                'К': { x: 350, y: 30 },
                'Л': { x: 350, y: 110 },
                'М': { x: 350, y: 190 },
                'Н': { x: 350, y: 270 },
                'П': { x: 450, y: 150 },
            };

            cities.forEach(city => {
                ctx.beginPath();
                ctx.arc(cityCoordinates[city].x, cityCoordinates[city].y, 15, 0, 2 * Math.PI);
                ctx.fillStyle = 'white';
                ctx.fill();
                ctx.stroke();
                ctx.font = 'bold 16px Arial';
                ctx.fillStyle = 'black';
                ctx.fillText(city, cityCoordinates[city].x - 8, cityCoordinates[city].y + 6);
            });

            for (let city in graph) {
                graph[city].forEach(neighbor => {
                    drawArrow(ctx, cityCoordinates[city].x, cityCoordinates[city].y, cityCoordinates[neighbor].x, cityCoordinates[neighbor].y);
                });
            }
        }

        function drawArrow(ctx, fromX, fromY, toX, toY) {
            const headlen = 10;
            const angle = Math.atan2(toY - fromY, toX - fromX);
            const offset = 20;
            const adjustedFromX = fromX + offset * Math.cos(angle);
            const adjustedFromY = fromY + offset * Math.sin(angle);
            const adjustedToX = toX - offset * Math.cos(angle);
            const adjustedToY = toY - offset * Math.sin(angle);

            ctx.lineWidth = 2;
            ctx.strokeStyle = 'black';
            ctx.beginPath();
            ctx.moveTo(adjustedFromX, adjustedFromY);
            ctx.lineTo(adjustedToX, adjustedToY);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(adjustedToX, adjustedToY);
            ctx.lineTo(adjustedToX - headlen * Math.cos(angle - Math.PI / 6), adjustedToY - headlen * Math.sin(angle - Math.PI / 6));
            ctx.moveTo(adjustedToX, adjustedToY);
            ctx.lineTo(adjustedToX - headlen * Math.cos(angle + Math.PI / 6), adjustedToY - headlen * Math.sin(angle + Math.PI / 6));
            ctx.stroke();
        }

        function calculatePaths(graph, startCity, endCity, mustPassCity = null) {
            function countPaths(start, end) {
                let paths = {};
                paths[start] = 1;

                cities.forEach(city => {
                    if (!paths[city]) paths[city] = 0;
                    graph[city].forEach(neighbor => {
                        if (!paths[neighbor]) paths[neighbor] = 0;
                        paths[neighbor] += paths[city];
                    });
                });

                return paths[end] || 0;
            }

            if (mustPassCity) {
                const pathsToMustPass = countPaths(startCity, mustPassCity);
                const pathsFromMustPassToEnd = countPaths(mustPassCity, endCity);
                return pathsToMustPass * pathsFromMustPassToEnd;
            } else {
                return countPaths(startCity, endCity);
            }
        }

        function generateTask_9ex() {
            generateGraph();
            drawGraph();

            let startCity = 'А';
            let endCity = 'П';
            let taskType = Math.random() > 0.5 ? 0 : 1;
            let mustPassCity = ['Б', 'В', 'Г', 'Д', 'Е', 'Ж'][getRandomInt_9ex(6)];

            let answer, question_9ex, solution;

            if (taskType === 0) {
                answer = calculatePaths(graph, startCity, endCity, mustPassCity);
                if (answer > 0) {
                    question_9ex = `Сколько существует различных путей из города ${startCity} в город ${endCity}, проходящих через город ${mustPassCity}?`;
                    solution = `Для нахождения пути из ${startCity} в ${endCity} через ${mustPassCity} сначала находим количество путей из ${startCity} в ${mustPassCity}, а затем из ${mustPassCity} в ${endCity}. Ответ: ${answer}.`;
                } else {
                    generateTask_9ex(); // Повторная генерация, если путь невозможен
                    return;
                }
            } else {
		userAnswer_9ex = document.getElementById('user-answer_9ex').value;
                answer = calculatePaths(graph, startCity, endCity);
                question_9ex = `Сколько существует различных путей из города ${startCity} в город ${endCity}?`;
                solution = `Подсчитываем количество возможных маршрутов от ${startCity} до ${endCity}. Ответ: ${answer}.`;
            }

            currentTask_9ex = { question_9ex, answer, solution, userAnswer_9ex};

            document.getElementById('task-container_9ex').textContent = currentTask_9ex.question_9ex;
            document.getElementById('answer-container_9ex').classList.remove("show");
            document.getElementById('solution-container_9ex').classList.remove("show");
            document.getElementById('user-answer_9ex').value = '';
        }

        function showAnswer_9ex() {
	    if (userAnswer_9ex == currentTask_9ex.answer) {
	    	document.getElementById('correct-answer_9ex').textContent = "Правильно!";
		document.getElementById('answer-container_9ex').classList.add("show");
 	    } else {
		document.getElementById('correct-answer_9ex').textContent = `Неправильно. Правильный ответ: ${currentTask_9ex.answer}.`;
            	document.getElementById('answer-container_9ex').classList.add("show");
	    }
            
        }

        function showSolution_9ex() {
            document.getElementById('solution_9ex').textContent = currentTask_9ex.solution;
            document.getElementById('solution-container_9ex').classList.add("show");
        }