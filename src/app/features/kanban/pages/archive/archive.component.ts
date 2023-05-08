import { Component, OnInit } from '@angular/core';
import { supabase } from 'src/env/supabase';
import { Board } from 'src/app/core/models/board.model';
import { BoardRestoreComponent } from '../../components/board-restore/board-restore.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BoardDeleteComponent } from '../../components/board-delete/board-delete.component';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit{
    public boards: Board[] = [];
    public columnsToDisplay = ['board_name', 'board_deleted_at', 'actions'];

    constructor (private dialog: MatDialog, private snackbar: MatSnackBar) { }

    ngOnInit(): void
    {
        this.getArchivedBoards();
    }

    /**
     * Get archived boards
     */
    private async getArchivedBoards() {
        const response = await supabase.from('board_ov_for_archive_auth_vw')
            .select('*')
            .order('board_deleted_at', { ascending: false });

        if (response.error) {
            this.snackbar.open('An error occured. Please try again later.', 'Ok');
            return;
        }

        this.boards = response.data as Board[];
    }

    /**
     * Opens the board restore dialog.
     * 
     * @param boardId The given board id
     */
    public async restoreBoard(boardId: number) {
        const dialogRef = this.dialog.open(BoardRestoreComponent);
        dialogRef.componentInstance.boardId = boardId;

        dialogRef.afterClosed().subscribe(result => {
            if(result === undefined)
                this.getArchivedBoards();
        });
    }

    /**
     * Openes the board delete dialog.
     * 
     * @param boardId The given board id
     */
    public async deleteBoard(boardId: number) {
        const dialogRef = this.dialog.open(BoardDeleteComponent);
        dialogRef.componentInstance.boardId = boardId;
        dialogRef.componentInstance.isHardDelete = true;

        dialogRef.afterClosed().subscribe(result => {
            if(result === undefined)
                this.getArchivedBoards();
        });
    }
}
