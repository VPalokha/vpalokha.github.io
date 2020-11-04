import ModalForm from "../modal/ModalForm.js";
import {deleteCard} from "../modal/ajax.js";

//Создание основого класса карточек
export class Visit {
    constructor(visit) {
        this.id = visit.id;
        this.doctor = visit.content.doctor;
        this.purpose = visit.content.purpose;
        this.desc = visit.content.desc;
        this.priority = visit.content.priority;
        this.fullName = visit.content.fullName;
        this.elem = {
            self: document.createElement("div"),
            fullName: document.createElement("h3"),
            doctor: document.createElement("span"),
            priority: document.createElement("span"),
            purpose: document.createElement("span"),
            desc: document.createElement("p"),
            showMoreBtn: document.createElement("button"),
            hideBtn: document.createElement("button"),
            editBtn: document.createElement("button"),
            deleteBtn: document.createElement("button")
        };
    }

    //Отображение карточек на главной странице
    render(parent) {
        this.elem.fullName.textContent = this.fullName;
        this.elem.doctor.textContent = `Доктор: ${this.doctor}`;
        this.elem.priority.textContent = `Срочность: ${this.priority}`;
        this.elem.purpose.textContent = `Цель визита: ${this.purpose}`;
        this.elem.desc.textContent = `Краткое описание визита: ${this.desc}`;
        this.elem.showMoreBtn.textContent = "Показать";
        this.elem.hideBtn.textContent = "Скрыть";
        this.elem.hideBtn.style.display = 'none';
        this.elem.editBtn.textContent = "Редактировать";
        this.elem.deleteBtn.textContent = "X";

        this.elem.self.classList.add("visit");
        this.elem.fullName.classList.add("visit__head");
        this.elem.doctor.classList.add("visit__text");
        this.elem.priority.classList.add("visit__text");
        this.elem.purpose.classList.add("visit__text");
        this.elem.desc.classList.add("visit__text");
        this.elem.showMoreBtn.classList.add("visit__btn");
        this.elem.hideBtn.classList.add("visit__btn");
        this.elem.editBtn.classList.add("visit__btn-edit");
        this.elem.deleteBtn.classList.add("visit__btn-delete");

        this.elem.self.draggable = true;
        this.elem.self.dataset.id = this.id;

        //Кнопка редактирования карточки
        this.elem.editBtn.addEventListener("click", async (event) => {
            const form = new ModalForm();
            event.target.value = event.target.childNodes[0].outerText;
            form.ifEditModal(this.id);
            const {doctor, purpose, desc, priority, age, id, pressure, weightIndex, heartIllness, fullName, lastDateVisit} = this;
            form.edit(doctor, purpose, desc, priority, age, id, pressure, weightIndex, heartIllness, fullName, lastDateVisit);
            form.render();
            document.querySelectorAll(".form__select")[1].remove()
        });

        //Кнопка удаления карточки 
        this.elem.deleteBtn.addEventListener("click", async (event) => {
            const response = await deleteCard(this.id);

            if (response.status === "Success") {
                this.elem.self.remove();
                const renderedVisits = document.querySelectorAll(".visit");
                if (!renderedVisits || renderedVisits.length === 0) {
                    const noItem = document.createElement('p');
                    noItem.id = "empty";
                    noItem.textContent = "No item has been added";
                    parent.append(noItem);
                }
            }
            location.reload();
        });
        this.elem.self.append(this.elem.fullName, this.elem.doctor, this.elem.showMoreBtn, this.elem.hideBtn, this.elem.editBtn, this.elem.deleteBtn);
    }
}

//Дочерний класс Дантист
export class VisitDentist extends Visit {
    constructor(visit) {
        super(visit);
        this.lastDateVisit = visit.content.lastDateVisit;
    }

//Отрисовка Дантиста на главной странице
    render(parent) {
        super.render(parent);
        this.elem.lastDateVisit = document.createElement("span");

        this.elem.lastDateVisit.textContent = `Дата последнего визита: ${this.lastDateVisit}`;

        this.elem.lastDateVisit.classList.add("visit__text");

        this.elem.showMoreBtn.addEventListener("click", () => {
            this.showMore();
        });
        this.elem.hideBtn.addEventListener("click", () => {
            this.hide();
        });

        if (parent) {
            parent.append(this.elem.self);
        } else {
            return this.elem.self;
        }
    }

//Кнопка для отрисовки дополнительной информации Дантиста   
    showMore() {
        const moreInfo = [];

        for (let key in this.elem) {
            if (key === "purpose" || key === "desc" || key === "priority" || key === "lastDateVisit") {
                moreInfo.push(this.elem[key]);
            }
        }

        moreInfo.forEach(item => {
            this.elem.self.insertBefore(item, this.elem.showMoreBtn);
        });

        this.elem.showMoreBtn.style.display = 'none';
        this.elem.hideBtn.style.display = 'inline-block';
    }

//Кнопка для скрытия информации Дантиста
    hide() {
        this.elem.self.removeChild(this.elem.purpose);
        this.elem.self.removeChild(this.elem.desc);
        this.elem.self.removeChild(this.elem.priority);

        this.elem.self.removeChild(this.elem.lastDateVisit);
        this.elem.hideBtn.style.display = 'none';
        this.elem.showMoreBtn.style.display = 'inline-block';
    }
}

