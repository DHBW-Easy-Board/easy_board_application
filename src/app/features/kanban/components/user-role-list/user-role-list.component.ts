import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-role-list',
  templateUrl: './user-role-list.component.html',
  styleUrls: ['./user-role-list.component.scss']
})
export class UserRoleListComponent {

  /**
    * The boardId, used to identify the board.
    * provided by parent page
  */
  @Input('boardId')
  boardId!: number;

}
