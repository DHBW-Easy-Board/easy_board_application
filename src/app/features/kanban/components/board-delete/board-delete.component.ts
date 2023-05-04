import { Component, Input } from '@angular/core';
import { supabase } from 'src/env/supabase';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-board-delete',
  templateUrl: './board-delete.component.html',
  styleUrls: ['./board-delete.component.scss']
})
export class BoardDeleteComponent {
    @Input()
    public boardId?: number;

    @Input()
    public isHardDelete = false;

    constructor(private dialog: MatDialog, private router: Router, private snackbar: MatSnackBar) { }

    /**
     * Toggle between archive and hard delete.
     */
    public deleteBoard() {
        if (!this.boardId)
            return;

        if (!this.isHardDelete) {
            this.archiveBoard();
        } else {
            this.hardDeleteBoard();
        }
    }

    /**
     * Archive a board.
     */
    private async archiveBoard() {
        const response = await supabase.rpc('archive_board_fc', {
            in_board_id: this.boardId,
            in_is_active: 0,
        });

        if (response.error) {
            this.snackbar.open('An error occurred. Please try again later.', 'Close');
            return;
        }

        this.snackbar.open('Board sucessfully archived.', undefined, { duration: 3000 });
        this.dialog.closeAll();
        this.router.navigate(['app/dashboard']);
    }

    /**
     * Hard delete a board.
     */
    private async hardDeleteBoard() {
        alert('ToDo');
    }
}
