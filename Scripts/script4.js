const paths = ["A", "B", "C", "D", "E"];
        let matrix = [];
        let startPoint, endPoint;
        let correctDistance;
        let solutionSteps = [];

	document.getElementById('generate_variant').addEventListener('click', generateTask_4ex);
	document.getElementById('save_checking').addEventListener('click', checkAnswer_4ex);

        function generateTask_4ex() {
            matrix = Array.from({ length: 5 }, () => Array(5).fill("-")); // Создание матрицы 5x5

            // Генерация матрицы с дорогами
            for (let i = 0; i < 5; i++) {
                for (let j = i + 1; j < 5; j++) {
                    let value = Math.random() > 0.3 ? Math.floor(Math.random() * 9) + 1 : "-"; // 70% вероятность прямой дороги
                    matrix[i][j] = value;
                    matrix[j][i] = value; // Симметричность
                }
            }

            ensureConnectivity(); // Убедитесь, что матрица связна
            fillTable(matrix); // Обновите таблицу
            generateQuestion(); // Сгенерируйте новый вопрос
        }

        function ensureConnectivity() {
            const n = matrix.length;
            const visited = Array(n).fill(false);
            const queue = [0];
            visited[0] = true;

            while (queue.length > 0) {
                const node = queue.shift();
                for (let i = 0; i < n; i++) {
                    if (matrix[node][i] !== "-" && !visited[i]) {
                        visited[i] = true;
                        queue.push(i);
                    }
                }
            }

            if (visited.includes(false)) {
                for (let i = 0; i < n; i++) {
                    for (let j = i + 1; j < n; j++) {
                        if (matrix[i][j] === "-") {
                            const value = Math.floor(Math.random() * 9) + 1;
                            matrix[i][j] = value;
                            matrix[j][i] = value;
                        }
                    }
                }
            }
        }

        function fillTable(matrix) {
            let table = document.getElementById('matrix_4ex');
            for (let i = 1; i <= 5; i++) {
                for (let j = 1; j <= 5; j++) {
                    let value = matrix[i-1][j-1];
                    table.rows[i].cells[j].textContent = value === "-" ? "" : value;
                }
            }
        }

        function dijkstra(graph, start, end) {
            const n = graph.length;
            const dist = Array(n).fill(Infinity);
            const visited = Array(n).fill(false);
            dist[start] = 0;

            solutionSteps = [`Старт из вершины ${paths[start]}:`];

            for (let i = 0; i < n - 1; i++) {
                let u = minDistance(dist, visited);
                visited[u] = true;
                solutionSteps.push(`Посещаем вершину ${paths[u]}, расстояние: ${dist[u]}`);

                for (let v = 0; v < n; v++) {
                    if (
                        !visited[v] &&
                        graph[u][v] !== "-" &&
                        dist[u] + graph[u][v] < dist[v]
                    ) {
                        dist[v] = dist[u] + graph[u][v];
                        solutionSteps.push(`Обновляем расстояние до вершины ${paths[v]}: ${dist[v]}`);
                    }
                }
            }

            solutionSteps.push(`Минимальное расстояние до вершины ${paths[end]}: ${dist[end]}`);
            return dist[end];
        }

        function minDistance(dist, visited) {
            let min = Infinity;
            let minIndex = -1;

            for (let v = 0; v < dist.length; v++) {
                if (!visited[v] && dist[v] < min) {
                    min = dist[v];
                    minIndex = v;
                }
            }

            return minIndex;
        }

        function generateQuestion() {
            let startIndex, endIndex;
            do {
                startPoint = paths[Math.floor(Math.random() * paths.length)];
                endPoint = paths[Math.floor(Math.random() * paths.length)];
                startIndex = paths.indexOf(startPoint);
                endIndex = paths.indexOf(endPoint);
            } while (startIndex >= endIndex);

            correctDistance = dijkstra(matrix, startIndex, endIndex);

            document.getElementById('question_4ex').textContent = `Какое кратчайшее расстояние между ${startPoint} и ${endPoint}?`;
            document.getElementById('result_4ex').textContent = "";
            document.getElementById('solution_4ex').textContent = "";
            document.getElementById('userAnswer_4ex').value = "";
        }

        function checkAnswer_4ex() {
            const userAnswer = parseInt(document.getElementById('userAnswer_4ex').value, 10);
            if (userAnswer === correctDistance) {
                document.getElementById('result_4ex').textContent = "Правильно!";

                // Отправляем запрос на сервер для обновления прогресса задания 4
                fetch('/user/progress/informatics/4', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': localStorage.getItem('token')
                    }
                })
                .then(response => {
                    if (response.ok) {
                        console.log('Прогресс для задания 4 обновлен');
                        return response.json();
                    } else {
                        throw new Error('Ошибка при обновлении прогресса');
                    }
                })
                .then(data => console.log(data))
                .catch(error => console.error('Ошибка:', error));
                
            } else {
                document.getElementById('result_4ex').textContent = `Неправильно. Правильный ответ: ${correctDistance}`;
            }
        }


        function showAnswer_4ex() {
            document.getElementById('result_4ex').textContent = `Правильный ответ: ${correctDistance}`;
        }

        function showSolution_4ex() {
            document.getElementById('solution_4ex').textContent = solutionSteps.join('\n');
        }

