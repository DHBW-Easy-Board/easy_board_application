import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { supabase } from 'src/env/supabase';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public email: string | undefined;

    constructor (private router: Router) { }

    // Test if sign in was successful
    async ngOnInit() {
        await supabase.auth.getUser()
            .then((response) => {
                this.email = response.data.user?.email;
            });
    }

    // Test sign out
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
