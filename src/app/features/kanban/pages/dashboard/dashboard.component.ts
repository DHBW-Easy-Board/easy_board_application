import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Board } from 'src/app/core/models/board.model';
import { SlideService } from 'src/app/shared/services/slide.service';
import { supabase } from 'src/env/supabase';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public boards: Board[] = [];

    // Inject slide service to emit open slide events
    // Inject router to redirect for test purposes
    constructor (private slideService: SlideService, private router: Router) { }

    ngOnInit() {
        this.getBoards();
    }

    /**
     * ToDo - Refactor
     * Get all boards from the user.
     */
    public async getBoards() {
        await supabase.auth.getUser()
            .then((response) => {
                response.data.user?.id

                supabase.from('board_ov_auth_vw')
                    .select('*')
                    .order('board_modify_ts', { ascending: false })
                    .then((response) => {
                        if (response.error)
                            return;

                        this.boards = response.data as Board[];
                    });
            });
    }

    /**
     * Opens create board slide.
     */
    public openCreateBoard() {
        this.slideService.openSlide()
    }
}
