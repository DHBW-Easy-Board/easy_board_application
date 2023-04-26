import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Board } from 'src/app/core/models/board.model';
import { SlideService } from 'src/app/shared/services/slide.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { supabase } from 'src/env/supabase';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public boards: Board[] = [];

    constructor (private router: Router, private slideService: SlideService, private snackbar: MatSnackBar) { }

    ngOnInit() {
        this.getBoards();
    }

    /**
     * Get all boards from the user.
     */
    public async getBoards() {
        const response = await supabase.from('board_ov_auth_vw')
            .select('*')
            .order('board_modify_ts', { ascending: false });

        if (response.error) {
            this.snackbar.open('An error occurred. Please try again later.', 'Close');
            return;
        }

        this.boards = response.data as Board[];
    }

    /**
     * Opens create board slide.
     */
    public openCreateBoard() {
        this.slideService.openSlide()
    }
}
