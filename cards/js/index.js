import {search} from "./search.js";
import {renderCards} from "./cards/cards.js";
import {token} from "./modal/ModalLogIN.js";

const container = document.getElementById("container");
const formContainer = document.querySelector(".section");

if (token) {
  renderCards(container);
}

search(formContainer, container);