import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { supabase } from 'src/env/supabase';
import { User } from '@supabase/supabase-js';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-save-board',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
  ],
  templateUrl: './save-board.component.html',
  styleUrls: ['./save-board.component.scss']
})
export class SaveBoardComponent {
    private user: User | undefined;
    private defaultColumns = [
        [ 'ToDo', null, 1 ],
        [ 'In Progress', null, 2 ],
        [ 'Done', null, 3 ],
    ];

    @Input()
    public create: boolean = true;

    @Input()
    public title: string = 'Create Board';

    // Form
    public saveBoardForm = new FormGroup({
        name: new FormControl('', [
            Validators.required,
            Validators.maxLength(30),
            Validators.pattern('^[a-zA-ZäÄöÖüÜß0-9_-]+'),
        ]),
        description: new FormControl(''),
    });

    // Inject router to redirect to a new board
    constructor (private router: Router, private snackbar: MatSnackBar) { }

    // Set user on init
    async ngOnInit() {
        const response = await supabase.auth.getUser();
        
        if (!response.data.user || response.data.user?.role !== 'authenticated') {
            this.router.navigate(['']);
            return;
        }
            
        this.user = response.data.user;
    }

    // Getters for the form data for easier access in the template
    get name() { return this.saveBoardForm.get('name'); }
    get description() { return this.saveBoardForm.get('description'); }

    /**
     * Toggle between create and update board.
     */
    public saveBoard() {
        if (this.name?.errors)
            return;

        this.saveBoardForm.disable();

        if (this.create) {
            this.createBoard();
        } else {
            this.updateBoard();
        }
    }

    /**
     * Creates and redirects to the new board.
     */
    private async createBoard() {
        const response = await supabase.rpc('create_board_fc', {
            in_name: this.name?.value,
            in_description: this.description?.value,
            in_owner_id: this.user?.id,
            col: this.defaultColumns
        });

        if (response.data)
            this.router.navigate(['app/boards', response.data]);

        if (response.error) {
            this.snackbar.open('An error occurred. Please try again later.', 'Close');
            this.saveBoardForm.enable();
        }
    }

    /**
     * ToDo
     */
    private async updateBoard() {
        alert('UPDATE');
    }
}
