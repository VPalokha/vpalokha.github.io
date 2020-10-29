"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.search = search;
exports.getVisits = getVisits;

var _ajax = require("./modal/ajax.js");

var _Visit = require("./cards/Visit.js");

var container = document.getElementById("container");

function search(formContainer, visitContainer) {
  var searchWrap = document.createElement('form');
  var searchInput = document.createElement('input');
  var doctorInput = document.createElement('select');
  var doctorInput1 = document.createElement('option');
  var doctorInput2 = document.createElement('option');
  var doctorInput3 = document.createElement('option');
  var doctorInput4 = document.createElement('option');
  var priorityInput = document.createElement('select');
  var priorityInput1 = document.createElement('option');
  var priorityInput2 = document.createElement('option');
  var priorityInput3 = document.createElement('option');
  var priorityInput4 = document.createElement('option');
  var buttonInput = document.createElement('input');
  searchInput.placeholder = "Поиск";
  doctorInput1.innerText = "Выберите доктора";
  doctorInput2.innerText = "Терапевт";
  doctorInput3.innerText = "Стоматолог";
  doctorInput4.innerText = "Кардиолог";
  doctorInput.append(doctorInput1, doctorInput2, doctorInput3, doctorInput4);
  priorityInput1.innerText = "Выберите срочность";
  priorityInput2.innerText = "Обычная";
  priorityInput3.innerText = "Приоритетная";
  priorityInput4.innerText = "Неотложная";
  priorityInput.append(priorityInput1, priorityInput2, priorityInput3, priorityInput4);
  buttonInput.type = "button";
  buttonInput.value = "Искать";
  searchWrap.className = 'section__form-wrapper';
  searchInput.className = 'section__form-search';
  doctorInput.className = 'section__form-select';
  priorityInput.className = 'section__form-select';
  buttonInput.className = "section__form-btn";
  searchWrap.addEventListener('submit', function (e) {
    e.preventDefault();
    getAndRender();
  });
  searchWrap.append(searchInput, doctorInput, priorityInput, buttonInput);
  formContainer.prepend(searchWrap);

  function getAndRender() {
    visitContainer.innerText = "";
    var visits = getVisits(); // получить данные с сервера и преобразовать их в массив готовых для рендера объектов

    visits.then(function (cards) {
      var cardsSearch = cards.filter(function (visit) {
        if (visit) {
          var searchContent = visit.purpose + " " + visit.fullName;
          if (searchContent.toLowerCase().includes(searchInput.value.toLowerCase())) if (doctorInput.value === "Выберите доктора" && priorityInput.value === "Выберите срочность") return true;else return doctorInput.value === visit.doctor && priorityInput.value === visit.priority || doctorInput.value === "Выберите доктора" && priorityInput.value === visit.priority || priorityInput.value === "Выберите срочность" && doctorInput.value === visit.doctor;
        }
      });
      cardsSearch.forEach(function (item) {
        return item.render(visitContainer);
      });
    });
  }

  buttonInput.addEventListener('click', function (e) {
    getAndRender();
  });
} // получаем данные с существующими визитами с сервера


function getVisits() {
  return (0, _ajax.getCards)().then(function (c) {
    return c.json();
  }).then(function (visits) {
    if (visits !== undefined) {
      // помещаем карточки визитов в нужный массив
      return visits.map(function (visit) {
        if (visit.content.doctor === "Стоматолог") {
          return new _Visit.VisitDentist(visit);
        } else if (visit.content.doctor === "Кардиолог") {
          return new _Visit.VisitCardiologist(visit);
        } else if (visit.content.doctor === "Терапевт") {
          return new _Visit.VisitTherapist(visit);
        }
      });
    }
  });
}