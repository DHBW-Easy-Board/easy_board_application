import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { supabase } from 'src/env/supabase';
import { User } from '@supabase/supabase-js';
import { BoardStateService } from 'src/app/core/services/board-state.service';

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
    public boardId: number | undefined;

    @Input()
    public title: string = 'Create Board';

    @Input()
    public submitLabel: string = 'Create Board';

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
    constructor (private router: Router, private snackbar: MatSnackBar, private boardState: BoardStateService) { 
        this.router.routeReuseStrategy.shouldReuseRoute = () => {
            return false;
        };
    }

    // Set user on init
    async ngOnInit() {
        const response = await supabase.auth.getUser();
        
        if (!response.data.user || response.data.user?.role !== 'authenticated') {
            this.router.navigate(['']);
            return;
        }
            
        this.user = response.data.user;

        this.getBoardData();
    }

    // Getters for the form data for easier access in the template
    get name() { return this.saveBoardForm.get('name'); }
    get description() { return this.saveBoardForm.get('description'); }

    /**
     * Get board data if the component has a board id.
     */
    private async getBoardData() {
        if (!this.boardId)
            return;

        const response = await supabase.from('board_ov_auth_vw')
            .select('board_name, board_description')
            .eq('board_id', this.boardId);

        if (response.error) {
            this.snackbar.open('An error occurred. Please try again later.', 'Close');
            return;
        }
        
        const data = response.data[0];
        this.name?.setValue(data.board_name);
        this.description?.setValue(data.board_description);
    }

    /**
     * Toggle between create and update board.
     */
    public saveBoard() {
        if (this.name?.errors)
            return;

        this.saveBoardForm.disable();

        if (!this.boardId) {
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
     * Updates a board.
     */
    private async updateBoard() {
        const response = await supabase.from('board').
            update({ 
                name: this.name?.value,
                description: this.description?.value, 
            })
            .eq('id', this.boardId);

        if (!response.error) {
            this.snackbar.open('Board updated successfully.', undefined, { duration: 3000 });
        } else {
            this.snackbar.open('An error occurred. Please try again later.', 'Close');
        }

        this.saveBoardForm.enable();
        this.boardState.onBoardChange();
    }
}
