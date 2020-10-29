"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLogin = getLogin;
exports.createCard = createCard;
exports.deleteCard = deleteCard;
exports.editCard = editCard;
exports.getCards = getCards;
exports.API = void 0;

var _ModalLogIN = require("./ModalLogIN.js");

// Файл с фетч-запросами для авторизации getLogin, создания карт createCard, удаления карт deleteCard, редактирования карт editCard, получения масссива карт getCards
var API = 'https://ajax.test-danit.com/api/cards/';
exports.API = API;

function getLogin(email, password) {
  return fetch("".concat(API, "login"), {
    method: "POST",
    mode: "cors",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  });
}

function createCard(card) {
  return fetch("".concat(API), {
    method: "POST",
    mode: "cors",
    headers: {
      'Content-Type': 'application/json',
      Authorization: "Bearer ".concat(_ModalLogIN.token)
    },
    body: JSON.stringify(card)
  });
}

function deleteCard(id) {
  return fetch("".concat(API).concat(id), {
    method: "DELETE",
    mode: "cors",
    headers: {
      'Content-Type': 'application/json',
      Authorization: "Bearer ".concat(_ModalLogIN.token)
    }
  });
}

function editCard(newCard, cardId) {
  return fetch("".concat(API, "/").concat(cardId), {
    method: "PUT",
    mode: "cors",
    headers: {
      'Content-Type': 'application/json',
      Authorization: "Bearer ".concat(_ModalLogIN.token)
    },
    body: JSON.stringify(newCard)
  });
}

function getCards() {
  return fetch("".concat(API), {
    method: "GET",
    mode: "cors",
    headers: {
      'Content-Type': 'application/json',
      Authorization: "Bearer ".concat(_ModalLogIN.token)
    }
  });
} // export const API = 'https://ajax.test-danit.com/api/cards';
// const token = sessionStorage.getItem('token');
//
// const headers = {
//     Authorization: `Bearer ${token}`,
//     "Content-Type": "application/json"
// };
//
// export function getLogin(email, password) {
//     return fetch(`${API}/login`, {
//         method: "POST",
//         mode: "cors",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             email: email.value,
//             password: password.value
//         })
//     })
// }
//
// export function createCard(card) {
//     return fetch({
//         url: `${API}`,
//         method: "POST",
//         headers: headers,
//         body: JSON.stringify(card)
//     })
// }
//
// export function getAll() {
//     return fetch({
//         url: `${API}`,
//         method: "GET",
//         headers: headers
//     });
// }
//
// export function getCard(id) {
//     return fetch({
//         url: `${API}/${id}`,
//         method: "GET",
//         headers: headers
//     });
// }
//
// export function editCard(id, card) {
//     return fetch({
//         url: `${API}/${id}`,
//         method: "PUT",
//         headers: headers,
//         body: JSON.stringify(card)
//     });
// }
//
// export function removeCard(id) {
//     return fetch({
//         url: `${API}/${id}`,
//         method: "DELETE",
//         headers: headers,
//     })
// }
//
// export function sendCard(card) {
//     return fetch({
//         url: `${API}`,
//         method: "POST",
//         headers: headers,
//         body: JSON.stringify(card)
//     })
// }