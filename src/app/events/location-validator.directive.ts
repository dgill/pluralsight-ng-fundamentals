import { Validator, FormGroup, NG_VALIDATORS } from '@angular/forms';
import { Directive } from '@angular/core';

@Directive({
    selector: '[validateLocation]',
    providers: [{provide: NG_VALIDATORS, useExisting: LocationValidator, multi:true}]
})

export class LocationValidator implements Validator {
    validate(formGroup: FormGroup): { [key: string]: any }   {
        let addressControl = formGroup.controls['address']
        let cityControl = formGroup.controls['city']
        let countryControl = formGroup.controls['country']
        let onlineUrlControl = (<FormGroup>formGroup.root).controls['onlineUrl']

        console.log((<FormGroup>formGroup.root).controls.onlineUrl)
        console.log(onlineUrlControl)

        if ((addressControl&& addressControl.value && cityControl && cityControl.value && countryControl && countryControl.value) || (onlineUrlControl && onlineUrlControl.value))
        {
            console.log(formGroup)
            return null
        }
        else { 
            console.log("failed to validate")
            return {validateLocation: false} 
        }

    }
}