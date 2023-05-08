import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { supabase } from 'src/env/supabase';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss']
})
export class UserDeleteComponent {
    constructor (private snackbar: MatSnackBar) {}
    
    /**
     * Delete account.
     */
    public async deleteAccount() {
        const user = await supabase.auth.getUser();

        if (user.error) {
            this.snackbar.open('An error occured. Please try again later.', 'Ok');
        }

        const response = await supabase.rpc('delete_user_fc', {
            in_user_id: user.data.user?.id
        });
        
        console.log(response);
    }
}
