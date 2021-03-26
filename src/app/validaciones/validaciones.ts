import { FormControl, ValidationErrors } from "@angular/forms";

export class NombreClase {

    static soloLetras(control: FormControl): ValidationErrors{
        return null;
    }
    constructor() {
    
    }
}