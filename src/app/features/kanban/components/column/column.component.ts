import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { supabase } from 'src/env/supabase';

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

    constructor (private snackbar: MatSnackBar) { }

    /**
     * ToDo
     * 
     * @param boardId 
     */
    private async getCards(boardId: number) {
        const response = await supabase.from('board_card_ov_auth_vw')
            .select('card_id')
            .eq('board_id', boardId)
            .not('card_id', 'is', null);

        console.log(response);

        if (response.error) {
            this.snackbar.open('An error occurred. Please try again later.', 'Close');
            return;
        }
    }
}
