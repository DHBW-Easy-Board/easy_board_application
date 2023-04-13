import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from '@supabase/supabase-js';
import { checkPassword, confirmPasswordFormControl, emailFormControl, passwordFormControl } from 'src/app/core/utils/input.validation';
import { supabase } from 'src/env/supabase';

interface DialogData {
  // define the properties of DialogData here
  type: string;
}

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<EditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private router: Router) {}
  currentUser: User | undefined;

  public errorMsg = '';
  public operationFailed = false;

  async ngOnInit(): Promise<void> {
    await supabase.auth.getUser()
    .then((response) => {
      if (response.data.user?.aud === 'authenticated')
        this.currentUser = response.data.user;
    });
  }

  public passwordForm = new FormGroup({
    password: passwordFormControl(),
    confirmPassword: confirmPasswordFormControl(),
  } , { validators: checkPassword });

  public emailForm = new FormGroup({
    email: emailFormControl()
  });

  get email() { return this.emailForm.get('email'); }
  get password() { return this.passwordForm.get('password'); }
  get confirmPassword() { return this.passwordForm.get('confirmPassword'); }

  /**
     * Change user email.
     * 
     * @returns Promise<void>
     */
  public async changeEmail(): Promise<void> {
    if (this.email?.errors || !this.email?.value)
      return;

    await supabase.auth.updateUser({
      email: this.email.value
    }).catch((error) => {
      this.operationFailed = true;
      this.errorMsg = error;
    });

    if (this.operationFailed == false)
      this.signOut
  }

  /**
     * Change password of user.
     * 
     * @returns Promise<void>
     */
  public async changePassword(): Promise<void> {
    if (this.password?.errors || this.confirmPassword?.errors)
        return;

    if (!this.password?.value || !this.confirmPassword?.value)
        return;

    // if (this.currentUser?.email == undefined)
    //   return;
  
    // await supabase.auth.resetPasswordForEmail(this.currentUser.email)

    await supabase.auth.updateUser({
      password: this.password.value
    }).catch((error) => {
      this.operationFailed = true;
      this.errorMsg = error;
    });

    if (this.operationFailed == false)
      this.signOut
  }

  public async signOut() {
    await supabase.auth.signOut()
        .then((response) => {
            if (response.error === null) {
                this.router.navigate(['']);
            } else {
                console.log(response);
            }
        });
}
}
