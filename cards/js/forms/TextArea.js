export default class TextArea {
   constructor({placeholder, isRequired}, className) {
      this.placeholder = placeholder;
      this.isRequired = isRequired;
      this.className = className;
      this.self = document.createElement("textarea");
   }

   create() {
      this.self.placeholder = this.placeholder;
      this.self.required = this.isRequired;
      this.self.classList.add(this.className);
      return this.self;
   }
}