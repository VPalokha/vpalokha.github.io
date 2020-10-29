"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _FormDentist = _interopRequireDefault(require("../forms/FormDentist.js"));

var _FormTherapist = _interopRequireDefault(require("../forms/FormTherapist.js"));

var _FormCardiologist = _interopRequireDefault(require("../forms/FormCardiologist.js"));

var _Select = _interopRequireDefault(require("../forms/Select.js"));

var _Modal2 = _interopRequireDefault(require("./Modal.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

// Модифицируем модальную форму для выбора врача
var ModalForm = /*#__PURE__*/function (_Modal) {
  _inherits(ModalForm, _Modal);

  var _super = _createSuper(ModalForm);

  function ModalForm() {
    var _this;

    _classCallCheck(this, ModalForm);

    _this = _super.call(this);
    _this.doctor = new _Select["default"](["Выберите врача", "Кардиолог", "Стоматолог", "Терапевт"]).create();
    return _this;
  } // Отрисовываем мобальную форму, плюс обработчик на селектор выбора врача


  _createClass(ModalForm, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      _get(_getPrototypeOf(ModalForm.prototype), "render", this).call(this);

      this.doctor.addEventListener("change", function (event) {
        _this2.selectForm(event);
      });
      this.element.btnSubmit.remove();
      this.element.modalWindow.insertBefore(this.doctor, this.element.btnClose);
    } // Проверка на существование открытой формы по другому врачу, если есть, удаляется, после этого отрисовывается форма по выбранному врачу

  }, {
    key: "checkAndPutForm",
    value: function checkAndPutForm(newForm, existForm) {
      if (existForm) {
        this.element.modalWindow.removeChild(existForm);
        newForm.render(this.element.modalWindow);
      } else {
        newForm.render(this.element.modalWindow);
      }
    } // Функция присваивания  класса формы по выбранному врачу

  }, {
    key: "selectForm",
    value: function selectForm(event) {
      var exist = this.element.modalWindow.children[2];

      if (event.target.value === "Кардиолог") {
        var form = new _FormCardiologist["default"](event.target.value);
        this.checkAndPutForm(form, exist);
      } else if (event.target.value === "Стоматолог") {
        var _form = new _FormDentist["default"](event.target.value);

        this.checkAndPutForm(_form, exist);
      } else if (event.target.value === "Терапевт") {
        var _form2 = new _FormTherapist["default"](event.target.value);

        this.checkAndPutForm(_form2, exist);
      }
    }
  }, {
    key: "ifEditModal",
    value: function ifEditModal(id) {
      this.element.modalWindow.dataset.id = id;
      this.element.modalWrapper.dataset.id = id;
    }
  }]);

  return ModalForm;
}(_Modal2["default"]); // Обработчик клика на кнопку СОЗДАТЬ, запускает создание модальной формы


exports["default"] = ModalForm;
var btn = document.querySelector(".header__btn-create");
btn.addEventListener("click", function () {
  var modal = new ModalForm();
  modal.render();
});