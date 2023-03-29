import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { supabase } from 'src/env/supabase';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
    public signInFailed = false;
    public errorMsg = '';

    // Form
    public signInForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl('')
    });

    // Inject router to redirect after successful sign in
    constructor (private router: Router) { }

    // Navigate to dashboard if user is already signed in
    async ngOnInit() {
        await supabase.auth.getUser()
        .then((response) => {
            if (response.data.user?.aud === 'authenticated')
                this.router.navigate(['dashboard']);
        })
    }

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

        await supabase.auth.signInWithPassword({
            email: this.email.value,
            password: this.password.value
        }).then((response) => {
            if (response.error === null) {
                this.router.navigate(['dashboard']);
            } else {
                this.signInFailed = true;
                this.errorMsg = response.error.message;
                this.email!.setErrors({ failed: true });
                this.password!.setErrors({ failed: true });
            }
        });
    }
}
