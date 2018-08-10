/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    var div = document.createElement('div'),
        docHeight = document.documentElement.clientHeight,
        docWidth = document.documentElement.clientWidth;
        
    const minHeight = 30,
        minWidth = 30;
    
    function getRandomInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    var top = getRandomInRange(0, docHeight - minHeight);
    var left = getRandomInRange(0, docWidth - minWidth);
    
    var height = getRandomInRange(minHeight, docHeight - top);
    var width = getRandomInRange(minWidth, docWidth - left);
    
    var clrR = getRandomInRange(0, 255);
    var clrG = getRandomInRange(0, 255);
    var clrB = getRandomInRange(0, 255);
        
    div.classList.add('draggable-div');
    
    div.style.position = 'absolute';
    div.style.top = top + 'px';
    div.style.left = left + 'px';
    div.style.height = height + 'px';
    div.style.width = width + 'px';
    div.style.backgroundColor = 'rgb(' + [clrR, clrG, clrB].join(',') + ')';
    
    return div;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
    var catched = false,
        startPos = {
            x: 0,
            y: 0,
            targetX: 0,
            targetY: 0
        };
    
    target.addEventListener('mousedown', (e) => {
        catched = true;
        startPos.x = e.clientX;
        startPos.y = e.clientY;
        startPos.targetX = parseInt(target.style.left);
        startPos.targetY = parseInt(target.style.top);
    });
    
    target.addEventListener('mouseup', () => {
        catched = false;
    });
    
    target.addEventListener('mousemove', (e) => {
        var deltaX, deltaY;
        
        if (catched) {
            deltaY = e.clientY - startPos.y;
            deltaX = e.clientX - startPos.x;

            target.style.top = startPos.targetY + deltaY + 'px';
            target.style.left = startPos.targetX + deltaX + 'px';
        }
    });
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
