// Файл с фетч-запросами для авторизации getLogin, создания карт createCard, удаления карт deleteCard, редактирования карт editCard, получения масссива карт getCards
import {token} from "./ModalLogIN.js";

export const API = 'https://ajax.test-danit.com/api/cards/';

export function getLogin(email, password) {
    return fetch(`${API}login`, {
        method: "POST",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
}

export function createCard(card) {
    return fetch(`${API}`, {
        method: "POST",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(card)
    })
}

export function deleteCard(id) {
    return fetch(`${API}${id}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
}

export function editCard(newCard, cardId) {
    return fetch(`${API}/${cardId}`, {
        method: "PUT",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newCard)
    })
}

export function getCards() {
    return fetch(`${API}`, {
        method: "GET",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
}

// export const API = 'https://ajax.test-danit.com/api/cards';
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