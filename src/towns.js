/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загруки повторяется заново
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
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
    
    const compareTownNames = (a, b) => {
        if (a.name > b.name) {
            return 1;
        }

        if (a.name < b.name) {
            return -1;
        }

        return 0;
    }
    
    return new Promise ((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const errMsg = 'Не удалось загрузить города';
        
        xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
        xhr.responseType = 'json';
        xhr.send();
        
        xhr.addEventListener('load', () => {
            if (xhr.status >= 400) {
                reject(errMsg);
            } else {
                resolve(xhr.response.sort(compareTownNames));
            }
        });

        xhr.addEventListener('abort', () => reject(errMsg));
        xhr.addEventListener('error', () => reject(errMsg));
    });
    
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    var sFull = full.toLowerCase(),
        sChunk = chunk.toLowerCase();
    
    return sFull.indexOf(sChunk) > -1;
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

let townList;

function stageLoadTowns() {
    loadTowns().then(
        (towns) => {
            townList = towns;
            loadingBlock.style.display = 'none';
            filterBlock.style.display = 'inline';
        },
        (errMsg) => {
            let errBtn = document.createElement('button');

            loadingBlock.innerHTML = errMsg;
            errBtn.innerHTML = 'Повторить';
            errBtn.id = 'errBtn';
            errBtn.addEventListener('click', (e) => {
                loadingBlock.innerHTML = 'Загрузка...';
                stageLoadTowns();
                e.target.remove();
            });
            loadingBlock.appendChild(errBtn);
        }
    );
}

stageLoadTowns();

filterInput.addEventListener('keyup', function() {
    // это обработчик нажатия кливиш в текстовом поле
    
    filterResult.innerHTML = '';
    
    if (filterInput.value.length == 0) {
        return;
    }
    
    for (let town of townList) {
        if (isMatching(town.name, filterInput.value)) {
            filterResult.innerHTML += `<br>${town.name}`;
        }
    }
});

export {
    loadTowns,
    isMatching
};