//Дочерний класс Терапевт 
export class VisitTherapist extends Visit {
    constructor(visit) {
        super(visit);
        this.age = visit.content.age;
    }

//Отрисовка Терапевта на главной странице
    render(parent) {
        super.render(parent);
        this.elem.age = document.createElement("span");

        this.elem.age.textContent = `Возраст: ${this.age}`;

        this.elem.age.classList.add("visit__text");

        this.elem.showMoreBtn.addEventListener("click", () => {
            this.showMore();
        });
        this.elem.hideBtn.addEventListener("click", () => {
            this.hide();
        });

        if (parent) {
            parent.append(this.elem.self);
        } else {
            return this.elem.self;
        }
    }

//Кнопка для отрисовки дополнительной информации Дантиста
    showMore() {
        const moreInfo = [];

        for (let key in this.elem) {
            if (key === "purpose" || key === "desc" || key === "priority" || key === "age") {
                moreInfo.push(this.elem[key]);
            }
        }

        moreInfo.forEach(item => {
            this.elem.self.insertBefore(item, this.elem.showMoreBtn);
        });

        // this.elem.self.removeChild(this.elem.showMoreBtn);
        this.elem.showMoreBtn.style.display = 'none';
        this.elem.hideBtn.style.display = 'inline-block';
    }

//Кнопка для скрытия информации Терапевта
    hide() {
        this.elem.self.removeChild(this.elem.purpose);
        this.elem.self.removeChild(this.elem.desc);
        this.elem.self.removeChild(this.elem.priority);
        this.elem.self.removeChild(this.elem.age);
        this.elem.hideBtn.style.display = 'none';
        this.elem.showMoreBtn.style.display = 'inline-block';
    }
}

//Дочерний класс Кардиолога 
export class VisitCardiologist extends Visit {
    constructor(visit) {
        super(visit);
        this.pressure = visit.content.pressure;
        this.weightIndex = visit.content.weightIndex;
        this.heartIllness = visit.content.heartIllness;
        this.age = visit.content.age;
    }

//Отрисовка Кардиолога на главной странице
    render(parent) {
        super.render(parent);
        this.elem.pressure = document.createElement("span");
        this.elem.weightIndex = document.createElement("span");
        this.elem.heartIllness = document.createElement("span");
        this.elem.age = document.createElement("span");

        this.elem.pressure.textContent = `Давление: ${this.pressure}`;
        this.elem.weightIndex.textContent = `Индекс массы тела: ${this.weightIndex}`;
        this.elem.heartIllness.textContent = `Ранее перенесенные заболевания сердца: ${this.heartIllness}`;
        this.elem.age.textContent = `Возраст: ${this.age}`;

        this.elem.pressure.classList.add("visit__text");
        this.elem.weightIndex.classList.add("visit__text");
        this.elem.heartIllness.classList.add("visit__text");
        this.elem.age.classList.add("visit__text");

        this.elem.showMoreBtn.addEventListener("click", () => {
            this.showMore();
        });
        this.elem.hideBtn.addEventListener("click", () => {
            this.hide();
        });

        if (parent) {
            parent.append(this.elem.self);
        } else {
            return this.elem.self;
        }
    }

//Кнопка для отрисовки дополнительной информации Кардиолога  
    showMore() {
        const moreInfo = [];

        for (let key in this.elem) {
            if (key === "purpose" || key === "desc" || key === "priority" || key === "pressure" || key === "weightIndex" || key === "heartIllness" || key === "age") {
                moreInfo.push(this.elem[key]);
            }
        }

        moreInfo.forEach(item => {
            this.elem.self.insertBefore(item, this.elem.showMoreBtn);
        });

        this.elem.showMoreBtn.style.display = 'none';
        this.elem.hideBtn.style.display = 'inline-block';
    }

//Кнопка для скрытия информации Кардиолого
    hide() {
        this.elem.self.removeChild(this.elem.purpose);
        this.elem.self.removeChild(this.elem.desc);
        this.elem.self.removeChild(this.elem.priority);
        this.elem.self.removeChild(this.elem.pressure);
        this.elem.self.removeChild(this.elem.weightIndex);
        this.elem.self.removeChild(this.elem.heartIllness);
        this.elem.self.removeChild(this.elem.age);
        this.elem.hideBtn.style.display = 'none';
        this.elem.showMoreBtn.style.display = 'inline-block';
    }
}

