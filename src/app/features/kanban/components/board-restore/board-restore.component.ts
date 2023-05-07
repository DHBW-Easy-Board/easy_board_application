import { Component, Input } from '@angular/core';
import { supabase } from 'src/env/supabase';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-board-restore',
  templateUrl: './board-restore.component.html',
  styleUrls: ['./board-restore.component.scss']
})
export class BoardRestoreComponent {
    @Input()
    public boardId?: number;

    constructor (private dialog: MatDialog, private snackbar: MatSnackBar) { }

    /**
     * Restores an archived board.
     */
    public async restoreBoard() {
        const response = await supabase.rpc('archive_board_fc', {
            in_board_id: this.boardId,
            in_is_active: 1,
        });

        if (response.error) {
            this.snackbar.open('An error occurred. Please try again later.', 'Close');
            return;
        }

        this.snackbar.open('Board sucessfully restored.', undefined, { duration: 3000 });
        this.dialog.closeAll();
    }
}
