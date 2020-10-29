import {getCards} from "./modal/ajax.js";
import {VisitCardiologist, VisitDentist, VisitTherapist} from "./cards/Visit.js";

const container = document.getElementById("container");

export function search(formContainer, visitContainer) {

   const searchWrap = document.createElement('form');
   const searchInput = document.createElement('input');
   const doctorInput = document.createElement('select');
   const doctorInput1 = document.createElement('option');
   const doctorInput2 = document.createElement('option');
   const doctorInput3 = document.createElement('option');
   const doctorInput4 = document.createElement('option');
   const priorityInput = document.createElement('select');
   const priorityInput1 = document.createElement('option');
   const priorityInput2 = document.createElement('option');
   const priorityInput3 = document.createElement('option');
   const priorityInput4 = document.createElement('option');
   const buttonInput = document.createElement('input');

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

   searchWrap.addEventListener('submit', (e) => {
      e.preventDefault();
      getAndRender();
   });
   searchWrap.append(searchInput, doctorInput, priorityInput, buttonInput);
   formContainer.prepend(searchWrap);

   function getAndRender() {
      visitContainer.innerText = "";
      const visits = getVisits(); // получить данные с сервера и преобразовать их в массив готовых для рендера объектов
      visits.then(cards => {
         let cardsSearch = cards.filter(visit => {
            if (visit) {
               let searchContent = visit.purpose + " " + visit.fullName;
               if (searchContent.toLowerCase().includes(searchInput.value.toLowerCase()))
                  if (doctorInput.value === "Выберите доктора" && priorityInput.value === "Выберите срочность")
                     return true;
                  else
                     return (doctorInput.value === visit.doctor && priorityInput.value === visit.priority) || (doctorInput.value === "Выберите доктора" && priorityInput.value === visit.priority) || (priorityInput.value === "Выберите срочность" && doctorInput.value === visit.doctor);
            }
         });
         cardsSearch.forEach((item) => item.render(visitContainer));
      })
   }

   buttonInput.addEventListener('click', (e) => {
      getAndRender();
   })
}

// получаем данные с существующими визитами с сервера
export function getVisits() {
   return getCards().then(c => c.json())
      .then(visits => {
         if (visits !== undefined) {
// помещаем карточки визитов в нужный массив
            return visits.map(visit => {
               if (visit.content.doctor === "Стоматолог") {
                  return new VisitDentist(visit);
               } else if (visit.content.doctor === "Кардиолог") {
                  return new VisitCardiologist(visit);
               } else if (visit.content.doctor === "Терапевт") {
                  return new VisitTherapist(visit);
               }
            });
         }
      });
}