import Input from "./Input.js"
import Form from "./Form.js"
import {fieldsForm} from "./FieldsForm.js"

export default class FormTherapist extends Form {
   constructor(doctor,purpose, desc, priority, age, id,pressure, weightIndex, heartIllness, fullName, lastDateVisit) {
      super(doctor, fullName, priority, purpose, desc)
      this.age = new Input(fieldsForm.age, "form__input").create();
      this.placeholderForEdit(age, this.age, 'Измените/подтвердите возраст:' )
   }

   render(modal) {
      super.render(modal);
      this.self.insertBefore(this.age, this.submit);
   }
}