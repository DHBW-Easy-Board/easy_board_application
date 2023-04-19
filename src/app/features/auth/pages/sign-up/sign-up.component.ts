import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { supabase } from 'src/env/supabase';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
    // Customization
    public companyBrand = 'EasyBoard'

    // Form with validators
    public signUpForm = new FormGroup({
        email: new FormControl('', [
            Validators.required,
            Validators.email
        ]),
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!$%&()?*_])/)
        ]),
        confirmPassword: new FormControl('', [
            Validators.required
        ])
    }, { validators: this.checkPassword });

    constructor (private router: Router, private snackbar: MatSnackBar) { }

    async ngOnInit() {
        // Navigate to dashboard if user is already signed in
        const response = await supabase.auth.getUser();
        
        if (response.data.user?.role === 'authenticated')
            this.router.navigate(['app/dashboard']);
    }

    // Getters for the form data for easier access in the template
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
     * Signs up the user.
     * 
     * @returns Promise<void>
     */
    public async signUp(): Promise<void> {
        if (this.email?.errors || this.password?.errors || this.confirmPassword?.errors)
            return;

        if (!this.email?.value || !this.password?.value || !this.confirmPassword?.value)
            return;

        const response = await supabase.auth.signUp({
            email: this.email.value,
            password: this.password.value
        });
        
        if (response.error) {
            this.snackbar.open(response.error.message, 'Close');
            return;
        }
        
        this.router.navigate(['app/dashboard']);
    }
}
