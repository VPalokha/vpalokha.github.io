"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisitCardiologist = exports.VisitTherapist = exports.VisitDentist = exports.Visit = void 0;

var _Select = _interopRequireDefault(require("../forms/Select.js"));

var _FieldsForm = require("../forms/FieldsForm.js");

var _ModalForm = _interopRequireDefault(require("../modal/ModalForm.js"));

var _ajax = require("../modal/ajax.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//Создание основого класса карточек
var Visit = /*#__PURE__*/function () {
  function Visit(visit) {
    _classCallCheck(this, Visit);

    this.id = visit.id;
    this.doctor = visit.content.doctor;
    this.purpose = visit.content.purpose;
    this.desc = visit.content.desc;
    this.priority = visit.content.priority;
    this.fullName = visit.content.fullName;
    this.elem = {
      self: document.createElement("div"),
      fullName: document.createElement("h3"),
      doctor: document.createElement("span"),
      priority: document.createElement("span"),
      purpose: document.createElement("span"),
      desc: document.createElement("p"),
      showMoreBtn: document.createElement("button"),
      hideBtn: document.createElement("button"),
      editBtn: document.createElement("button"),
      deleteBtn: document.createElement("button")
    };
  } //Отображение карточек на главной странице


  _createClass(Visit, [{
    key: "render",
    value: function render(parent) {
      var _this = this;

      this.elem.fullName.textContent = this.fullName;
      this.elem.doctor.textContent = "\u0414\u043E\u043A\u0442\u043E\u0440: ".concat(this.doctor);
      this.elem.priority.textContent = "\u0421\u0440\u043E\u0447\u043D\u043E\u0441\u0442\u044C: ".concat(this.priority);
      this.elem.purpose.textContent = "\u0426\u0435\u043B\u044C \u0432\u0438\u0437\u0438\u0442\u0430: ".concat(this.purpose);
      this.elem.desc.textContent = "\u041A\u0440\u0430\u0442\u043A\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0432\u0438\u0437\u0438\u0442\u0430: ".concat(this.desc);
      this.elem.showMoreBtn.textContent = "Показать";
      this.elem.hideBtn.textContent = "Скрыть";
      this.elem.hideBtn.style.display = 'none';
      this.elem.editBtn.textContent = "Редактировать";
      this.elem.deleteBtn.textContent = "X";
      this.elem.self.classList.add("visit");
      this.elem.fullName.classList.add("visit__head");
      this.elem.doctor.classList.add("visit__text");
      this.elem.priority.classList.add("visit__text");
      this.elem.purpose.classList.add("visit__text");
      this.elem.desc.classList.add("visit__text");
      this.elem.showMoreBtn.classList.add("visit__btn");
      this.elem.hideBtn.classList.add("visit__btn");
      this.elem.editBtn.classList.add("visit__btn-edit");
      this.elem.deleteBtn.classList.add("visit__btn-delete");
      this.elem.self.draggable = true;
      this.elem.self.dataset.id = this.id; //Кнопка редактирования карточки

      this.elem.editBtn.addEventListener("click", /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event) {
          var form;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  form = new _ModalForm["default"]();
                  event.target.value = event.target.childNodes[0].outerText;
                  form.ifEditModal(_this.id);
                  form.render();

                case 4:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }()); //Кнопка удаления карточки 

      this.elem.deleteBtn.addEventListener("click", /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(event) {
          var response, renderedVisits, noItem;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return (0, _ajax.deleteCard)(_this.id);

                case 2:
                  response = _context2.sent;

                  if (response.status === "Success") {
                    _this.elem.self.remove();

                    renderedVisits = document.querySelectorAll(".visit");

                    if (!renderedVisits || renderedVisits.length === 0) {
                      noItem = document.createElement('p');
                      noItem.id = "empty";
                      noItem.textContent = "No item has been added";
                      parent.append(noItem);
                    }
                  }

                  location.reload();

                case 5:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x2) {
          return _ref2.apply(this, arguments);
        };
      }());
      this.elem.self.append(this.elem.fullName, this.elem.doctor, this.elem.showMoreBtn, this.elem.hideBtn, this.elem.editBtn, this.elem.deleteBtn);
    }
  }]);

  return Visit;
}(); //Дочерний класс Дантист


exports.Visit = Visit;

