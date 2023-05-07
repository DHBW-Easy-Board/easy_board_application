import { Component, OnInit } from '@angular/core';
import { supabase } from 'src/env/supabase';
import { Board } from 'src/app/core/models/board.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit{
    public boards: Board[] = [];
    public columnsToDisplay = ['board_name', 'board_deleted_at', 'actions'];

    constructor (private dialog: MatDialog, private snackbar: MatSnackBar) { }

    async ngOnInit(): Promise<void>
    {
        await this.getArchivedBoards();
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

    public async restoreBoard(boardId: number) {
        console.log(boardId);
    }

    public async deleteBoard(boardId: number) {
        console.log(boardId);
    }
}
