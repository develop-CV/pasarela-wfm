import { AbstractControl } from "@angular/forms";

export class validaciones{
    static esMenor(control: AbstractControl){
        const value = control.value;
        if (value < 18){
            return {esMenor: true};
        }
        return true;    // El campo esta OK. Se retorna NULL
    }

    static esIgual(value: string){
        return (control: AbstractControl) => {
            if (control.parent?.value[value] !== control.value){
                return {esIgual: false};
            }
            return null;
            
        }
    }
}