var VisitDentist = /*#__PURE__*/function (_Visit) {
  _inherits(VisitDentist, _Visit);

  var _super = _createSuper(VisitDentist);

  function VisitDentist(visit) {
    var _this2;

    _classCallCheck(this, VisitDentist);

    _this2 = _super.call(this, visit);
    _this2.lastDateVisit = visit.content.lastDateVisit;
    return _this2;
  } //Отрисовка Дантиста на главной странице


  _createClass(VisitDentist, [{
    key: "render",
    value: function render(parent) {
      var _this3 = this;

      _get(_getPrototypeOf(VisitDentist.prototype), "render", this).call(this, parent);

      this.elem.lastDateVisit = document.createElement("span");
      this.elem.lastDateVisit.textContent = "\u0414\u0430\u0442\u0430 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u0433\u043E \u0432\u0438\u0437\u0438\u0442\u0430: ".concat(this.lastDateVisit);
      this.elem.lastDateVisit.classList.add("visit__text");
      this.elem.showMoreBtn.addEventListener("click", function () {
        _this3.showMore();
      });
      this.elem.hideBtn.addEventListener("click", function () {
        _this3.hide();
      });

      if (parent) {
        parent.append(this.elem.self);
      } else {
        return this.elem.self;
      }
    } //Кнопка для отрисовки дополнительной информации Дантиста   

  }, {
    key: "showMore",
    value: function showMore() {
      var _this4 = this;

      var moreInfo = [];

      for (var key in this.elem) {
        if (key === "purpose" || key === "desc" || key === "priority" || key === "lastDateVisit") {
          moreInfo.push(this.elem[key]);
        }
      }

      moreInfo.forEach(function (item) {
        _this4.elem.self.insertBefore(item, _this4.elem.showMoreBtn);
      });
      this.elem.showMoreBtn.style.display = 'none';
      this.elem.hideBtn.style.display = 'inline-block';
    } //Кнопка для скрытия информации Дантиста

  }, {
    key: "hide",
    value: function hide() {
      this.elem.self.removeChild(this.elem.purpose);
      this.elem.self.removeChild(this.elem.desc);
      this.elem.self.removeChild(this.elem.priority);
      this.elem.self.removeChild(this.elem.lastDateVisit);
      this.elem.hideBtn.style.display = 'none';
      this.elem.showMoreBtn.style.display = 'inline-block';
    }
  }]);

  return VisitDentist;
}(Visit); //Дочерний класс Терапевт 


exports.VisitDentist = VisitDentist;

var VisitTherapist = /*#__PURE__*/function (_Visit2) {
  _inherits(VisitTherapist, _Visit2);

  var _super2 = _createSuper(VisitTherapist);

  function VisitTherapist(visit) {
    var _this5;

    _classCallCheck(this, VisitTherapist);

    _this5 = _super2.call(this, visit);
    _this5.age = visit.content.age;
    return _this5;
  } //Отрисовка Терапевта на главной странице


  _createClass(VisitTherapist, [{
    key: "render",
    value: function render(parent) {
      var _this6 = this;

      _get(_getPrototypeOf(VisitTherapist.prototype), "render", this).call(this, parent);

      this.elem.age = document.createElement("span");
      this.elem.age.textContent = "\u0412\u043E\u0437\u0440\u0430\u0441\u0442: ".concat(this.age);
      this.elem.age.classList.add("visit__text");
      this.elem.showMoreBtn.addEventListener("click", function () {
        _this6.showMore();
      });
      this.elem.hideBtn.addEventListener("click", function () {
        _this6.hide();
      });

      if (parent) {
        parent.append(this.elem.self);
      } else {
        return this.elem.self;
      }
    } //Кнопка для отрисовки дополнительной информации Дантиста   

  }, {
    key: "showMore",
    value: function showMore() {
      var _this7 = this;

      var moreInfo = [];

      for (var key in this.elem) {
        if (key === "purpose" || key === "desc" || key === "priority" || key === "age") {
          moreInfo.push(this.elem[key]);
        }
      }

      moreInfo.forEach(function (item) {
        _this7.elem.self.insertBefore(item, _this7.elem.showMoreBtn);
      }); // this.elem.self.removeChild(this.elem.showMoreBtn);

      this.elem.showMoreBtn.style.display = 'none';
      this.elem.hideBtn.style.display = 'inline-block';
    } //Кнопка для скрытия информации Терапевта

  }, {
    key: "hide",
    value: function hide() {
      this.elem.self.removeChild(this.elem.purpose);
      this.elem.self.removeChild(this.elem.desc);
      this.elem.self.removeChild(this.elem.priority);
      this.elem.self.removeChild(this.elem.age);
      this.elem.hideBtn.style.display = 'none';
      this.elem.showMoreBtn.style.display = 'inline-block';
    }
  }]);

  return VisitTherapist;
}(Visit); //Дочерний класс Кардиолога 


