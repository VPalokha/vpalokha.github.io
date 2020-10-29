// создаем объект полей формы с плейсхолдерами
export const fieldsForm = {
   fullName: {
      type: "text",
      placeholder: "ФИО",
      isRequired: true,
   },
   purpose: {
      type: "text",
      placeholder: "Цель визита",
      isRequired: true
   },
   desc: {
      placeholder: "Краткое описание визита",
      isRequired: true
   },
   pressure: {
      type: "text",
      placeholder: "Обычное давление",
      isRequired: true
   },
   weightIndex: {
      type: "text",
      placeholder: "Индекс массы тела",
      isRequired: true
   },
   illness: {
      placeholder: "Перенесенные заболевания сердечно-сосудистой системы",
      isRequired: true
   },
   age: {
      type: "text",
      placeholder: "Возраст",
      isRequired: true
   },
   lastDateVisit: {
      type: "text",
      placeholder: "Дата последнего визита",
      isRequired: true
   },
   submit: {
      type: "submit"
   },
   priority: [
      "Выберите срочность",
      "Обычная",
      "Приоритетная",
      "Неотложная"
   ]
}