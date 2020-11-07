import { getCards } from "../modal/ajax.js";
import {VisitCardiologist, VisitDentist, VisitTherapist } from "./Visit.js";

// Функция для отрисовки карточек визитов, находящихся в сервере
export function renderCards(container) {

    // получение массива визитов с сервера
    getCards().then(c => c.json())

        .then(arrVisitsFromServer => {
            // console.log(visits);

            // Вывод сообщения, если визиты не запланированы
            if (arrVisitsFromServer.length === 0) {
                const noItem = document.createElement('p');
                noItem.innerText = "No item has been added";
                noItem.id = "empty";
                container.append(noItem);
            } else {

                // Создание массива карточек
                let visitsObjects = arrVisitsFromServer.map(visit => {
                    if (visit.content.doctor === "Стоматолог") {

                        const visitCard = new VisitDentist(visit);

                        // отрисовка карточки в ДОМе
                        visitCard.render(container);
                        return visitCard;
                    } else if (visit.content.doctor === "Кардиолог") {
                        const visitCard = new VisitCardiologist(visit);
                        visitCard.render(container);
                        return visitCard;
                    } else if (visit.content.doctor === "Терапевт") {
                        const visitCard = new VisitTherapist(visit);
                        visitCard.render(container);
                        return visitCard;
                    }
                });
                return visitsObjects;
            }
        });
}