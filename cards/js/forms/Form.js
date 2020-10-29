"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Input = _interopRequireDefault(require("./Input.js"));

var _TextArea = _interopRequireDefault(require("./TextArea.js"));

var _FieldsForm = require("./FieldsForm.js");

var _Select = _interopRequireDefault(require("./Select.js"));

var _ajax = require("../modal/ajax.js");

var _Visit = require("../cards/Visit.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Form = /*#__PURE__*/function () {
  function Form(doctor) {
    _classCallCheck(this, Form);

    this.self = document.createElement("form");
    this.doctor = doctor;
    this.priority = new _Select["default"](_FieldsForm.fieldsForm.priority).create();
    this.fullName = new _Input["default"](_FieldsForm.fieldsForm.fullName, "form__input").create();
    this.purpose = new _Input["default"](_FieldsForm.fieldsForm.purpose, "form__input").create();
    this.desc = new _TextArea["default"](_FieldsForm.fieldsForm.desc, "form__input").create();
    this.submit = new _Input["default"](_FieldsForm.fieldsForm.submit, "form__submit").create();
    this.submit.value = "Сохранить визит";
  }

  _createClass(Form, [{
    key: "render",
    value: function render(modal) {
      var _this = this;

      this.self.classList.add("form");
      this.submit.addEventListener("click", /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event) {
          var newCardOut, modal, newCardIn, editedCard;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  event.preventDefault();
                  newCardOut = _this.collectData(), modal = document.querySelector(".header__modalWrapper");

                  if (!_this.isDataFilled(newCardOut)) {
                    _context.next = 14;
                    break;
                  }

                  if (modal.dataset.id) {
                    _context.next = 10;
                    break;
                  }

                  _context.next = 6;
                  return (0, _ajax.createCard)(newCardOut).then(function (r) {
                    return r.json();
                  });

                case 6:
                  newCardIn = _context.sent;

                  _this.submitForm(newCardIn, modal);

                  _context.next = 14;
                  break;

                case 10:
                  _context.next = 12;
                  return (0, _ajax.editCard)(newCardOut, modal.dataset.id).then(function (r) {
                    return r.json();
                  });

                case 12:
                  editedCard = _context.sent;

                  _this.submitEdit(editedCard, modal);

                case 14:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
      this.self.append(this.priority, this.fullName, this.purpose, this.desc, this.submit);
      modal.append(this.self);
    }
  }, {
    key: "collectData",
    value: function collectData() {
      var data = {};

      for (var key in this) {
        if (key === "self" || key === "submit") {
          continue;
        } else if (key === "doctor") {
          data[key] = this[key];
        } else {
          data[key] = this[key].value;
        }
      }

      return data;
    }
  }, {
    key: "isDataFilled",
    value: function isDataFilled(objectToCheck) {
      for (var key in objectToCheck) {
        if (objectToCheck[key] === undefined || objectToCheck[key] === null || objectToCheck[key] === "" || objectToCheck[key] === "Выберите срочность") {
          console.error("Missing property ".concat(key));
          return false;
        }
      }

      return true;
    }
  }, {
    key: "submitForm",
    value: function submitForm(newCardIn, modal) {
      var noItem = document.getElementById("empty");

      if (noItem) {
        noItem.remove();
      }

      if (newCardIn.doctor === "Кардиолог") {
        var visit = new _Visit.VisitCardiologist(newCardIn);
        visit.render(document.getElementById("container"));
        modal.remove();
      } else if (newCardIn.doctor === "Стоматолог") {
        var _visit = new _Visit.VisitDentist(newCardIn);

        _visit.render(document.getElementById("container"));

        modal.remove();
      } else if (newCardIn.doctor === "Терапевт") {
        var _visit2 = new _Visit.VisitTherapist(newCardIn);

        _visit2.render(document.getElementById("container"));

        modal.remove();
      }

      location.reload();
    }
  }, {
    key: "submitEdit",
    value: function submitEdit(newCardIn, modal) {
      var existCard = _toConsumableArray(document.querySelectorAll(".visit")).filter(function (visit) {
        if (visit.dataset.id === modal.dataset.id) {
          return visit;
        }
      })[0],
          parent = document.getElementById("container");

      if (newCardIn.doctor === "Кардиолог") {
        var visit = new _Visit.VisitCardiologist(newCardIn),
            visitNode = visit.render();
        parent.replaceChild(visitNode, existCard);
        modal.remove();
      } else if (newCardIn.doctor === "Стоматолог") {
        var _visit3 = new _Visit.VisitDentist(newCardIn),
            _visitNode = _visit3.render();

        parent.replaceChild(_visitNode, existCard);
        modal.remove();
      } else if (newCardIn.doctor === "Терапевт") {
        var _visit4 = new _Visit.VisitTherapist(newCardIn),
            _visitNode2 = _visit4.render();

        parent.replaceChild(_visitNode2, existCard);
        modal.remove();
      }

      location.reload();
    }
  }]);

  return Form;
}();

exports["default"] = Form;