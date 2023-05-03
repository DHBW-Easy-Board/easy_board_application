import { Component } from '@angular/core';
import { supabase } from "../../../../../env/supabase";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CardModel } from "../../../../core/models/cardModel";
import { DeleteCardComponent } from "../delete-card/delete-card.component";
import { CreateCardComponent } from "../create-card/create-card.component";

@Component({
  selector: 'app-view-card',
  templateUrl: './view-card.component.html',
  styleUrls: ['./view-card.component.scss']
})
export class ViewCardComponent {

  /**
   * These get provided by dialog open function
   */
  public cardId: number = 0;

  constructor(public dialogRef: MatDialogRef<ViewCardComponent>, private snackBar: MatSnackBar,
              public dialog: MatDialog) {  }

  /**
   * user name for display
   */
  userName: string = ''

  /**
   * column name for display
   */
  columnName: string = ''

  /**
   * Date for display
   */
  dueDate: Date | null = null

  /**
   * Board id for edit dialog call
   */
  boardId: number = 0

  /**
   * User ID for checking authorization
   */
  userId: string = ''

  /**
   * Boolean for authorization (Owener/Collaborator = true, Watcher = false)
   */
  viewAuth: boolean = false

  /**
   * Card Context for preloading information
   */
  cardContext: CardModel = {
    id: 0, name: '', description: '', assigned_to: '0', columns_id: 0, created_at: null,
    due_date: null, position: 1};

  /**
   * Gets the card context for the edit view (is done for presetting values)
   */
  public async getCardInfo() {
    return supabase.from('board_card_sm_vw')
      .select('*')
      .eq('card_id', this.cardId)
      .then((response) => {
        if (response.error) {
          this.snackBar.open('Could not load card info.', 'Ok')
          return;
        } else {
          this.cardContext.id = response.data[0]['card_id']
          this.cardContext.assigned_to = response.data[0]['card_assigned_to']
          this.cardContext.description = response.data[0]['card_description']
          this.cardContext.name = response.data[0]['card_name']
          this.dueDate = response.data[0]['card_due_date']
          this.cardContext.columns_id = response.data[0]['columns_id']
          this.cardContext.position = response.data[0]['position']
          this.boardId = response.data[0]['board_id']
        }
      })
  }

  public async getUserName() {
    return supabase.from('user_ov_vw')
      .select('*')
      .eq('user_id', this.cardContext.assigned_to)
      .then((response) => {
        if (response.error) {
          this.snackBar.open('Could not load user name.', 'Ok')
          return;
        } else {
          this.userName = response.data[0]['user_name']
        }
      })
  }

  public async getColumnName() {
    return supabase.from('board_column_ov_sm_vw')
      .select('*')
      .eq('column_id', this.cardContext.columns_id)
      .then((response) => {
        if (response.error) {
          this.snackBar.open('Could not load user name.', 'Ok')
          return;
        } else {
          this.columnName = response.data[0]['column_name']
        }
      })
  }

  /**
   * open delete card dialog function
   */
  public openDeleteCardDialog() {
    const dialogRef = this.dialog.open(DeleteCardComponent,
      {
        width: '35vw'
      });
    dialogRef.componentInstance.cardId = this.cardId

    dialogRef.beforeClosed().subscribe(value => {
      this.dialogRef.close()
    })
  }

  public openEditCardDialog() {
    const dialogRef = this.dialog.open(CreateCardComponent,
      {
        width: '50vw'
      });
    dialogRef.componentInstance.boardId = this.boardId
    dialogRef.componentInstance.columnId = this.cardContext.columns_id
    dialogRef.componentInstance.cardId = this.cardId
    dialogRef.componentInstance.isEdit = true

    dialogRef.beforeClosed().subscribe(value => {
      this.updateView();
    })
  }

  private async checkUserAuthorization(){
    return supabase.auth.getUser().then((response) => {
      if (response.error) {
        this.snackBar.open("Can't authenticate user.");
        return;
      }
        
      this.userId = response.data.user.id;

      supabase.from('valid_board_assignees_vw')
        .select('*')
        .eq('board_id', this.boardId)
        .eq('user_id', this.userId)
        .then((response) => {
          if (response.error) {
            this.snackBar.open("Can't authenticate user.");
            return;
          }

          if(response.data[0]['role_id'] != 3){
            this.viewAuth = true;
            return;
          }

          this.viewAuth = false;
        })
    });
  }

  async updateView(){
    await this.getCardInfo()
    await this.getColumnName()
    await this.getUserName()
  }

  async ngOnInit(){
    await this.getCardInfo()
    await this.getColumnName()
    await this.getUserName()
    await this.checkUserAuthorization()
  }
}
