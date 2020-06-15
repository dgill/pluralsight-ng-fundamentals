import { Validator, FormGroup, NG_VALIDATORS } from '@angular/forms'
import { Directive } from '@angular/core'

@Directive({
    selector: '[validateLocation]',
    providers: [{provide: NG_VALIDATORS, useExisting: LocationValidator, multi: true}]
})

export class LocationValidator implements Validator {
    validate(formGroup: FormGroup): { [key: string]: any }   {
        const addressControl = formGroup.controls['address']
        const cityControl = formGroup.controls['city']
        const countryControl = formGroup.controls['country']
        const onlineUrlControl = (<FormGroup>formGroup.root).controls['onlineUrl']

        console.log((<FormGroup>formGroup.root).controls.onlineUrl)
        console.log(onlineUrlControl)

        if ((addressControl && addressControl.value && cityControl && cityControl.value && countryControl && countryControl.value) || (onlineUrlControl && onlineUrlControl.value)) {
            console.log(formGroup)
            return null
        } else {
            console.log('failed to validate')
            return {validateLocation: false}
        }

    }
}
