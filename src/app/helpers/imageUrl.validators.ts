import { AbstractControl } from '@angular/forms';

export function urlValidator(control: AbstractControl) {
    const regex = new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!%\$&'\(\)\*\+,;=.]+$/);
    if (!regex.test(control.value)) {
        return { urlValid: true };
    }
    return null;
}