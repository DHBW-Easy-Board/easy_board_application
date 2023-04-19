import { Component, Input, OnInit } from '@angular/core';
import { BoardAssignee } from 'src/app/core/models/boardAssignee';
import { Role } from 'src/app/core/models/role.model';
import { supabase } from 'src/env/supabase';

@Component({
  selector: 'app-user-role-list',
  templateUrl: './user-role-list.component.html',
  styleUrls: ['./user-role-list.component.scss']
})
export class UserRoleListComponent implements OnInit{

  /**
    * The boardId, used to identify the board.
    * provided by parent page
  */
  @Input('boardId')
  boardId!: number;

  /**
    * current assigned user with its corresponding role
  */
  public boardAssignees: BoardAssignee[] = [];

  /**
    * all roles which are available in this board
  */
  public rolesAvailable: Role[] = [];

  async ngOnInit(): Promise<void> {
    this.loadAssignedUser();
    this.loadAllRoles();
  }

  /**
    * loads all user colaborating on the current board
  */
  async loadAssignedUser() {
    console.log('Loading all user for board: ' + this.boardId);

    const response = await supabase.from('valid_board_assignees_vw')
      .select('*')
      .eq('board_id', this.boardId);

    if(!response.error) {
      this.boardAssignees = response.data as BoardAssignee[];
    } else {
      console.error('Could not load all assigned user');
      console.error(response);
    }
  }

  /**
    * laoding all roles available for the current board
  */
  async loadAllRoles() {
    console.log('Loading all roles');

    const response = await supabase.from('role')
      .select('*');

    if(!response.error) {
      this.rolesAvailable = response.data as Role[];
    } else {
      console.error('Could not load all roles');
      console.error(response);
    }
  }
}
