import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { BoardAssignee } from 'src/app/core/models/boardAssignee';
import { Role } from 'src/app/core/models/role.model';
import { supabase } from 'src/env/supabase';

export interface User {
  id: number,
  user_name: string,
  role_id: number
}

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
  @Input('boardId') boardId!: number;

  /** used to filter all user which can be invited */
  inviteUserControl = new FormControl<string | User>('');

  public options: User[] = [];

  /** list with all user, possible to add */
  public userList!: Observable<User[]>;

  /** current assigned user with its corresponding role */
  public boardAssignees: BoardAssignee[] = [];

  /** all roles which are available in this board */
  public rolesAvailable: Role[] = [];

  /** user which should be added */
  public addUserItem?: User | undefined;

  displayedColumns: string[] = ["user_name", "role_name"];

  async ngOnInit(): Promise<void> {
    this.loadAssignedUser();
    this.loadAllRoles();


    const res = await supabase.from('user').select('*');

    if(!res.error)
      this.options = res.data as User[]

    this.userList = this.inviteUserControl.valueChanges.pipe(
      map(value => {
        console.log(value);
        if(value)
          return this.options.filter(f => f.user_name.toLowerCase().startsWith(value.toString().toLowerCase()))
        else
          return this.options;
      })
    );
  }

  /** loads all user colaborating on the current board */
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

  /** laoding all roles available for the current board */
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

  displayUserString(user: User) {
    return user.user_name;
  }

  public addAssignee() {
    console.log("Adding user to Backend");
    console.log(this.addUserItem);
  }

  public changeRoleForAssignee(assignee: BoardAssignee, role: Role) {
    console.log("Change role of user to role");
    console.log(assignee);
    console.log(role);
  }

  public deleteAssignee(assignee: BoardAssignee) {
    console.log("Delete Board assignee");
    console.log(assignee);
  }

  public addRoleToAddAssignee(role: Role) {
    if(this.addUserItem)
      this.addUserItem.role_id = role.id;
    else
      this.addUserItem = {
        id: 0,
        user_name: "",
        role_id: role.id
      }
  }
  public selectAssignee(user: User) {
    if(this.addUserItem) {
      this.addUserItem.user_name = user.user_name
    }
    else {
      this.addUserItem = {
        id: 0,
        user_name: user.user_name,
        role_id: 1
      }
    }
  }
}
