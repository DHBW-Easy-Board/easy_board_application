import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { supabase } from 'src/env/supabase';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
    public signInFailed = false;
    public errorMsg = '';

    // Form
    public signInForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl('')
    });

    // Getters for the form data for easier access in the template
    get email() { return this.signInForm.get('email'); }
    get password() { return this.signInForm.get('password'); }

    /**
     * Signs in the user.
     * 
     * @returns Promise<void>
     */
    public async signIn(): Promise<void> {
        if (!this.email?.value || !this.password?.value)
            return;

        let response = await supabase.auth.signInWithPassword({
            email: this.email.value,
            password: this.password.value
        });

        console.log(response);
        if (response.error === null) {
            alert('Signed in successfully!');
        } else {
            this.signInFailed = true;
            this.errorMsg = response.error.message;
            this.email.setErrors({ failed: true });
            this.password.setErrors({ failed: true });
        }
    }
}
