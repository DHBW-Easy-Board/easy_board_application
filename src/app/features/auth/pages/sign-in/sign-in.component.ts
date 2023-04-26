import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { supabase } from 'src/env/supabase';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
    // Form
    public signInForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl('')
    });

    constructor (private router: Router, private snackbar: MatSnackBar) { }

    async ngOnInit() {
        // Navigate to dashboard if user is already signed in
        const response = await supabase.auth.getUser();
        
        if (response.data.user?.role === 'authenticated')
            this.router.navigate(['app/dashboard']);
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

        const response = await supabase.auth.signInWithPassword({
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
