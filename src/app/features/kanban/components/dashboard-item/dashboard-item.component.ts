import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.scss']
})
export class DashboardItemComponent {
    @Input()
    public boardId: number = 0;

    @Input()
    public boardName: string = 'Board';

    @Input()
    public boardLastUpdated: Date = new Date();

    /**
     * ToDo
     * Open the selected board.
     */
    public openBoard() {
        alert('ToDo - ID Test: ' + this.boardId);
    }
}
