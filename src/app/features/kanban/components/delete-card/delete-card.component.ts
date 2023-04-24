import { Component } from '@angular/core';
import {supabase} from "../../../../../env/supabase";
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";

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

  constructor(public dialogRef: MatDialogRef<DeleteCardComponent>) {  }

  /**
   * Dialog close function
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * Deltes a card
   */
  public async deleteCard() {
    await supabase.from('card').delete().eq('id', this.cardId)
    this.dialogRef.close();
  }

}
