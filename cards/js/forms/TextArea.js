"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TextArea = /*#__PURE__*/function () {
  function TextArea(_ref, className) {
    var placeholder = _ref.placeholder,
        isRequired = _ref.isRequired;

    _classCallCheck(this, TextArea);

    this.placeholder = placeholder;
    this.isRequired = isRequired;
    this.className = className;
    this.self = document.createElement("textarea");
  }

  _createClass(TextArea, [{
    key: "create",
    value: function create() {
      this.self.placeholder = this.placeholder;
      this.self.required = this.isRequired;
      this.self.classList.add(this.className);
      return this.self;
    }
  }]);

  return TextArea;
}();

exports["default"] = TextArea;