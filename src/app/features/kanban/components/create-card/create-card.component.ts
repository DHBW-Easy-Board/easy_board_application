import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import { MatDialogRef } from "@angular/material/dialog";
import { supabase } from "src/env/supabase";

interface userpair{
  id: any,
  email: any
}

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss']
})
export class CreateCardComponent {

  //these get provided by dialog open method
  public boardId: any = '0';
  public columnId: any = 0;
  public cardId: any = '0';
  public isEdit: any = false;


  assignees: userpair[] = [];

  /*
  cardContext : cardModel = {id: '0', name: '', description: '',
    assignedTo: '0', columnId: 0, creationDate: null, dueDate: null, boardId: '0'}

   */

  //Dialog close function
  onNoClick(): void {
    this.dialogRef.close();
  }

  constructor(public dialogRef: MatDialogRef<CreateCardComponent> ,private formBuilder:FormBuilder) { }

  @ViewChild('autosize') autosize: CdkTextareaAutosize | undefined;

  addCardForm = this.formBuilder.group({
      fName:'',
      fAssignee:'',
      fDueDate:'',
      fDescription: ''
    }
  );

  //todo add board id to submit when available in database
  public async submitCreateCardForm() {
    console.log(this.addCardForm.value.fAssignee)
    const element = {
        name: this.addCardForm.value.fName,
        assigned_to: this.addCardForm.value.fAssignee,
        description: this.addCardForm.value.fDescription,
        columns_id: this.columnId,
        due_date: this.addCardForm.value.fDueDate,
    }
    const response = await supabase.from('card').insert([
      element
    ]);
    console.log(response);
  }

  public async getValidUsers(){
    await supabase.auth.getUser().then((response) => {
      this.assignees.push({id: response.data.user?.id,
        email: response.data.user?.email});
      console.log(response)
    })
  }

  /*
  card context für edit (nicht funktional wegen board id missing)
  public async getCardInfo(){
    await supabase.from('card').select('*').eq('id', this.cardId).then((response) =>{
      if(response.error) {
        console.log('cant preload card information')
        return;
      }
      else {
        this.cardContext = response.data as cardModel
      }
    })
  }

   */

  ngOnInit(): void {
    this.getValidUsers()

    /*
    if(this.isEdit){
      this.getCardInfo()
    }
     */
  }

}
