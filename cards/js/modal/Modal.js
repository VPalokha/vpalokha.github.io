"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Создаем базовую модальную форму
var Modal = /*#__PURE__*/function () {
  function Modal() {
    _classCallCheck(this, Modal);

    this.element = {
      modalWrapper: document.createElement('div'),
      modalWindow: document.createElement('div'),
      btnClose: document.createElement('span'),
      btnSubmit: document.createElement('button')
    };
  } // Отрисовываем мобальную форму в header


  _createClass(Modal, [{
    key: "render",
    value: function render() {
      var parent = document.querySelector('.header');
      var modalWrapper = this.element.modalWrapper;
      var btnClose = this.element.btnClose;
      btnClose.innerHTML = "&times;";
      this.element.btnSubmit.type = 'submit';
      this.element.btnSubmit.textContent = 'Войти';
      modalWrapper.className = 'header__modal-wrapper';
      this.element.modalWindow.className = 'header__modal';
      this.element.btnSubmit.className = 'header__btn-submit';
      btnClose.className = 'header__modal-close';
      this.element.modalWindow.append(btnClose, this.element.btnSubmit);
      modalWrapper.append(this.element.modalWindow);
      parent.append(modalWrapper); // Обработчик вне модального окна или на btnClose , удаляет модальную форму

      document.addEventListener('click', function (event) {
        if (event.target === modalWrapper || event.target === btnClose) {
          modalWrapper.remove();
        }
      });
    }
  }]);

  return Modal;
}(); // import {API} from './ajax.js';
//
// export class Modal {
//     constructor(email, password, submitBtn) {
//         this.email = document.querySelector(".signInForm__email");
//         this.password = document.querySelector(".signInForm__password");
//         this.submitBtn = document.querySelector(".signInForm__submitBtn");
//         this.form = document.querySelector(".signInForm");
//         this.closeBtn = document.querySelector(".signInForm__closeBtn");
//         this.formBody = document.querySelector(".signInForm__body");
//         this.loginBtn = document.querySelector(".header__login-button");
//     }
//
//     closeSigningForm() {
//         document.body.addEventListener('click', (event) => {
//             if (event.target.classList.value === ('signInForm')) {
//                 this.form.style.display = 'none';
//             }
//         })
//     }
//
//     eventListenerGetLogin = () => {
//         this.formBody.style.display = "flex";
//         this.form.addEventListener('keypress', (event) => {
//             const key = event.code;
//             if (key === "Enter") {
//                 console.log(this.email, this.password, this.form)
//                 this.getLogin(this.email, this.password, this.form);
//             }
//         });
//         this.submitBtn.addEventListener('click', (event) => {
//             event.preventDefault();
//             this.getLogin(this.email, this.password, this.form);
//             document.querySelector('.signInForm').remove();
//         })
//     }
//
//     eventListenerCloseBtn() {
//         this.closeBtn.addEventListener('click', (event) => {
//             event.preventDefault();
//             this.form.style.display = "none";
//         });
//         this.closeSigningForm();
//     }
//
//     changeBtn() {
//         document.querySelector('.header__login-button').style.display = "none";
//         document.querySelector('.header__create-button').style.display = "block";
//     }
//
//     getLogin(email, password, form) {
//
//         fetch(`${API}/login`, {
//             method: "POST",
//             mode: "cors",
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 email: email.value,
//                 password: password.value
//             })
//         })
//         //     .then((res) => {
//         //     if (res.status >= 200 && res.status < 300) {
//         //         return res;
//         //     } else {
//         //         alert('Введен неверный логин или пароль');
//         //         location.reload();
//         //     }
//         // })
//             .then(resp => resp.text())
//             .then(data => {
//                 if (data === "c7b63993-0bf1-4782-b26e-e55f7bc62e3d") {
//                     sessionStorage.setItem('token', data)
//                     this.changeBtn();
//                 } else {
//                     alert('Введен неверный логин или пароль')
//                     location.reload()
//                 }
//             })
//             .catch(error => {
//                 alert(error);
//             })
//
//     }
// }
//
// const modal = new Modal();
// const loginBtn = document.querySelector(".header__login-button");
// loginBtn.addEventListener('click', (e) => {
//     modal.eventListenerGetLogin();
// });


exports["default"] = Modal;