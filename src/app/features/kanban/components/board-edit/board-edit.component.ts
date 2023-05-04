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

    public archiveBoard() {
        const dialgoRef = this.dialog.open(BoardDeleteComponent);
    }
}
