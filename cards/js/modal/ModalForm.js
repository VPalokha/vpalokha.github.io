import FormDentist from "../forms/FormDentist.js";
import FormTherapist from "../forms/FormTherapist.js";
import FormCardiologist from "../forms/FormCardiologist.js";
import Select from "../forms/Select.js";
import Modal from "./Modal.js";

// Модифицируем модальную форму для выбора врача
export default class ModalForm extends Modal {
    constructor() {
        super();
        debugger
        this.doctor = new Select(["Выберите врача", "Кардиолог", "Стоматолог", "Терапевт"]).create();
    }

// Отрисовываем мобальную форму, плюс обработчик на селектор выбора врача
    render() {
        super.render();

        this.doctor.addEventListener("change", (event) => {
            this.selectForm(event);
        });

        this.element.btnSubmit.remove();
        this.element.modalWindow.insertBefore(this.doctor, this.element.btnClose);
    }

// Проверка на существование открытой формы по другому врачу, если есть, удаляется, после этого отрисовывается форма по выбранному врачу
    checkAndPutForm(newForm, existForm) {
        if (existForm) {
            this.element.modalWindow.removeChild(existForm);
            newForm.render(this.element.modalWindow);
        } else {
            newForm.render(this.element.modalWindow);
        }
    }

// Функция присваивания  класса формы по выбранному врачу
    selectForm(event) {
        const exist = this.element.modalWindow.children[2];

        if (event.target.value === "Кардиолог") {
            const form = new FormCardiologist(event.target.value);
            this.checkAndPutForm(form, exist);
        } else if (event.target.value === "Стоматолог") {
            const form = new FormDentist(event.target.value);
            this.checkAndPutForm(form, exist);
        } else if (event.target.value === "Терапевт") {
            const form = new FormTherapist(event.target.value);
            this.checkAndPutForm(form, exist);
        }
    }

    edit(doctor, purpose, desc, priority, age, id, pressure, weightIndex, heartIllness, fullName, lastDateVisit) {
        const exist = this.element.modalWindow.children[2];


        if (doctor === "Кардиолог") {
            const form = new FormCardiologist(doctor, purpose, desc, priority, age, id, pressure, weightIndex, heartIllness, fullName);
            this.checkAndPutForm(form, exist);
        } else if (doctor === "Стоматолог") {
            const form = new FormDentist(doctor, purpose, desc, priority, age, id, pressure, weightIndex, heartIllness, fullName, lastDateVisit);
            this.checkAndPutForm(form, exist);
        } else if (doctor === "Терапевт") {
            const form = new FormTherapist(doctor, purpose, desc, priority, age, id, pressure, weightIndex, heartIllness, fullName, lastDateVisit);
            this.checkAndPutForm(form, exist);
        }
    }

    ifEditModal(id) {
        this.element.modalWindow.dataset.id = id;
        this.element.modalWrapper.dataset.id = id;
    }
}

// Обработчик клика на кнопку СОЗДАТЬ, запускает создание модальной формы
const btn = document.querySelector(".header__btn-create");
btn.addEventListener("click", () => {

    const modal = new ModalForm();
    modal.render();
});