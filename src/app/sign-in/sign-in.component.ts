import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
    // Form
    public signInForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl('')
    });

    // Getters for the form data for easier access in the template
    get email() { return this.signInForm.get('email'); }
    get password() { return this.signInForm.get('password'); }

    /**
     * Sign ins the user.
     * 
     * @returns Promise<void>
     */
    public async signIn(): Promise<void> {
        alert('Sign in!');
    }
}
