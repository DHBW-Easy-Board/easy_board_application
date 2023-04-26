import { AbstractControl, Form, FormControl, ValidationErrors, Validators } from "@angular/forms"

export const emailFormControl = () : FormControl => {
    return new FormControl('', [
        Validators.required,
        Validators.email
    ]);
}

export const passwordFormControl = () : FormControl => {
    return new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!$%&()?*_])/)
    ]);
}

export const confirmPasswordFormControl = () : FormControl => {
    return new FormControl('', [
        Validators.required
    ]);
}

/**
     * Custom validator.
     * Compares if the password value matches the confirmPassword value.
     * 
     * @param control 
     * @returns ValidationErrors | null
     */
export const checkPassword = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    // Set the error on the FormControl element to display the error message 
    if (password !== confirmPassword)
        control.get('confirmPassword')?.setErrors({ passwordUnconfirmed: true });

    return password === confirmPassword ? null : { passwordUnconfirmed: true };
}