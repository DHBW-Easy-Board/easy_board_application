import { Component, Input } from '@angular/core';
import { BoardDeleteComponent } from '../board-delete/board-delete.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-board-edit',
  templateUrl: './board-edit.component.html',
  styleUrls: ['./board-edit.component.scss']
})
export class BoardEditComponent {
    @Input()
    public boardId!: number

    constructor(private dialog: MatDialog) { }

    /**
     * Opens a dialog to archive a board.
     */
    public archiveBoard() {
        const dialogRef = this.dialog.open(BoardDeleteComponent);
        dialogRef.componentInstance.boardId = this.boardId;
        dialogRef.componentInstance.isHardDelete = false;
    }
}
