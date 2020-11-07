// Создаем базовую модальную форму
export default class Modal {
    constructor() {
        this.element = {
            modalWrapper: document.createElement('div'),
            modalWindow: document.createElement('div'),
            btnClose: document.createElement('span'),
            btnSubmit: document.createElement('button'),
        };
    }

// Отрисовываем мобальную форму в header
    render() {
        const parent = document.querySelector('.header');
        const modalWrapper = this.element.modalWrapper;
        const btnClose = this.element.btnClose;
        btnClose.innerHTML = "&times;";
        this.element.btnSubmit.type = 'submit';
        this.element.btnSubmit.textContent = 'Войти';
        modalWrapper.className = 'header__modal-wrapper';
        this.element.modalWindow.className = 'header__modal';
        this.element.btnSubmit.className = 'header__btn-submit';
        btnClose.className = 'header__modal-close';
        this.element.modalWindow.append(btnClose, this.element.btnSubmit);
        modalWrapper.append(this.element.modalWindow);
        parent.append(modalWrapper);

// Обработчик вне модального окна или на btnClose , удаляет модальную форму
        document.addEventListener('click', (event) => {
            if (event.target === modalWrapper || event.target === btnClose) {
                modalWrapper.remove();
            }

        });
    }
}
