import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.scss']
})
export class DashboardItemComponent {
    @Input()
    public boardId = 0;

    @Input()
    public boardName = 'Board';

    @Input()
    public boardLastUpdated = 'Last updated';

    /**
     * ToDo
     * Open the selected board.
     */
    public openBoard() {
        alert('ToDo - ID Test: ' + this.boardId);
    }
}
