import Input from "./Input.js"
import Form from "./Form.js"
import {fieldsForm} from "./FieldsForm.js"

export default class FormDentist extends Form {
   constructor(doctor) {
      super(doctor)
      this.lastDateVisit = new Input(fieldsForm.lastDateVisit, "form__input").create();
   }

   render(modal) {
      super.render(modal);
      this.self.insertBefore(this.lastDateVisit, this.submit);
   }
}