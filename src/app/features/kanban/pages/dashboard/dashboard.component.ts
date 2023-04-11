import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Board } from 'src/app/core/models/board.model';
import { supabase } from 'src/env/supabase';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public boards: Board[] = [];

    constructor (private router: Router) { }

    ngOnInit() {
        this.getBoards();
    }

    /**
     * ToDo
     * Get all boards from the user.
     */
    public async getBoards() {
        await supabase.auth.getUser()
            .then((response) => {
                response.data.user?.id

                supabase.from('board_ov_vw')
                    .select('*')
                    .eq('owner_id', response.data.user?.id)
                    .order('board_modify_ts', { ascending: false })
                    .then((response) => {
                        if (response.error)
                            return;

                        this.boards = response.data as Board[];
                    });
            });
    }

    /**
     * ToDo
     * Create a new board.
     */
    public createBoard() {
        alert('ToDo');
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
