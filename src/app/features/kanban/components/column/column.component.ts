import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent {
    @Input()
    public id?: number;

    @Input()
    public title = 'Column';

    @Input()
    public boardId?: number;

    /**
     * ToDo
     */
    public addCard() {
        alert('ToDo - This is column No. ' + this.id + ' of board No. ' + this.boardId);
    }
}
