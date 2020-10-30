const container = document.getElementById("container");

container.addEventListener(`dragstart`, (evt) => {
  evt.target.classList.add(`selected`);
});

container.addEventListener(`dragend`, (evt) => {
  evt.target.classList.remove(`selected`);
});

container.addEventListener(`dragover`, (evt) => {
  // Разрешаем сбрасывать элементы в эту область
  evt.preventDefault();

  // Находим перемещаемый элемент
  const activeElement = container.querySelector(`.selected`);
  // Находим элемент, над которым в данный момент находится курсор
  const currentElement = evt.target;
  // Проверяем, что событие сработало:
  // 1. не на том элементе, который мы перемещаем,
  // 2. именно на элементе списка
  const isMoveable = activeElement !== currentElement &&
    currentElement.classList.contains(`visit`);

  // Если нет, прерываем выполнение функции
  if (!isMoveable) {
    return;
  }

  // Находим элемент, перед которым будем вставлять
  const nextElement = (currentElement === activeElement.nextElementSibling) ?
    currentElement.nextElementSibling :
    currentElement;

  // Вставляем activeElement перед nextElement
  container.insertBefore(activeElement, nextElement);
});
