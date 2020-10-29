// класс для создания выпадающих елементов
export default class Select {
   constructor(optionsArr) {
      this.options = optionsArr;
      this.self = document.createElement("select");
      this.self.className = "form__select";
   }

   create() {
      this.options.forEach(opt => {
         const optionNode = document.createElement("option");
         optionNode.textContent = opt;
         this.self.append(optionNode);
      });
      return this.self;
   }
}
