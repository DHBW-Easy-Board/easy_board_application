import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {MatDialogRef} from "@angular/material/dialog";
import {supabase} from "src/env/supabase";
import {CardModel} from "../../../../core/models/cardModel";
import {BoardAssigneeModel} from "../../../../core/models/board.assignee.model";
import {BoardColumn} from "../../../../core/models/board-column.model";

interface Column{
  id: number,
  name: string,
}

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss']
})
export class CreateCardComponent {

  /**
   * These get provided by dialog open function
   */
  public boardId: number = 0;
  public columnId: number = 0;
  public cardId: number = 0;
  public isEdit: boolean = false;

  /**
   * Depending on edit or create mode these get set (look onInit)
   */
  dialogHeader: string = "Add a card:";
  buttonText: string = "Confirm add"

  /**
   * Column Context for preloading information
   */
  columnContext: Column = {id: 0, name: ''};

  assignees: BoardAssigneeModel[] = [];
  boardColumns: BoardColumn[] = [];

  /**
   * Card Context for preloading information
   */
  cardContext: CardModel = {
    id: 0, name: '', description: '', assigned_to: '0', columns_id: 0, created_at: null,
    due_date: null, position: 1};

  /**
   * Dialog close function
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  constructor(public dialogRef: MatDialogRef<CreateCardComponent>, private formBuilder: FormBuilder) {  }

  /**
   * important for expandle form label for the description
   */
  @ViewChild('autosize') autosize: CdkTextareaAutosize | undefined;

  /**
   * Form Control for the create-card html form
   */
  addCardForm = this.formBuilder.group({
      fName: new FormControl(this.cardContext.name, [Validators.pattern(".*")]),
      fAssignee: new FormControl(this.cardContext.assigned_to, Validators.required),
      fColumn: new FormControl(this.columnContext.name, Validators.required),
      fDueDate: new FormControl(this.cardContext.due_date, Validators.required),
      fDescription: new FormControl(this.cardContext.description, [Validators.pattern(".*")]),
    }
  );

  /**
   * Submits the card form (edit or creation of a card)
   */
  public async submitCardForm() {
    if (this.isEdit) {
      await supabase
        .from('card')
        .update({
          name: this.addCardForm.value.fName, description: this.addCardForm.value.fDescription,
          assigned_to: this.addCardForm.value.fAssignee, due_date: this.addCardForm.value.fDueDate,
          columns_id: this.addCardForm.value.fColumn,
        })
        .eq('id', this.cardId)
    } else {
      const element = {
        name: this.addCardForm.value.fName,
        assigned_to: this.addCardForm.value.fAssignee,
        description: this.addCardForm.value.fDescription,
        columns_id: this.addCardForm.value.fColumn,
        due_date: this.addCardForm.value.fDueDate,
      }
      await supabase.from('card').insert([
        element
      ]);
    }
    this.dialogRef.close();
  }

  /**
   * Get valid users for edit/create card (is searched by board id)
   */
  public getValidUsers() {
    return supabase.from('valid_board_assignees_vw')
      .select('*')
      .eq('board_id', this.boardId)
      .then((response) => {
      if (response.error) {
        console.log('cant preload valid assignees')
        return;
      } else {
        this.assignees = response.data as BoardAssigneeModel[]
      }
    })
  }

  /**
   * Gets the card context for the edit view (is done for presetting values)
   */
  public getCardInfo() {
    return supabase.from('card')
      .select('*')
      .eq('id', this.cardId)
      .then((response) => {
      if (response.error) {
        console.log('cant preload card information')
        return;
      } else {
        this.cardContext.id = response.data[0]['id']
        this.cardContext.assigned_to = response.data[0]['assigned_to']
        this.cardContext.description = response.data[0]['description']
        this.cardContext.name = response.data[0]['name']
        this.cardContext.due_date = response.data[0]['due_date']
        this.cardContext.columns_id = response.data[0]['columns_id']
        this.cardContext.position = response.data[0]['position']
      }
    })
  }

  /**
   * Gets Columns per board for status drop down
   */
  public getValidCardStatus(){
    return supabase.from('board_column_ov_sm_vw')
      .select('*')
      .eq('board_id', this.boardId)
      .then((response) =>{
        if(response.error){
          console.log(response.error)
          console.log('Cant load card columns');
          return;
        }
        else {
          this.boardColumns = response.data as BoardColumn[]
          console.log("(get method) columns sind:")
          console.log(this.boardColumns)
        }
      });
  }

  async ngOnInit(){
    this.cardContext = {
      id: 0, name: 'Name', description: 'Description', assigned_to: '0', columns_id: 0,
      created_at: null,due_date: null, position: 1}

    await this.getValidUsers();
    await this.getValidCardStatus();

    if (this.isEdit) {
      this.dialogHeader = "Edit a card:";
      this.buttonText = "Confirm edit";

      await this.getCardInfo();
      this.assignees.forEach((value) => {
        if (this.cardContext.assigned_to == value.user_id) {
          this.cardContext.assigned_to = value.user_name;
        }
      });
    }

    this.boardColumns.forEach((value, index) => {
      if(this.cardContext.columns_id.toString() == value.column_id.toString()){
        this.columnContext.id = value.column_id;
        this.columnContext.name = value.column_name;
      }
      else if(value.has_limit == 1){
        if(<number>value.max_cards_per_column <= value.act_cards_per_column){
          this.boardColumns.splice(index, 1)
        }
      }
    });
  }
}
