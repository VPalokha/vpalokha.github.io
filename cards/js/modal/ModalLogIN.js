//прописан токен по логину/паролю:
//логин 1@1.com
//пароль 1
import Modal from "./Modal.js";
import {getLogin} from "./ajax.js";
import {renderCards} from "../cards/cards.js";

// Создаем контейнер для размещения карточек в ДОМ
const container = document.getElementById("container");
export let token;
token = sessionStorage.getItem('token');
const btnLog = document.querySelector('.header__btn');
btnLog.addEventListener('click', createModal);

// Функция видимости кнопки LOGIN, если получен токен, кнопка скрывается
window.onload = function () {
   if (token) {
      btnLog.remove();
      document.querySelector('.header__btn-create').removeAttribute('hidden');
   } else {
      btnLog.removeAttribute('hidden');
   }
};

// Класс модального окна для авторизации
class ModalLogIN extends Modal {
   constructor(email, password) {
      super();
      this.email = email;
      this.password = password;
      this.element.title = document.createElement('p');
      this.element.email = document.createElement('input');
      this.element.password = document.createElement('input');
   }

// Отрисовываем модальное окно в ДОМ
   render() {
      super.render();
      this.element.email.type = 'email';
      this.element.password.type = 'password';
      this.element.email.placeholder = 'email';
      this.element.password.placeholder = 'password';
      this.element.title.textContent = "LOGIN";
      this.element.email.className = "header__modal-input";
      this.element.password.className = "header__modal-input";
      this.element.title.className = "header__modal-text";
      this.element.modalWindow.append(this.element.btnClose, this.element.title, this.element.email, this.element.password, this.element.btnSubmit);

// Обработчик на кнопку авторизации, проверка на соответствие прошитому токену
      this.element.btnSubmit.addEventListener('click', async () => {
         let tokenResponse = await getLogin(this.element.email.value, this.element.password.value).then(r => r.text());
         if (tokenResponse === "c7b63993-0bf1-4782-b26e-e55f7bc62e3d") {
            sessionStorage.setItem('token', tokenResponse);
            token = sessionStorage.getItem('token');
            this.element.modalWrapper.remove();
            btnLog.remove();
            document.querySelector('.header__btn-create').removeAttribute('hidden');

            // карточки, полученные с сервера, отривовываем на страницу
            renderCards(container);
         } else {
            alert("Wrong login/password! Try again.")
         }
      })
   }
}

// Функция создания инстанса и запуска отрисовки окна авторизации
function createModal() {
   let modalLog = new ModalLogIN();
   modalLog.render();
}