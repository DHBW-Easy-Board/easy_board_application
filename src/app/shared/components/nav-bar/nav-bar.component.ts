import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { supabase } from 'src/env/supabase';
import { Router, RouterModule } from '@angular/router';
import { Board } from 'src/app/core/models/board.model';
import { SlideService } from '../../services/slide.service';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { signOut } from 'src/app/core/utils/user.actions';

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
    MatSnackBarModule,
    MatToolbarModule,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
    public latestBoards: Board[] = [];

    // Customization
    public logoUrl: string = 'assets/img/logo.png';

    // Inject slide service to emit open slide events
    constructor(private slideService: SlideService, private router: Router, private snackbar: MatSnackBar) { }

    ngOnInit() {
        this.getLatestBoards();
    }

    /**
     * Get all the latest boards from the user.
     */
    private async getLatestBoards() {
        const response = await supabase.from('board_ov_auth_vw')
            .select('*')
            .limit(3)
            .order('board_modify_ts', { ascending: false });

        if (response.error) {
            this.snackbar.open('An error occurred. Please try again later.', 'Close');
            return;
        }

        this.latestBoards = response.data as Board[];
    }

    /**
     * Opens create board slide.
     */
    public openCreateBoard() {
        this.slideService.openSlide()
    }

    public signOut() {
        return signOut(this.router);
    }
}
