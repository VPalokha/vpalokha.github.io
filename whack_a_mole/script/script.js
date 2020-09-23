class whackMoleGame {
    constructor() {
        this._props = {
            field: {                    //Параметры игрового поля
                rows: 10,
                cols: 10,
            },
            level: [                    //Параметры уровня сложности
                {
                    name: 'light',
                    displayName: 'Легкий',
                    timeout: 1500
                },
                {
                    name: 'medium',
                    displayName: 'Средний',
                    timeout: 1000
                },
                {
                    name: 'hard',
                    displayName: 'Тяжелый',
                    timeout: 500
                }
            ],
            color: {
                curent: 'blue',
                human: 'green',
                computer: 'red'
            }
        }
        this._data = {                  //Игровые данные
            level: 0
        }
        this._html = {};                //HTML элементы
        this._init();
        this._createUI();
        this._listenNewGameButton();
    }

    _init() {
        if (this._data.timer) clearTimeout(this._data.timer);
        if (document.querySelector('.endGameMsg')) document.querySelector('.endGameMsg').remove();
        this._setParamLevel();
        this._resetDataScore();
        this._generateNewDataField();
    }

    //Добавить контейнер с игрой к указанному родителю
    appendTo(parent) {
        parent.append(this._html.container)
    }

    //Генерация игрового поля
    _generateNewDataField() {
        this._data.uncheckedCells = [];
        for (let i = 0; i < this._props.field.rows; i++) {
            for (let j = 0; j < this._props.field.cols; j++) {
                this._data.uncheckedCells.push({row: i, col: j});
            }
        }
    }

    //Установка слушателя кнопки
    _listenNewGameButton() {
        this._startNewGameBound = this.startNewGame.bind(this);
        this._html.btnNewGame.addEventListener('click', this._startNewGameBound);
    }

    //Установка слушателя игрового поля
    _listenFieldTable() {
        this._userTableClickBound = this._userTableClick.bind(this);
        this._html.table.addEventListener('click', this._userTableClickBound);
    }

    //Нажата кнопка Новая игра
    startNewGame() {
        this._resetHtmlTable();
        this._init();
        this._listenFieldTable();
        this._computerPlay();
    }

    //Игрок сделал свой ход (кликнул по полю)
    _userTableClick(e) {
        if (e.target === this._html.currentCell) {
            clearTimeout(this._data.timer);
            this._incDataScore('human');
            this._updateHtmlScore();
            this._markCell(this._html.currentCell, this._props.color.human);

            if (this._isGameOver()) {
                this._gameOver();
                return;
            }
            this._computerPlay();
        }
    }

    //Изменить текущий уровень сложности
    _setParamLevel() {
        if (document.querySelector('.paramInput:checked')) {
            this._data.level = document.querySelector('.paramInput:checked').dataset.levelId;
        } else {
            this._data.level = 0
        }
    }

    //Возвращает таймаут текущего уровня сложности
    _getlevelTimeout() {
        return this._props.level[this._data.level].timeout;
    }

    //Возвращает координату рандомной ячеки игрового поля
    _getDataRandomUncheckedCellCoord() {
        const rndIndex = Math.floor(Math.random() * this._data.uncheckedCells.length);
        const rndCell = this._data.uncheckedCells[rndIndex];
        return {cell: rndCell, cellId: rndIndex}
    }

    //Возвращает html элемент игрового поля с заданными координатами
    _getHtmlCell(coord) {
        return this._html.table.children[coord.row].children[coord.col]
    }

    //Пометить ячейку цветом
    _markCell(htmlCell, color) {
        htmlCell.style.backgroundColor = color;
    }

    //Проверка на условие конца игры
    _isGameOver() {
        const halfCellNumber = (this._props.field.rows * this._props.field.cols) / 4
        return (this._data.score.human >= halfCellNumber) || (this._data.score.computer >= halfCellNumber)
    }

    //Возвращает кто выиграл
    _whoWin() {
        return this._data.score.human > this._data.score.computer ? 'ТЫ' : 'КОМПЬЮТЕР'
    }

    //Конец игры
    _gameOver() {
        clearTimeout(this._data.timer);
        this._html.table.removeEventListener('click', this._userTableClickBound);
        const htmlWin = document.createElement('p');
        htmlWin.classList.add('endGameMsg');
        htmlWin.textContent = `${this._whoWin()} ВЫИГРАЛ!!!`;
        htmlWin.style.width = this._html.table.offsetWidth + 'px';
        this._html.container.append(htmlWin);
        htmlWin.style.top = this._html.table.offsetTop + this._html.table.offsetHeight / 2 - htmlWin.offsetHeight / 2 + 'px'
    }

    //Ход компьютера - выбор рандомной ячейки
    _computerPlay() {
        this._data.currentCell = this._getDataRandomUncheckedCellCoord();
        this._html.currentCell = this._getHtmlCell(this._data.currentCell.cell);
        this._markCell(this._html.currentCell, this._props.color.curent);
        this._data.uncheckedCells.splice(this._data.currentCell.cellId, 1)
        this._data.timer = setTimeout(this._timeOver.bind(this), this._getlevelTimeout())
    }

    //Время игрока вышло
    _timeOver() {
        this._incDataScore('computer');
        this._updateHtmlScore();
        this._markCell(this._html.currentCell, this._props.color.computer);
        if (this._isGameOver()) {
            this._gameOver()
            return
        }
        this._computerPlay();
    }

    //Обнулить данные счета игры
    _resetDataScore() {
        this._data.score = {
            human: 0,
            computer: 0
        };
    }

    //Увеличить данные счета игры
    _incDataScore(player) {
        this._data.score[player]++;
    }

    //Обновить интерфейс счета игры
    _updateHtmlScore() {
        this._html.score.innerText = `Счет: ${this._data.score.human} - Человек / ${this._data.score.computer} - Компьютер`;
    }

    //Создание игрового интерфейса
    _createUI() {
        //***Контейнер игры
        this._html.container = document.createElement('div');
        this._html.container.classList.add('whack-Mole-Game');
        //***Кнопка новой игры
        this._html.btnNewGame = document.createElement('button');
        this._html.btnNewGame.innerText = 'НОВАЯ ИГРА';
        this._html.btnNewGame.classList.add('whack-Mole-Game__btn');
        // this.html._btnNewGame.addEventListener('click', this.onFieldClick.bind(this));
        this._html.container.append(this._html.btnNewGame);
        //***Игровой счет
        this._html.score = document.createElement('p');
        this._html.score.classList.add('whack-Mole-Game__score');
        this._html.score.innerText = `Счет: ${this._data.score.human} - Человек / ${this._data.score.computer} - Компьютер`;
        this._html.container.append(this._html.score);
        //***Игровое поле
        this._html.table = document.createElement('table');
        this._html.table.classList.add('whack-Mole-Game__table');
        // this.html._table.addEventListener('click', this.props.onFieldClick.bind(this));
        this._html.container.append(this._html.table);
        for (let i = 0; i < this._props.field.rows; i++) {
            let tr = document.createElement('tr');
            this._html.table.append(tr);
            for (let j = 0; j < this._props.field.cols; j++) {
                let td = document.createElement('td');
                td.classList.add('whack-Mole-Game__cell');
                tr.append(td);
            }
        }
        //***Параметры уровня сложности
        this._html.param = document.createElement('form');
        this._html.param.classList.add('whack-Mole-Game__params');
        this._html.container.append(this._html.param);
        const elParamSet = document.createElement('fieldset');
        this._html.param.append(elParamSet);
        elParamSet.append(document.createElement('legend'));
        elParamSet.firstElementChild.textContent = 'Уровень сложности: ';
        this._props.level.forEach((levelItem, id) => {
            const elParamRowsInput = document.createElement('input');
            elParamRowsInput.classList.add('paramInput');
            elParamRowsInput.id = `input-${levelItem.name}`;
            elParamRowsInput.dataset.levelId = id;
            elParamRowsInput.value = levelItem.timeout;
            this._data.level === id ? elParamRowsInput.checked = 'true' : false;
            elParamRowsInput.name = 'level';
            elParamRowsInput.type = 'radio';
            elParamSet.append(elParamRowsInput);
            let elParamLabel = document.createElement('label');
            elParamLabel.classList.add('paramLabel');
            elParamLabel.setAttribute('for', `input-${levelItem.name}`);
            elParamLabel.textContent = levelItem.displayName;
            elParamSet.append(elParamLabel);
        });
    }

    _resetHtmlTable() {
        const cells = document.querySelectorAll('.whack-Mole-Game__cell');
        [...cells].forEach((cell) => cell.style.backgroundColor = '')
    }
}

const game = new whackMoleGame()
game.appendTo(document.body);