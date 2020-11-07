import Input from "./Input.js"
import Form from "./Form.js"
import {fieldsForm} from "./FieldsForm.js"

export default class FormTherapist extends Form {
   constructor(doctor) {
      super(doctor)
      this.age = new Input(fieldsForm.age, "form__input").create();
   }

   render(modal) {
      super.render(modal);
      this.self.insertBefore(this.age, this.submit);
   }
}