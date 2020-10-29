"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.token = void 0;

var _Modal2 = _interopRequireDefault(require("./Modal.js"));

var _ajax = require("./ajax.js");

var _cards = require("../cards/cards.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

// Создаем контейнер для размещения карточек в ДОМ
var container = document.getElementById("container");
var token;
exports.token = token;
exports.token = token = sessionStorage.getItem('token');
var btnLog = document.querySelector('.header__btn');
btnLog.addEventListener('click', createModal); // Функция видимости кнопки LOGIN, если получен токен, кнопка скрывается

window.onload = function () {
  if (token) {
    btnLog.remove();
    document.querySelector('.header__btn-create').removeAttribute('hidden');
  } else {
    btnLog.removeAttribute('hidden');
  }
}; // Класс модального окна для авторизации


var ModalLogIN = /*#__PURE__*/function (_Modal) {
  _inherits(ModalLogIN, _Modal);

  var _super = _createSuper(ModalLogIN);

  function ModalLogIN(email, password) {
    var _this;

    _classCallCheck(this, ModalLogIN);

    _this = _super.call(this);
    _this.email = email;
    _this.password = password;
    _this.element.title = document.createElement('p');
    _this.element.email = document.createElement('input');
    _this.element.password = document.createElement('input');
    return _this;
  } // Отрисовываем модальное окно в ДОМ


  _createClass(ModalLogIN, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      _get(_getPrototypeOf(ModalLogIN.prototype), "render", this).call(this);

      this.element.email.type = 'email';
      this.element.password.type = 'password';
      this.element.email.placeholder = 'email';
      this.element.password.placeholder = 'password';
      this.element.title.textContent = "LOGIN";
      this.element.email.className = "header__modal-input";
      this.element.password.className = "header__modal-input";
      this.element.title.className = "header__modal-text";
      this.element.modalWindow.append(this.element.btnClose, this.element.title, this.element.email, this.element.password, this.element.btnSubmit); // Обработчик на кнопку авторизации, проверка на соответствие прошитому токену

      this.element.btnSubmit.addEventListener('click', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var tokenResponse;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _ajax.getLogin)(_this2.element.email.value, _this2.element.password.value).then(function (r) {
                  return r.text();
                });

              case 2:
                tokenResponse = _context.sent;

                if (tokenResponse === "c7b63993-0bf1-4782-b26e-e55f7bc62e3d") {
                  sessionStorage.setItem('token', tokenResponse);
                  exports.token = token = sessionStorage.getItem('token');

                  _this2.element.modalWrapper.remove();

                  btnLog.remove();
                  document.querySelector('.header__btn-create').removeAttribute('hidden'); // карточки, полученные с сервера, отривовываем на страницу

                  (0, _cards.renderCards)(container);
                } else {
                  alert("Wrong login/password! Try again.");
                }

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })));
    }
  }]);

  return ModalLogIN;
}(_Modal2["default"]); // Функция создания инстанса и запуска отрисовки окна авторизации


function createModal() {
  var modalLog = new ModalLogIN();
  modalLog.render();
}