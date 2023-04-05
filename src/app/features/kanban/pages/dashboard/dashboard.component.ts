import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { supabase } from 'src/env/supabase';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    // Various tests
    public email: string | undefined;
    public boards = [
        {
            id: 1,
            name: "Board A",
            lastUpdated: '01.01.2023'
        },
        {
            id: 2,
            name: "Board B",
            lastUpdated: '02.02.2023'
        },
        {
            id: 3,
            name: "Board C",
            lastUpdated: '03.03.2023'
        },
        {
            id: 4,
            name: "Board D",
            lastUpdated: '04.04.2023'
        },
    ];

    constructor (private router: Router) { }

    /**
     * ToDo
     * Create a new board.
     */
    public createBoard() {
        alert('ToDo');
    }

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
