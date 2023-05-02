import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Card } from 'src/app/core/models/card.model';
import { supabase } from 'src/env/supabase';
import { BoardStateService } from '../../services/board-state.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent {
    @Input()
    public id?: number;

    @Input()
    public title = 'Column';

    @Input()
    public boardId?: number;

    public cards: Card[] = [];

    constructor (private boardState: BoardStateService, private snackbar: MatSnackBar) {
        this.boardState.cards$.subscribe(() => {
            this.getCards();
        });
    }

    ngOnInit() {
        if (this.boardId)
            this.getCards();
    }

    /**
     * Get all cards of a column.
     * 
     * @param boardId 
     */
    private async getCards() {
        if (!this.boardId) {
            this.snackbar.open('An error occurred. Please try again later.', 'Close');
            return;
        }

        const response = await supabase.from('board_card_sm_auth_vw')
            .select('*')
            .eq('board_id', this.boardId)
            .eq('columns_id', this.id);

        if (response.error) {
            this.snackbar.open('An error occurred. Please try again later.', 'Close');
            return;
        }

        this.cards = response.data as Card[];
    }
}
