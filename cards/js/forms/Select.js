"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// класс для создания выпадающих елементов
var Select = /*#__PURE__*/function () {
  function Select(optionsArr) {
    _classCallCheck(this, Select);

    this.options = optionsArr;
    this.self = document.createElement("select");
    this.self.className = "form__select";
  }

  _createClass(Select, [{
    key: "create",
    value: function create() {
      var _this = this;

      this.options.forEach(function (opt) {
        var optionNode = document.createElement("option");
        optionNode.textContent = opt;

        _this.self.append(optionNode);
      });
      return this.self;
    }
  }]);

  return Select;
}();

exports["default"] = Select;