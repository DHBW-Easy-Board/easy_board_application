import {Component, Input, ViewChild} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {supabase} from "../../../../../env/supabase";

export interface assignee{
  id: string
}

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss']
})
export class CreateCardComponent {

  @Input()
  public boardId: number = 0;

  @Input()
  public columnId: number = 0;

  userId: any = 0;
  userMail: any = "isitdefault";

  asignees: string[] = ["123"];

  constructor(private formBuilder:FormBuilder) { }

  @ViewChild('autosize') autosize: CdkTextareaAutosize | undefined;

  addCardForm = this.formBuilder.group({
      fName:'',
      fAssignee:'',
      fDueDate:'',
      fDescription: ''
    }
  );

  /*
  public async submitCreateCardForm(){
    await supabase.from('card').insert([
      {name: this.addCardForm.value.fName, description: this.addCardForm.value.fDescription,
      assigned_to: this.userId, column_id: this.columnId, created_at: new Date(), due_date: this.addCardForm.value.fDueDate},
    ])
  }
  */
  public async submitCreateCardForm() {
      const element = {
          name: "TestCard",
          description: 'TestDescription',
          columns_id:  1,
      }
      const response = await supabase.from('card').insert([
        element
      ]);
      console.log(response);
  }

  public async getValidUsers(){
    await supabase.auth.getUser().then((response) => {
      this.userId = response.data.user?.id
      this.userMail = response.data.user?.email
    })
  }

  ngOnInit(): void {
    this.getValidUsers()
    this.asignees.push(this.userMail)
  }

}
