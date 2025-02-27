
document.getElementById('generate_variant').addEventListener('click', generateTask_6ex);
document.getElementById('save_checking').addEventListener('click', checkAnswer_6ex);

let correctAnswerCount; // Store the correct answer count
        let currentQuestionType; // To keep track of the type of question asked

        function randomIntFromInterval(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        function generateCondition() {
            const conditions = ['<', '>', '==', '<=', '>='];
            return conditions[Math.floor(Math.random() * conditions.length)];
        }

        function generateOperator() {
            return Math.random() < 0.5 ? 'or' : 'and';
        }

        function generateRandomPairs(numPairs) {
            let pairs = [];
            for (let i = 0; i < numPairs; i++) {
                pairs.push([randomIntFromInterval(-10, 10), randomIntFromInterval(-10, 10)]);
            }
            return pairs;
        }

        function evaluateCondition(s, t, sCond, sValue, tCond, tValue, operator) {
            let sResult = false;
            let tResult = false;

            switch (sCond) {
                case '<':
                    sResult = s < sValue;
                    break;
                case '>':
                    sResult = s > sValue;
                    break;
                case '==':
                    sResult = s == sValue;
                    break;
                case '<=':
                    sResult = s <= sValue;
                    break;
                case '>=':
                    sResult = s >= sValue;
                    break;
            }

            switch (tCond) {
                case '<':
                    tResult = t < tValue;
                    break;
                case '>':
                    tResult = t > tValue;
                    break;
                case '==':
                    tResult = t == tValue;
                    break;
                case '<=':
                    tResult = t <= tValue;
                    break;
                case '>=':
                    tResult = t >= tValue;
                    break;
            }

            if (operator === 'or') {
                return sResult || tResult ? "YES" : "NO";
            } else if (operator === 'and') {
                return sResult && tResult ? "YES" : "NO";
            }
        }

        function generateTask_6ex() {
            const sCond = generateCondition();
            const tCond = generateCondition();
            const sValue = randomIntFromInterval(1, 10);
            const tValue = randomIntFromInterval(1, 10);
            const operator = generateOperator();
            const pairs = generateRandomPairs(9);

            // Randomly choose whether to count "YES" or "NO" in the question
            currentQuestionType = Math.random() < 0.5 ? 'NO' : 'YES';

            let resultCount = {
                YES: 0,
                NO: 0
            };

            // Generate code blocks
            document.getElementById("pythonCode_6ex").innerText = 
`\
s = int(input())
t = int(input())
if s ${sCond} ${sValue} ${operator} t ${tCond} ${tValue}:
    print("YES")
else:
    print("NO")
`;

            document.getElementById("basicCode_6ex").innerText = 
`\
INPUT s
INPUT t
IF s ${sCond} ${sValue} ${operator} t ${tCond} ${tValue} THEN
    PRINT "YES"
ELSE
    PRINT "NO"
END IF
`;

            document.getElementById("pascalCode_6ex").innerText = 
`\
var
  s, t: integer;
begin
  readln(s);
  readln(t);
  if (s ${sCond} ${sValue} ${operator} t ${tCond} ${tValue}) then
    writeln('YES')
  else
    writeln('NO');
end.
`;

            document.getElementById("algorithmicCode_6ex").innerText = 
`\
АЛГОРИТМ
  ВВОД s, t
  ЕСЛИ s ${sCond} ${sValue} ${operator} t ${tCond} ${tValue} ТО
    ВЫВОД "YES"
  ИНАЧЕ
    ВЫВОД "NO"
КОНЕЦ
`;

            document.getElementById("cppCode_6ex").innerText = 
`\
#include <iostream>
using namespace std;

int main() {
    int s, t;
    cin >> s >> t;
    if (s ${sCond} ${sValue} ${operator} t ${tCond} ${tValue})
        cout << "YES" << endl;
    else
        cout << "NO" << endl;
    return 0;
}
`;

            // Generate task description and solution
            let taskDescription = "Было проведено 9 запусков программы, при которых в качестве значений переменных s и t вводились следующие пары чисел: ";
            pairs.forEach((pair, index) => {
                const result = evaluateCondition(pair[0], pair[1], sCond, sValue, tCond, tValue, operator);
                if (result === "NO") {
                    resultCount.NO++;
                } else {
                    resultCount.YES++;
                }
                taskDescription += `(${pair[0]}, ${pair[1]})`;
                if (index < pairs.length - 1) {
                    taskDescription += "; ";
                }
            });
            
            // Adjust the answer based on the randomly selected question
            const question = currentQuestionType === 'NO'
                ? `Сколько было запусков, при которых программа напечатала «NO»?`
                : `С

колько было запусков, при которых программа напечатала «YES»?`;

            correctAnswerCount = currentQuestionType === 'NO' ? resultCount.NO : resultCount.YES;
            taskDescription += `. <br>${question}`;

            document.getElementById("taskDescription_6ex").innerHTML = taskDescription;
            document.getElementById("answer_6ex").innerText = `Ответ: ${correctAnswerCount}`;
            document.getElementById("solution_6ex").innerHTML = `<b>Решение:</b><br>Программа напечатает «${currentQuestionType}», если ${currentQuestionType === 'YES' ? 'хотя бы одно' : 'ни одно'} из условий выполняется. Было ${resultCount.NO} запусков(ов), при которых программа напечатала «NO», и ${resultCount.YES} запусков(ов), при которых программа напечатала «YES».`;

            document.getElementById("answer_6ex").style.display = "none";
            document.getElementById("solution_6ex").style.display = "none";
            document.getElementById("userAnswer_6ex").value = "";
        }

        function showAnswer_6ex() {
            document.getElementById("answer_6ex").style.display = "block";
        }

        function showSolution_6ex() {
            document.getElementById("solution_6ex").style.display = "block";
        }

        function checkAnswer_6ex() {
            const userAnswer = parseInt(document.getElementById("userAnswer_6ex").value);
            if (userAnswer === correctAnswerCount) {
		document.getElementById("answer_6ex").innerText = "Правильно!";
		document.getElementById("answer_6ex").style.display = "block";
            } else {
		document.getElementById("answer_6ex").innerText = `Неправильно, Ответ: ${correctAnswerCount}`;
		document.getElementById("answer_6ex").style.display = "block";
            }
        }

