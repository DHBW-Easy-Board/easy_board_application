import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { supabase } from 'src/env/supabase';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss']
})
export class UserDeleteComponent {
    constructor (private dialog: MatDialog, private snackbar: MatSnackBar, private router: Router) {}
    
    /**
     * Delete account.
     */
    public async deleteAccount() {
        const user = await supabase.auth.getUser();

        if (user.error) {
            this.snackbar.open('An error occured. Please try again later.', 'Ok');
            return;
        }

        const response = await supabase.rpc('delete_user_fc', {
            in_user_id: user.data.user?.id
        });

        if (response.error) {
            this.snackbar.open('An error occured. Please try again later.', 'Ok');
            return;
        }

        localStorage.clear();
        this.dialog.closeAll();
        this.router.navigate(['']);
    }
}