exports.VisitTherapist = VisitTherapist;

var VisitCardiologist = /*#__PURE__*/function (_Visit3) {
  _inherits(VisitCardiologist, _Visit3);

  var _super3 = _createSuper(VisitCardiologist);

  function VisitCardiologist(visit) {
    var _this8;

    _classCallCheck(this, VisitCardiologist);

    _this8 = _super3.call(this, visit);
    _this8.pressure = visit.content.pressure;
    _this8.weightIndex = visit.content.weightIndex;
    _this8.heartIllness = visit.content.heartIllness;
    _this8.age = visit.content.age;
    return _this8;
  } //Отрисовка Кардиолога на главной странице


  _createClass(VisitCardiologist, [{
    key: "render",
    value: function render(parent) {
      var _this9 = this;

      _get(_getPrototypeOf(VisitCardiologist.prototype), "render", this).call(this, parent);

      this.elem.pressure = document.createElement("span");
      this.elem.weightIndex = document.createElement("span");
      this.elem.heartIllness = document.createElement("span");
      this.elem.age = document.createElement("span");
      this.elem.pressure.textContent = "\u0414\u0430\u0432\u043B\u0435\u043D\u0438\u0435: ".concat(this.pressure);
      this.elem.weightIndex.textContent = "\u0418\u043D\u0434\u0435\u043A\u0441 \u043C\u0430\u0441\u0441\u044B \u0442\u0435\u043B\u0430: ".concat(this.weightIndex);
      this.elem.heartIllness.textContent = "\u0420\u0430\u043D\u0435\u0435 \u043F\u0435\u0440\u0435\u043D\u0435\u0441\u0435\u043D\u043D\u044B\u0435 \u0437\u0430\u0431\u043E\u043B\u0435\u0432\u0430\u043D\u0438\u044F \u0441\u0435\u0440\u0434\u0446\u0430: ".concat(this.heartIllness);
      this.elem.age.textContent = "\u0412\u043E\u0437\u0440\u0430\u0441\u0442: ".concat(this.age);
      this.elem.pressure.classList.add("visit__text");
      this.elem.weightIndex.classList.add("visit__text");
      this.elem.heartIllness.classList.add("visit__text");
      this.elem.age.classList.add("visit__text");
      this.elem.showMoreBtn.addEventListener("click", function () {
        _this9.showMore();
      });
      this.elem.hideBtn.addEventListener("click", function () {
        _this9.hide();
      });

      if (parent) {
        parent.append(this.elem.self);
      } else {
        return this.elem.self;
      }
    } //Кнопка для отрисовки дополнительной информации Кардиолога  

  }, {
    key: "showMore",
    value: function showMore() {
      var _this10 = this;

      var moreInfo = [];

      for (var key in this.elem) {
        if (key === "purpose" || key === "desc" || key === "priority" || key === "pressure" || key === "weightIndex" || key === "heartIllness" || key === "age") {
          moreInfo.push(this.elem[key]);
        }
      }

      moreInfo.forEach(function (item) {
        _this10.elem.self.insertBefore(item, _this10.elem.showMoreBtn);
      });
      this.elem.showMoreBtn.style.display = 'none';
      this.elem.hideBtn.style.display = 'inline-block';
    } //Кнопка для скрытия информации Кардиолого

  }, {
    key: "hide",
    value: function hide() {
      this.elem.self.removeChild(this.elem.purpose);
      this.elem.self.removeChild(this.elem.desc);
      this.elem.self.removeChild(this.elem.priority);
      this.elem.self.removeChild(this.elem.pressure);
      this.elem.self.removeChild(this.elem.weightIndex);
      this.elem.self.removeChild(this.elem.heartIllness);
      this.elem.self.removeChild(this.elem.age);
      this.elem.hideBtn.style.display = 'none';
      this.elem.showMoreBtn.style.display = 'inline-block';
    }
  }]);

  return VisitCardiologist;
}(Visit);

exports.VisitCardiologist = VisitCardiologist;