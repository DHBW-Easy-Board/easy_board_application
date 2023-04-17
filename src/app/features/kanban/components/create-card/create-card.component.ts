import { Component, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import { MatDialogRef } from "@angular/material/dialog";
import { supabase } from "src/env/supabase";
import {cardModel} from "../../../../core/models/card-model";
import {BoardAssignee} from "../../../../core/models/boardAssignee";

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss']
})
export class CreateCardComponent {

  //these get provided by dialog open method
  public boardId: any = '0';
  public columnId: any = '0';
  public cardId: any = '0';
  public isEdit: any = false;

  dialogHeader: string = "Add a card:";
  buttonText: string = "Confirm add"

  assignees: BoardAssignee[] = [];

  cardContext : cardModel = {card_id: 0, card_name: '', card_description: '',
    card_assigned_to: '0', columns_id: 0, card_created_at: null, card_due_date: null, position: 1};

  //Dialog close function
  onNoClick(): void {
    this.dialogRef.close();
  }

  constructor(public dialogRef: MatDialogRef<CreateCardComponent> ,private formBuilder:FormBuilder) { }

  @ViewChild('autosize') autosize: CdkTextareaAutosize | undefined;

  addCardForm = this.formBuilder.group({
      fName: new FormControl('', [Validators.pattern(".*")]),
      fAssignee: '',
      fDueDate:'',
      fDescription: ''
    }
  );

  public async submitCardForm() {
    if(this.isEdit){
      const response = await supabase
        .from('card')
        .update({ name: this.addCardForm.value.fName, description: this.addCardForm.value.fDescription,
        assigned_to: this.addCardForm.value.fAssignee, due_date: this.addCardForm.value.fDueDate})
        .eq('id', this.cardContext.card_id)
    }
    else{
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
    }
    this.dialogRef.close();
  }

  public async getValidUsers(){
    await supabase.from('valid_board_assignees_vw').select('*').eq('board_id', this.boardId).
    then((response) =>{
      if(response.error){
        console.log('cant preload valid assignees')
        return;
      }
      else{
        this.assignees = response.data as BoardAssignee[]
      }
    })
  }

  public async getCardInfo(){
    await supabase.from('card').select('*').eq('id', this.cardId).
    then((response) =>{
      if(response.error) {
        console.log('cant preload card information')
        return;
      }
      else {
        console.log(response)
        this.cardContext.card_id = response.data[0]['id']
        this.cardContext.card_assigned_to = response.data[0]['assigned_to']
        this.cardContext.card_description = response.data[0]['description']
        this.cardContext.card_name = response.data[0]['name']
        this.cardContext.card_created_at = response.data[0]['created_at']
        this.cardContext.card_due_date = response.data[0]['due_date']
        this.cardContext.columns_id = response.data[0]['columns_id']
        this.cardContext.position = response.data[0]['position']
        console.log(this.cardContext)
      }
    })
  }

  ngOnInit(): void {
    this.cardContext = {card_id: 0, card_name: 'Name', card_description: 'Description',
      card_assigned_to: '0', columns_id: 0, card_created_at: null, card_due_date: null, position: 1}

    this.getValidUsers();

    if(this.isEdit){
      this.dialogHeader = "Edit a card:";
      this.buttonText = "Confirm edit";

      this.getCardInfo();
      this.assignees.forEach((value) => {
        if(this.cardContext.card_assigned_to == value.user_id){
          this.cardContext.card_assigned_to = value.user_name;
        }
      });
    }
  }

}
