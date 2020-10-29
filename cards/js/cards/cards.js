"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderCards = renderCards;

var _ajax = require("../modal/ajax.js");

var _Visit = require("./Visit.js");

// Функция для отрисовки карточек визитов, находящихся в сервере
function renderCards(container) {
  // получение массива визитов с сервера
  (0, _ajax.getCards)().then(function (c) {
    return c.json();
  }).then(function (arrVisitsFromServer) {
    // console.log(visits);
    // Вывод сообщения, если визиты не запланированы
    if (arrVisitsFromServer.length === 0) {
      var noItem = document.createElement('p');
      noItem.innerText = "No item has been added";
      noItem.id = "empty";
      container.append(noItem);
    } else {
      // Создание массива карточек
      var visitsObjects = arrVisitsFromServer.map(function (visit) {
        if (visit.content.doctor === "Стоматолог") {
          var visitCard = new _Visit.VisitDentist(visit); // отрисовка карточки в ДОМе

          visitCard.render(container);
          return visitCard;
        } else if (visit.content.doctor === "Кардиолог") {
          var _visitCard = new _Visit.VisitCardiologist(visit);

          _visitCard.render(container);

          return _visitCard;
        } else if (visit.content.doctor === "Терапевт") {
          var _visitCard2 = new _Visit.VisitTherapist(visit);

          _visitCard2.render(container);

          return _visitCard2;
        }
      });
      return visitsObjects;
    }
  });
} // демо-функция для вывода в консоль массива визитов с сервера
// async function show() {
//     let resp = await fetch(`https://ajax.test-danit.com/api/cards/`, {
//         method: "GET",
//         mode: "cors",
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: "Bearer c7b63993-0bf1-4782-b26e-e55f7bc62e3d"
//         }
//     });
//     let visits = await resp.json();
//     visits.forEach((item) => {
//         console.log(item)
//     })
// }
// show();