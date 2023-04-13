import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { supabase } from 'src/env/supabase';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-save-board',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './save-board.component.html',
  styleUrls: ['./save-board.component.scss']
})
export class SaveBoardComponent {
    @Input()
    public create: boolean = true;

    @Input()
    public title: string = 'Create Board';

    // Form
    public saveBoardForm = new FormGroup({
        name: new FormControl(''),
        description: new FormControl(''),
    });

    // Inject router to redirect to a new board
    constructor (private router: Router) { }

    // Getters for the form data for easier access in the template
    get name() { return this.saveBoardForm.get('name'); }
    get description() { return this.saveBoardForm.get('description'); }

    /**
     * Toggle between create and update board.
     */
    public saveBoard() {
        if (this.create) {
            this.createBoard();
        } else {
            this.updateBoard();
        }
    }

    /**
     * Creates and redirects to the new board.
     * ToDo - Needs a backend endpoint to create a board in a proper transaction.
     */
    private async createBoard() {
        await supabase.auth.getUser()
            .then((response) => {
                supabase.from('board')
                    .insert({
                        name: this.name?.value,
                        description: this.description?.value,
                        owner_id: response.data.user?.id,
                    })
                    .select()
                    .then((response) => {
                        if (response.error)
                            return;

                        const boardId = response.data[0]['id'];

                        this.initDefaultColumns(boardId)
                            .then((response) => {
                                if (response.error)
                                    return;

                                this.router.navigate(['app/boards', boardId]);
                            });
                    });
            });
    }

    /**
     * Creates default columns for the given board.
     * 
     * @param boardId 
     */
    private initDefaultColumns(boardId: number) {
        return supabase.from('columns')
            .insert([
                {
                    board_id: boardId,
                    name: 'ToDo',
                    position: 1
                },
                {
                    board_id: boardId,
                    name: 'In Progress',
                    position: 2
                },
                {
                    board_id: boardId,
                    name: 'Done',
                    position: 3
                }
            ]);
    }

    /**
     * ToDo
     */
    private async updateBoard() {
        alert('UPDATE');
    }
}
