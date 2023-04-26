import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {MatDialogRef} from "@angular/material/dialog";
import {supabase} from "src/env/supabase";
import {CardModel} from "../../../../core/models/cardModel";
import {BoardAssigneeModel} from "../../../../core/models/board.assignee.model";
import {BoardColumn} from "../../../../core/models/board-column.model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss']
})
export class CreateCardComponent {

  /**
   * These get provided by dialog open function
   *
   * For Create:
   * column_id = preset column in view
   * isEdit = false
   * boardId and cardId dont matter
   *
   * For Edit
   * boardId for getting Valid Users and Columns
   * cardId for preloading card info
   * isEdit = true
   * column Id doesnt matter
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
  descriptionLabel: string = "Input a description"
  nameLabel: string = "Input a name"
  dirty: boolean = true

  /**
   * Column and assigne values for view
   */
  assignees: BoardAssigneeModel[] = [];
  responseColumns: BoardColumn[] = [];
  boardColumns: BoardColumn[] = [];


  /**
   * Card Context for preloading information
   */
  cardContext: CardModel = {
    id: 0, name: '', description: '', assigned_to: '0', columns_id: 0, created_at: null,
    due_date: null, position: 1};

  /**
   * this is need so that front end works
   */
  cardColumnContext = 0

  /**
   * Dialog close function
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  constructor(public dialogRef: MatDialogRef<CreateCardComponent>, private formBuilder: FormBuilder,
              private snackBar: MatSnackBar) {  }

  /**
   * important for expandle form label for the description
   */
  @ViewChild('autosize') autosize: CdkTextareaAutosize | undefined;

  /**
   * Form Control for the create-card html form
   */
  addCardForm = this.formBuilder.group({
      fName: new FormControl('', [Validators.pattern("(.|\\n)*"), Validators.maxLength(50)]),
      fAssignee: new FormControl('', Validators.required),
      fColumn: new FormControl('', Validators.required),
      fDueDate: new FormControl('', Validators.required),
      fDescription: new FormControl('', [Validators.pattern("(.|\\n)*")]),
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
        })
        .eq('id', this.cardId).then((response => {
          if(response.error){
            this.snackBar.open('Failed to update card (everything except column). Please try again later.', 'Ok')
          } else{
            this.snackBar.open('Card update successful', undefined, { duration: 3000 })
          }
        }))
      await supabase
        .rpc('update_card_status' , {
          card_id: this.cardId, new_columns_id: this.addCardForm.value.fColumn}).then((response => {
          if(response.error){
            this.snackBar.open('Failed to update card column. Please try again later.', 'Ok')
          }
        }))
    } else {
      const element = {
        name: this.addCardForm.value.fName,
        assigned_to: this.addCardForm.value.fAssignee,
        description: this.addCardForm.value.fDescription,
        columns_id: this.addCardForm.value.fColumn,
        due_date: this.addCardForm.value.fDueDate,
      }
      await supabase.from('card').insert([element]).then((response =>{
        if(response.error) {
          this.snackBar.open('Failed to create new card. Please try again later.', 'Ok')
        } else{
          this.snackBar.open('Card creation successful', undefined, { duration: 3000 })
        }
      }));
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
        this.snackBar.open('Could not preload assignees.', 'Ok')
        return;
      }
      this.assignees = response.data as BoardAssigneeModel[]
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
        this.snackBar.open('Could not preload card info.', 'Ok')
        return;
      }
      this.cardContext.id = response.data[0]['id']
      this.cardContext.assigned_to = response.data[0]['assigned_to']
      this.cardContext.description = response.data[0]['description']
      this.cardContext.name = response.data[0]['name']
      this.cardContext.due_date = response.data[0]['due_date']
      this.cardContext.columns_id = response.data[0]['columns_id']
      this.cardContext.position = response.data[0]['position']
    })
  }

  /**
   * updates on change in one form field
   */
  checkDirty(){
    this.dirty = false
  }

  /**
   * Gets Columns per board for status drop down
   */
  public getValidBoardColumns(){
    return supabase.from('board_column_ov_sm_vw')
      .select('*')
      .eq('board_id', this.boardId)
      .then((response) =>{
        if(response.error){
          this.snackBar.open('Could not preload card status.', 'Ok')
          return;
        }
        this.responseColumns = response.data as BoardColumn[]
      });
  }

  async ngOnInit(){
    this.cardContext = {
      id: 0, name: '', description: '', assigned_to: '0', columns_id: this.columnId,
      created_at: null,due_date: null, position: 1}

    await this.getValidBoardColumns();
    await this.getValidUsers();

    if (this.isEdit) {
      this.dialogHeader = "Edit a card:";
      this.buttonText = "Confirm edit";

      await this.getCardInfo();

      this.descriptionLabel = this.cardContext.description
      this.nameLabel = this.cardContext.name

      this.responseColumns.forEach((value, index) => {
        if (this.cardContext.columns_id == value.column_id){
          this.boardColumns.push(value);
        }
        else if (value.has_limit === 1){
          //typecast ist fine has_limit ensures not null
          if(<number>value.max_cards_per_column > value.act_cards_per_column){
            this.boardColumns.push(value);
          }
        } else {
            this.boardColumns.push(value);
        }
      });
    }
    else{
      this.responseColumns.forEach((value, index) => {
        if (value.has_limit === 1) {
          //typecast ist fine has_limit ensures not null
          if (<number>value.max_cards_per_column > value.act_cards_per_column) {
            this.boardColumns.push(value);
          }
        } else {
            this.boardColumns.push(value);
        }
      });
    }
    this.addCardForm.patchValue({fName: this.cardContext.name})
    this.addCardForm.patchValue({fDescription: this.cardContext.description})
    this.addCardForm.patchValue({fDueDate: this.cardContext.due_date})

    /**
     * ikr genius
     */
    this.cardColumnContext = this.cardContext.columns_id
  }
}
