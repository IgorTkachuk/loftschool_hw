/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

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
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

function fillCookies() {

    function sortCookies(a, b) {
        let aName = a.split('=')[0],
            bName = b.split('=')[0];
            
        if (aName > bName) { 
            return 1;
        }

        if (aName < bName) {
            return -1;
        }
        
        return 0;
    }
    
    resetListTable();
    
    let cookies = document.cookie.split('; ').sort(sortCookies);

    if (filterNameInput.value.length != 0) {
        cookies = cookies.filter((c) => {
            let [cName, cVal] = c.split('=');

            return ( isMatching(cName, filterNameInput.value) || isMatching(cVal, filterNameInput.value) );
        });
    }

    for (let cookie of cookies) {
        insertListTableRow(cookie);
    }
}

function insertListTableRow(rowData) {
    const [name, value] = rowData.split('=');
    
    let tr = document.createElement('tr'),
        tdFirst = document.createElement('td'),
        tdSecond = document.createElement('td'),
        btn = document.createElement('button');
    
    tdFirst.innerHTML = name;
    tdSecond.innerHTML = value;
    btn.innerHTML = 'Удалить cookie';
    btn.addEventListener('click', () => {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        tr.remove();
    });
    
    tr.appendChild(tdFirst);
    tr.appendChild(tdSecond);
    tr.appendChild(btn);
    
    listTable.appendChild(tr);
}

function isMatching(full, chunk) {
    var sFull = full.toLowerCase(),
        sChunk = chunk.toLowerCase();
    
    return sFull.indexOf(sChunk) > -1;
}

function resetListTable() {
    let elForRemove = [];

    for (let row of listTable.children) {
        elForRemove.push(row);
    }
    
    for (let el of elForRemove) {
        el.remove();
    }
}

filterNameInput.addEventListener('keyup', function() {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
    fillCookies();
});

addButton.addEventListener('click', () => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    document.cookie = `${addNameInput.value}=${addValueInput.value}`;

    fillCookies();
});
