export default class Input {
   constructor({type, placeholder, isRequired}, className) {
      this.type = type;
      this.placeholder = placeholder;
      this.isRequired = isRequired;
      this.className = className;
      this.self = document.createElement("input");
   }

   create() {
      this.self.type = this.type;
      if (this.isUsed(this.placeholder)) {
         this.self.placeholder = this.placeholder;
         this.self.required = this.isRequired;
      }
      this.self.classList.add(this.className);
      return this.self;
   }

   isUsed(prop) {
      return !(prop === null || prop === undefined || prop === "");
   }
}