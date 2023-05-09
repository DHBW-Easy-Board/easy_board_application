import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { BoardAssigneeModel } from 'src/app/core/models/board.assignee.model';
import { Role } from 'src/app/core/models/role.model';
import { supabase } from 'src/env/supabase';

export interface AddAssignee {
  board_id: number,
  user_id?: string,
  user_name?: string,
  role_id?: number
}

@Component({
  selector: 'app-user-role-list',
  templateUrl: './user-role-list.component.html',
  styleUrls: ['./user-role-list.component.scss']
})
export class UserRoleListComponent implements OnInit{

  @Input('title') componentTitle: string = 'role selection'

  /**
    * The boardId, used to identify the board.
    * provided by parent page
  */
  @Input('boardId') boardId!: number;

  /** used to identify if the page is currently loading */
  public loading: number = 0;

  /** used to filter all user which can be invited */
  inviteUserControl = new FormControl<string | BoardAssigneeModel>('');

  /** list with all user, possible to add */
  public userList!: Observable<BoardAssigneeModel[]>;

  /** current assigned user with its corresponding role */
  public boardAssignees: BoardAssigneeModel[] = [];

  /** all roles which are available in this board */
  public rolesAvailable: Role[] = [];

  /** user which should be added */
  public addUserItem?: AddAssignee| undefined;

  displayedColumns: string[] = ["user_name", "role_name"];

  constructor(private snackBar: MatSnackBar) { }

  async ngOnInit(): Promise<void> {
    this.loadAssignedUser();
    this.loadAllRoles();
    this.loadsNewUser();
  }

  /** shows loading error */
  private showError(error: any, msg?: string) {
    if(!msg)
      msg = "An unknown error has occured, please try again later";

    this.snackBar.open(msg, "close");
    console.error(error);
  }

  /** loads all user for the addAssignee functionality and sets the Observable */
  async loadsNewUser() {
    this.loading++;
    const res = await supabase.from('potential_board_assignees_vw').select('*').eq('board_id', this.boardId);

    if(!res.error) {
      const data: BoardAssigneeModel[] = res.data as BoardAssigneeModel[]
      this.userList = this.inviteUserControl.valueChanges.pipe(
        map(value => {
          if(value)
            return data.filter(f => f.user_name.toLowerCase().startsWith(value.toString().toLowerCase()))
          else
            return [];
        })
      );
    } else {
      this.showError(res.error, "There was an error loading userdata");
    }
    this.loading--;
  }

  /** loads all user colaborating on the current board */
  async loadAssignedUser() {
    this.loading++;

    const response = await supabase.from('valid_board_assignees_vw')
      .select('*')
      .eq('board_id', this.boardId);

    if(!response.error) {
      this.boardAssignees = response.data as BoardAssigneeModel[];
    } else {
      this.showError(response.error, 'There was an error loading all assigned user');
    }

    this.loading--;
  }

  /** laoding all roles available for the current board */
  async loadAllRoles() {
    this.loading++;

    const response = await supabase.from('role')
      .select('*');

    if(!response.error) {
      this.rolesAvailable = response.data as Role[];
    } else {
      this.showError(response.error, 'There was an error loading all roles');
    }

    this.loading--;
  }

  /** used to display the userList user to the html */
  displayUserString(user: BoardAssigneeModel) {
    return user.user_name;
  }

  /** adds user as BoardAssignee to the board (backend call) */
   public async addAssignee() {
    this.loading++;


    if(!this.checkIfAddUserItemIsValid())
      this.snackBar.open("Please check your input!", undefined, {duration: 2000});
    else {
      this.addUserItem!.user_name = undefined;
      const response = await supabase.from('user_board_role').insert(this.addUserItem)

      if(response.error) {
        this.showError(response.error, "An error occured, please try again later",);
      } else {
        this.loadAssignedUser();
        this.loadsNewUser();
        this.snackBar.open("New user was added successfully", undefined, { duration: 2000 })
        this.addUserItem = undefined;
      }
    }

    this.loading--;
  }

  /** change role for assignee */
  public async changeRoleForAssignee(assignee: BoardAssigneeModel, role: Role) {
    this.loading++;

    const response = await supabase.from('user_board_role').update({ role_id: role.id }).eq( "user_id", assignee.user_id ).eq("board_id", this.boardId);

    if(response.error) {
      this.showError(response.error,  "An error occured, please try again later");
      this.loadAssignedUser();
    } else {
      this.loadAssignedUser();
      this.snackBar.open("User was successfully updated", undefined, { duration: 2000 })
    }
    this.loading--;
  }

  /** deletes user from board */
  public async deleteAssignee(assignee: BoardAssigneeModel) {
    this.loading++;

    const response = await supabase.from('user_board_role').delete().eq( "user_id", assignee.user_id ).eq("board_id", this.boardId);
    if(response.error) {
      this.showError(response.error,  "An error occured, please try again later");
    } else {
      this.loadAssignedUser();
      this.loadsNewUser();
      this.snackBar.open("User was successfully deleted from board", undefined, { duration: 2000 })
    }

    this.loading--;
  }

  /** Fills in the addUserItem with role_id */
  public addRoleToAddAssignee(role: Role) {
    if(this.addUserItem)
      this.addUserItem.role_id = role.id;
    else
      this.addUserItem = {
        board_id: this.boardId,
        role_id: role.id,
      }
  }

  /** Fills in the adduserItem with user_name */
  public selectAssignee(user: BoardAssigneeModel) {
    if(this.addUserItem) {
      this.addUserItem.user_id = user.user_id;
    }
    else {
      this.addUserItem = {
        board_id: this.boardId,
        user_id: user.user_id,
        user_name: user.user_name,
      }
    }
  }

  /** checks if addUserItem is valid or not
    * @returns true if it is valid and false if not
  */
  private checkIfAddUserItemIsValid(): boolean {
    if(!this.addUserItem)
      return false;

    if(!this.addUserItem.user_id)
      return false;

    if(this.addUserItem.board_id !== this.boardId)
      return false;

    if(!this.rolesAvailable.find(role => role.id === this.addUserItem?.role_id))
      return false;

    return true;
  }
}
