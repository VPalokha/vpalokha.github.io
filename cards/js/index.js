"use strict";

var _search = require("./search.js");

var _cards = require("./cards/cards.js");

var _ModalLogIN = require("./modal/ModalLogIN.js");

var container = document.getElementById("container");
var formContainer = document.querySelector(".section");

if (_ModalLogIN.token) {
  (0, _cards.renderCards)(container);
}

(0, _search.search)(formContainer, container);