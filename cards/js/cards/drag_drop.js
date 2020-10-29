"use strict";

var container = document.getElementById("container");
container.addEventListener("dragstart", function (evt) {
  evt.target.classList.add("selected");
});
container.addEventListener("dragend", function (evt) {
  evt.target.classList.remove("selected");
});
container.addEventListener("dragover", function (evt) {
  // Разрешаем сбрасывать элементы в эту область
  evt.preventDefault(); // Находим перемещаемый элемент

  var activeElement = container.querySelector(".selected"); // Находим элемент, над которым в данный момент находится курсор

  var currentElement = evt.target; // Проверяем, что событие сработало:
  // 1. не на том элементе, который мы перемещаем,
  // 2. именно на элементе списка

  var isMoveable = activeElement !== currentElement && currentElement.classList.contains("visit"); // Если нет, прерываем выполнение функции

  if (!isMoveable) {
    return;
  } // Находим элемент, перед которым будем вставлять


  var nextElement = currentElement === activeElement.nextElementSibling ? currentElement.nextElementSibling : currentElement; // Вставляем activeElement перед nextElement

  container.insertBefore(activeElement, nextElement);
});