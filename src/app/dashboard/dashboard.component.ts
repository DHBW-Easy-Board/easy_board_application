import { Component } from '@angular/core';
import { supabase } from 'src/env/supabase';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
    public email: string | undefined;

    // Currently just for testing the supabase connection
    async ngOnInit() {
        await supabase.auth.getUser()
            .then((response) => {
                this.email = response.data.user?.email;
            })
    }
}
