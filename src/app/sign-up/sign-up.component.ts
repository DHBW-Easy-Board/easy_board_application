import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { supabase } from 'src/env/supabase';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
    // Form with validators
    public signUpForm = new FormGroup({
        name: new FormControl('', [
            Validators.required
        ]),
        email: new FormControl('', [
            Validators.required,
            Validators.email
        ]),
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(8)
        ]),
        confirmPassword: new FormControl('', [
            Validators.required
        ])
    }, { validators: this.checkPassword });

    // Getters for the form data for easier access in the template
    get name() { return this.signUpForm.get('name'); }
    get email() { return this.signUpForm.get('email'); }
    get password() { return this.signUpForm.get('password'); }
    get confirmPassword() { return this.signUpForm.get('confirmPassword'); }

    /**
     * Custom validator.
     * Compares if the password value matches the confirmPassword value.
     * 
     * @param control 
     * @returns ValidationErrors | null
     */
    private checkPassword(control: AbstractControl): ValidationErrors | null {
        const password = control.get('password')?.value;
        const confirmPassword = control.get('confirmPassword')?.value;

        // Set the error on the FormControl element to display the error message 
        if (password !== confirmPassword)
            control.get('confirmPassword')?.setErrors({ passwordUnconfirmed: true });

        return password === confirmPassword ? null : { passwordUnconfirmed: true };
    }

    /**
     * Sign ups the user.
     * 
     * @returns Promise<void>
     */
    public async signUp(): Promise<void> {        
        if (this.name?.errors || this.email?.errors || this.password?.errors || this.confirmPassword?.errors)
            return;

        if (!this.name?.value || !this.email?.value || !this.password?.value || !this.confirmPassword?.value)
            return;

        let response = await supabase.auth.signUp({
            email: this.email.value,
            password: this.password.value
        });

        console.log(response);
        if (response.error === null) {
            alert('Signed up successfully!');
        }
    }
}
