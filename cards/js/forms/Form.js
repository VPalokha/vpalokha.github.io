import Input from "./Input.js"
import TextArea from "./TextArea.js"
import {fieldsForm} from "./FieldsForm.js"
import Select from "./Select.js";
import {createCard, editCard} from "../modal/ajax.js";
import {VisitDentist, VisitCardiologist, VisitTherapist} from "../cards/Visit.js";

export default class Form {
   constructor(doctor) {
      this.self = document.createElement("form");
      this.doctor = doctor;
      this.priority = new Select(fieldsForm.priority).create();
      this.fullName = new Input(fieldsForm.fullName, "form__input").create();
      this.purpose = new Input(fieldsForm.purpose, "form__input").create();
      this.desc = new TextArea(fieldsForm.desc, "form__input").create();
      this.submit = new Input(fieldsForm.submit, "form__submit").create();
      this.submit.value = "Сохранить визит";
   }

   render(modal) {
      this.self.classList.add("form");
      this.submit.addEventListener("click", async (event) => {
         event.preventDefault();
         const newCardOut = this.collectData(),
            modal = document.querySelector(".header__modalWrapper");
         if (this.isDataFilled(newCardOut)) {
            if (!modal.dataset.id) {
               const newCardIn = await createCard(newCardOut).then(r => r.json());
               this.submitForm(newCardIn, modal);
            } else {
               const editedCard = await editCard(newCardOut, modal.dataset.id).then(r => r.json());
               this.submitEdit(editedCard, modal);
            }
         }
      });
      this.self.append(this.priority, this.fullName, this.purpose, this.desc, this.submit);
      modal.append(this.self);
   }

   collectData() {
      const data = {};
      for (let key in this) {
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

   isDataFilled(objectToCheck) {
      for (let key in objectToCheck) {
         if (objectToCheck[key] === undefined || objectToCheck[key] === null || objectToCheck[key] === ""
            || objectToCheck[key] === "Выберите срочность") {
            console.error(`Missing property ${key}`)
            return false;
         }
      }
      return true;
   }

   submitForm(newCardIn, modal) {
      const noItem = document.getElementById("empty");
      if (noItem) {
         noItem.remove();
      }
      if (newCardIn.doctor === "Кардиолог") {
         const visit = new VisitCardiologist(newCardIn);
         visit.render(document.getElementById("container"));
         modal.remove();
      } else if (newCardIn.doctor === "Стоматолог") {
         const visit = new VisitDentist(newCardIn);
         visit.render(document.getElementById("container"));
         modal.remove();
      } else if (newCardIn.doctor === "Терапевт") {
         const visit = new VisitTherapist(newCardIn);
         visit.render(document.getElementById("container"));
         modal.remove();
      }
      location.reload();
   }

   submitEdit(newCardIn, modal) {
      const existCard = [...document.querySelectorAll(".visit")].filter(visit => {
            if (visit.dataset.id === modal.dataset.id) {
               return visit;
            }
         })[0],
         parent = document.getElementById("container");
      if (newCardIn.doctor === "Кардиолог") {
         const visit = new VisitCardiologist(newCardIn),
            visitNode = visit.render();
         parent.replaceChild(visitNode, existCard);
         modal.remove();
      } else if (newCardIn.doctor === "Стоматолог") {
         const visit = new VisitDentist(newCardIn),
            visitNode = visit.render();
         parent.replaceChild(visitNode, existCard);
         modal.remove();
      } else if (newCardIn.doctor === "Терапевт") {
         const visit = new VisitTherapist(newCardIn),
            visitNode = visit.render();
         parent.replaceChild(visitNode, existCard);
         modal.remove();
      }
      location.reload();
   }
}