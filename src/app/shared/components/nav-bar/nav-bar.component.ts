import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { supabase } from 'src/env/supabase';
import { RouterModule } from '@angular/router';
import { Board } from 'src/app/core/models/board.model';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
    public latestBoards: Board[] = [];

    // Customization
    public logoUrl: string = 'assets/img/logo.png';

    ngOnInit() {
        this.getLatestBoards();
    }

    /**
     * ToDo - Refactor
     * Get all the latest boards from the user.
     */
    private async getLatestBoards() {
        await supabase.auth.getUser()
            .then((response) => {
                response.data.user?.id

                supabase.from('board_ov_vw')
                    .select('*')
                    .eq('owner_id', response.data.user?.id)
                    .limit(3)
                    .order('board_modify_ts', { ascending: false })
                    .then((response) => {
                        if (response.error)
                            return;

                        this.latestBoards = response.data as Board[];
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
}
