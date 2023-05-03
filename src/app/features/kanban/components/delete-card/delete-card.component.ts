import { Component } from '@angular/core';
import {supabase} from "../../../../../env/supabase";
import { BoardStateService } from 'src/app/core/services/board-state.service';
import {MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-delete-card',
  templateUrl: './delete-card.component.html',
  styleUrls: ['./delete-card.component.scss']
})
export class DeleteCardComponent {

  /**
   * Gets set when dialog is opened
   */
  public cardId = 0;

  constructor(
    public dialogRef: MatDialogRef<DeleteCardComponent>,
    private boardState: BoardStateService,
    private snackBar: MatSnackBar
  ) {  }

  /**
   * Dialog close function
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * Deletes a card by card id
   */
  public async deleteCard() {
    await supabase.from('card').delete().eq('id', this.cardId).then((response) => {
      if(response.error){
        this.snackBar.open('Failed to delete card. Please try again later.', 'Ok')
        this.dialogRef.close();
      } else{
        this.boardState.onCardsChange();
        this.snackBar.open('Card successfully deleted.', undefined, {
            duration: 3000
        })
        this.dialogRef.close();
      }
    })
  }
}
