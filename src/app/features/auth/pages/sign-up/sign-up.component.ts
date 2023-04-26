import { Component, OnInit } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { checkPassword, confirmPasswordFormControl, emailFormControl, passwordFormControl } from 'src/app/core/utils/input.validation';
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
        email: emailFormControl(),
        password: passwordFormControl(),
        confirmPassword: confirmPasswordFormControl(),
    }, { validators: checkPassword });

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
