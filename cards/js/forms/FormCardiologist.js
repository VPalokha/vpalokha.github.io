import Input from "./Input.js"
import TextArea from "./TextArea.js"
import {fieldsForm} from "./FieldsForm.js"
import Form from "./Form.js"

export default class FormCardiologist extends Form {
   constructor(doctor) {
      super(doctor);
      this.pressure = new Input(fieldsForm.pressure, "form__input").create();
      this.weightIndex = new Input(fieldsForm.weightIndex, "form__input").create();
      this.heartIllness = new TextArea(fieldsForm.illness, "form__input").create();
      this.age = new Input(fieldsForm.age, "form__input").create();
   }

   render(modal) {
      super.render(modal);
      const nodes = [this.pressure, this.weightIndex, this.heartIllness, this.age];
      nodes.forEach(node => {
         this.self.insertBefore(node, this.submit);
      })
   }
}