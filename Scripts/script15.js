document.addEventListener('DOMContentLoaded', () => {
        const maze = document.getElementById('maze_15ex');
        const codeArea = document.getElementById('codeArea_15ex');
        const executeButton = document.getElementById('executeButton_15ex');
        const generateWallsButton = document.getElementById('generate_variant');
        
        const gridSize = 10;
        let robotPosition = { x: 1, y: 1 };
        let grid = [];
        let coord = [];
        let coord_val = [];
        let targetCellsCount = 0;
        let saved = 0;
        let paintedCells = 0;
	
	document.getElementById('save_checking').addEventListener('click', checkTaskCompletion);
        // Инициализация лабиринта
        function createMaze() {
            maze.innerHTML = '';
            grid = [];
            for (let i = 0; i < gridSize; i++) {
                let row = [];
                for (let j = 0; j < gridSize; j++) {
                    const cell = document.createElement('div');
                    cell.classList.add('cell');
                    row.push('empty');
                    if (i === 1 && j === 1) { 
                        cell.classList.add('robot');
                        robotPosition = { x: j, y: i };
                        row[j] = 'robot';
                    }
                    maze.appendChild(cell);
                }
                grid.push(row);
            }
        }
      
        // Функция для генерации случайных блоков стен
    function generateRandomWalls() {
        createMaze();  // Сброс лабиринта перед генерацией стен
        const numBlocks = Math.floor(Math.random() * 2) + 2; // Генерация 1–3 блоков стен

        // Массив для хранения координат
        let coord = [];

        for (let b = 0; b < numBlocks; b++) {
            const isVertical = Math.random() < 0.5;
            let startX, startY;

            // Попытки найти стартовые координаты с учетом зазора
            let validPosition = false;
            let attempts = 0;
            while (!validPosition && attempts < 10) {
                startX = Math.floor(Math.random() * (gridSize - 4)) + 2;  // Центрируем стартовую позицию
                startY = Math.floor(Math.random() * (gridSize - 4)) + 2;  // Центрируем стартовую позицию

                if (isVertical) {
                    validPosition = checkNoAdjacentWalls(startX, startY, 'vertical');
                } else {
                    validPosition = checkNoAdjacentWalls(startX, startY, 'horizontal');
                }
                attempts++;
            }

            if (!validPosition) continue;  // Пропускаем генерацию, если не нашли подходящее место

            const length = Math.floor(Math.random() * 2) + 2; // Длина блока стены от 2 до 3 клеток

            // Определяем координаты длинных сторон
            for (let i = 0; i < length; i++) {
                let x = startX;
                let y = startY;

                if (isVertical) {
                    y += i;
                } else {
                    x += i;
                }

                if (x < gridSize && y < gridSize && grid[y][x] === 'empty') {
                    grid[y][x] = 'wall';
                    const index = y * gridSize + x;
                    maze.children[index].classList.add('wall');
                }
            }

            // Добавляем клетки, прилегающие к длинным сторонам, только на ту сторону, которая дальше от границ
    for (let i = 0; i < length; i++) {
        let x = startX;
        let y = startY;

        if (isVertical) {
            y += i;

            // Определяем, какая сторона дальше от границ — левая или правая
            const distanceLeft = x;  // Расстояние до левого края
            const distanceRight = gridSize - 1 - x;  // Расстояние до правого края

            if (distanceLeft > distanceRight) {
                // Левая сторона дальше — добавляем целевые клетки слева
                if (x > 0 && grid[y][x - 1] !== 'wall') coord.push([y, x - 1]);  // Слева
            } else {
                // Правая сторона дальше — добавляем целевые клетки справа
                if (x < gridSize - 1 && grid[y][x + 1] !== 'wall') coord.push([y, x + 1]);  // Справа
            }

        } else {
            x += i;

            // Определяем, какая сторона дальше от границ — верхняя или нижняя
            const distanceTop = y;  // Расстояние до верхнего края
            const distanceBottom = gridSize - 1 - y;  // Расстояние до нижнего края

            if (distanceTop > distanceBottom) {
                // Верхняя сторона дальше — добавляем целевые клетки сверху
                if (y > 0 && grid[y - 1][x] !== 'wall') coord.push([y - 1, x]);  // Сверху
            } else {
                // Нижняя сторона дальше — добавляем целевые клетки снизу
                if (y < gridSize - 1 && grid[y + 1][x] !== 'wall') coord.push([y + 1, x]);  // Снизу
            }
        }
    }
        }

        // Удаляем дублирующиеся координаты
        coord = coord.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t[0] === value[0] && t[1] === value[1]
            ))
        );

        // Подсветите целевые клетки
        coord_val = coord;
        highlightTargetCells(coord);
      
        targetCellsCount = coord.length;
        saved = targetCellsCount;
        paintedCells = 0;
        console.log(targetCellsCount);
        console.log(coord); // Вывод массива координат в консоль
    }


    function highlightTargetCells(coords) {
        // Очистите существующие целевые клетки
        document.querySelectorAll('.target').forEach(cell => cell.classList.remove('target'));

        // Общий массив для хранения групп соседних клеток
        let groupedCoord = [];

        coords.forEach(coord => {
            let addedToGroup = false;

            // Проверяем текущие группы
            for (let group of groupedCoord) {
                if (canAddToGroup(group, coord)) {
                    group.push(coord);
                    addedToGroup = true;
                    break;
                }
            }

            // Если не было добавлено ни в одну группу, создаем новую
            if (!addedToGroup) {
                groupedCoord.push([coord]);
            }
        });

        console.log('Grouped Coordinates:', groupedCoord);

        // Подсветите клетки
        coords.forEach(([y, x]) => {
            if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
                const index = y * gridSize + x;
                maze.children[index].classList.remove('wall');
                maze.children[index].classList.add('target');
                grid[y][x] = 'target';
            }
        });
    }

    // Функция для проверки, что клетка может быть добавлена в группу
    function canAddToGroup(group, coord) {
        return group.some(cell => areCellsAdjacent(cell, coord));
    }

    // Функция для проверки, что две клетки являются соседними
    function areCellsAdjacent(cell1, cell2) {
        const [y1, x1] = cell1;
        const [y2, x2] = cell2;

        // Клетки считаются соседними, если они находятся по горизонтали или вертикали рядом друг с другом
        return (Math.abs(x1 - x2) === 1 && y1 === y2) || (Math.abs(y1 - y2) === 1 && x1 === x2);
    }


    // Функция для проверки, что рядом с текущей позицией нет стен
    function checkNoAdjacentWalls(x, y, orientation) {
        const distance = 1;  // Минимальное расстояние между стенами (2 клетки)

        for (let i = -distance; i <= distance; i++) {
            if (orientation === 'vertical') {
                const checkY = y + i;
                if (checkY >= 0 && checkY < gridSize) {
                    if (grid[checkY][x] === 'wall' || grid[checkY][x - 1] === 'wall' || grid[checkY][x + 1] === 'wall') {
                        return false;
                    }
                }
            } else if (orientation === 'horizontal') {
                const checkX = x + i;
                if (checkX >= 0 && checkX < gridSize) {
                    if (grid[y][checkX] === 'wall' || grid[y - 1][checkX] === 'wall' || grid[y + 1][checkX] === 'wall') {
                        return false;
                    }
                }
            }
        }
        return true;
    }

        // Сброс лабиринта перед началом выполнения команд
        function resetMaze() {
            robotPosition = { x: 1, y: 1 };
            const cells = document.querySelectorAll('.cell');
            cells.forEach((cell, index) => {
                cell.classList.remove('robot', 'painted');
                const row = Math.floor(index / gridSize);
                const col = index % gridSize;
                if (grid[row][col] !== 'wall') {
                    grid[row][col] = 'empty';
                }
            });
            const startIndex = robotPosition.y * gridSize + robotPosition.x;
            maze.children[startIndex].classList.add('robot');
            grid[robotPosition.y][robotPosition.x] = 'robot';
        }

        // Обновление позиции робота
        function updateRobotPosition() {
            const cells = document.querySelectorAll('.cell');
            cells.forEach(cell => cell.classList.remove('robot'));
            const index = robotPosition.y * gridSize + robotPosition.x;
            cells[index].classList.add('robot');
            grid[robotPosition.y][robotPosition.x] = 'robot';
        }

        // Проверка условий
    function checkCondition(condition) {
        // Удаляем все скобки
        condition = condition.replace(/[()]/g, '').trim();
      
      
        if (condition.includes(' или ')) {
            // Разделяем по логическому ИЛИ
            const parts = condition.split(' или ');
            return parts.some(part => checkCondition(part));
        } else if (condition.includes(' и ')) {
            // Разделяем по логическому И
            const parts = condition.split(' и ');
            return parts.every(part => checkCondition(part));
        } else if (condition.startsWith('не ')) {
            // Проверяем условие с НЕ
            const innerCondition = condition.replace('не ', '').trim();
            const result = checkCondition(innerCondition);
            if (result === null) {
                console.error(`Неизвестное условие: ${innerCondition}`);
                return false;
            }
            return !result;
        } else {
            // Обычная проверка направления
            if (condition === 'сверху свободно') {
                return robotPosition.y > 0 && grid[robotPosition.y - 1][robotPosition.x] !== 'wall';
            } else if (condition === 'снизу свободно') {
                return robotPosition.y < gridSize - 1 && grid[robotPosition.y + 1][robotPosition.x] !== 'wall';
            } else if (condition === 'слева свободно') {
                return robotPosition.x > 0 && grid[robotPosition.y][robotPosition.x - 1] !== 'wall';
            } else if (condition === 'справа свободно') {
                return robotPosition.x < gridSize - 1 && grid[robotPosition.y][robotPosition.x + 1] !== 'wall';
            } else {
                // Возвращаем null для неизвестных условий
                console.error(`Неизвестное условие: ${condition}`);
                return null;
            }
        }
    }


        function checkTaskCompletion() {
        const targetCells = document.querySelectorAll('.target').length;
        const paintedTargets = document.querySelectorAll('.painted').length;

        // Если все целевые клетки закрашены
        if (targetCells === 0 && paintedTargets === saved) {
            document.getElementById('check_15ex').textContent = "Задание выполнено!";
        } else {
            document.getElementById('check_15ex').textContent = "Не все целевые клетки закрашены!";
          }
        }
      
        // Выполнение команд с задержкой
        async function executeCode() {
        resetMaze();
        highlightTargetCells(coord_val);
        targetCellsCount = saved;
        paintedCells = 0;
        document.getElementById('check_15ex').textContent = "Не все целевые клетки закрашены!";
        const codeLines = codeArea.value.split('\n');
        
        for (let i = 0; i < codeLines.length; i++) {
            let command = codeLines[i].trim().toLowerCase();

            if (command === 'вправо') {
                if (checkCondition('справа свободно')) {
                    robotPosition.x += 1;
                } else {
                    alert("Робот разрушился, попытка пройти через стену!");
                    return;
                }
            } else if (command === 'влево') {
                if (checkCondition('слева свободно')) {
                    robotPosition.x -= 1;
                } else {
                    alert("Робот разрушился, попытка пройти через стену!");
                    return;
                }
            } else if (command === 'вверх') {
                if (checkCondition('сверху свободно')) {
                    robotPosition.y -= 1;
                } else {
                    alert("Робот разрушился, попытка пройти через стену!");
                    return;
                }
            } else if (command === 'вниз') {
                if (checkCondition('снизу свободно')) {
                    robotPosition.y += 1;
                } else {
                    alert("Робот разрушился, попытка пройти через стену!");
                    return;
                }
            } else if (command === 'закрасить') {
                const index = robotPosition.y * gridSize + robotPosition.x;

                if ( maze.children[index].classList.contains('target')) {
                     maze.children[index].classList.remove('target');
                     maze.children[index].classList.add('painted');
                     targetCellsCount--;  // Уменьшаем количество оставшихся целевых клеток
                } else {
                   maze.children[index].classList.add('painted');
                   paintedCells++;
                } 
                grid[robotPosition.y][robotPosition.x] = 'painted';
              
            } else if (command.startsWith('если')) {
                let condition = command.replace('если ', '').replace(' то', '').trim();
                let innerCommands = [];

                i++;
                while (codeLines[i].trim().toLowerCase() !== 'все') {
                    innerCommands.push(codeLines[i].trim().toLowerCase());
                    i++;
                }

                if (checkCondition(condition)) {
                    await executeCommands(innerCommands);
                }
            } else if (command.startsWith('нц пока')) {
                let condition = command.replace('нц пока ', '').trim();
                let innerCommands = [];

                i++;
                while (codeLines[i].trim().toLowerCase() !== 'кц') {
                    innerCommands.push(codeLines[i].trim().toLowerCase());
                    i++;
                }

                // Проверка условия цикла и выполнение вложенных команд
                while (checkCondition(condition)) {
                    for (let j = 0; j < innerCommands.length; j++) {
                        let innerCommand = innerCommands[j].toLowerCase();

                        if (innerCommand.startsWith('если')) {
                            let innerCondition = innerCommand.replace('если ', '').replace(' то', '').trim();
                            let nestedCommands = [];

                            j++;
                            while (innerCommands[j].toLowerCase() !== 'все') {
                                nestedCommands.push(innerCommands[j]);
                                j++;
                            }

                            if (checkCondition(innerCondition)) {
                                await executeCommands(nestedCommands);
                            }
                        } else {
                            // Выполняем команды внутри цикла
                            await executeCommands([innerCommand]);
                        }
                    }
                }
            }

            updateRobotPosition();
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        checkTaskCompletion();
    }


        async function executeCommands(commands) {
            for (let command of commands) {
                if (command === 'вправо') {
                    if (checkCondition('справа свободно')) {
                        robotPosition.x += 1;
                    }
                } else if (command === 'влево') {
                    if (checkCondition('слева свободно')) {
                        robotPosition.x -= 1;
                    }
                } else if (command === 'вверх') {
                    if (checkCondition('сверху свободно')) {
                        robotPosition.y -= 1;
                    }
                } else if (command === 'вниз') {
                    if (checkCondition('снизу свободно')) {
                        robotPosition.y += 1;
                    }
                } else if (command === 'закрасить') {
                    const index = robotPosition.y * gridSize + robotPosition.x;
                    
                    if ( maze.children[index].classList.contains('target')) {
                         maze.children[index].classList.remove('target');
                         maze.children[index].classList.add('painted');
                        targetCellsCount--;  // Уменьшаем количество оставшихся целевых клеток
                    } else {
                       maze.children[index].classList.add('painted');
                       paintedCells++;
                    }                
                   
                  
                    grid[robotPosition.y][robotPosition.x] = 'painted';
                }

                updateRobotPosition();
              
                await new Promise(resolve => setTimeout(resolve, 500));
            }
            checkTaskCompletion();
        }
      
        

        executeButton.addEventListener('click', executeCode);
        generateWallsButton.addEventListener('click', generateRandomWalls);
      

        createMaze();
    });