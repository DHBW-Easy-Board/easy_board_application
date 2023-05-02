import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Column } from 'src/app/core/models/column.model';
import { supabase } from 'src/env/supabase';
import { BoardStateService } from 'src/app/core/services/board-state.service';
import { CreateCardComponent } from '../../components/create-card/create-card.component';
import { BoardEditComponent } from '../../components/board-edit/board-edit.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
    public id: number | undefined;
    public title = 'Board';
    public columns: Column[] = [];

    constructor (
        private boardState: BoardStateService,
        private route: ActivatedRoute,
        private dialog: MatDialog, 
        private snackbar: MatSnackBar
    ) { 
        this.boardState.board$.subscribe(() => {
            this.getBoardData(this.id);
        });
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.getBoardData(this.id);
            this.getColumns(this.id);
        });
    }

    /**
     * Get data of the specfied board.
     * 
     * @param boardId 
     */
    private async getBoardData(boardId: number|undefined) {
        const response = await supabase.from('board_ov_auth_vw')
            .select('*')
            .eq('board_id', boardId);

        if (response.error) {
            this.snackbar.open('An error occurred. Please try again later.', 'Close');
            return;
        }

        this.title = response.data[0]['board_name'];
    }

    /**
     * Get columns of the specified board.
     * 
     * @param boardId 
     */
    private async getColumns(boardId: number|undefined) {
        const response = await supabase.from('board_column_sm_auth_vw')
            .select('*')
            .eq('board_id', boardId)
            .order('position');

        if (response.error) {
            this.snackbar.open('An error occurred. Please try again later.', 'Close');
            return;
        }

        this.columns = response.data as Column[];
    }

    /**
     * Add a card.
     */
    public addCard() {
        if (!this.id) {
            this.snackbar.open('An error occurred. Please try again later.', 'Close');
            return;
        }
        
        const dialogRef = this.dialog.open(CreateCardComponent, {
            width: '50vw',
        });
        dialogRef.componentInstance.boardId = this.id;
        dialogRef.componentInstance.isEdit = false;
    }

    /**
     * Open settings.
     */
    public openSettings() {
        if (!this.id) {
            this.snackbar.open('An error occurred. Please try again later.', 'Close');
            return;
        }

        const dialogRef = this.dialog.open(BoardEditComponent, {
            maxHeight: '90vh',
            width: '75vw',
        });
        dialogRef.componentInstance.boardId = this.id;
    }
}
