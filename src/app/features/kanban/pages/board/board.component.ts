import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Column } from 'src/app/core/models/column.model';
import { supabase } from 'src/env/supabase';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
    public title = 'Board';
    public columns: Column[] = [];

    // Inject activated route to access route parameters
    constructor (private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.getBoard(params['id']);
            this.getColums(params['id']);
        });
    }

    /**
     * Get data of the specfied board.
     * ToDo Needs proper backend call.
     * 
     * @param boardId 
     */
    private async getBoard(boardId: number) {
        await supabase.auth.getUser()
            .then((response) => {
                supabase.from('board_ov_vw')
                    .select('*')
                    .eq('owner_id', response.data.user?.id)
                    .eq('board_id', boardId)
                    .then((response) => {
                        if (response.error)
                            return;

                        this.title = response.data[0]['board_name'];
                        console.log(response);
                    });
            });
    }

    /**
     * Get columns of the specified board.
     * ToDo Needs proper backend call.
     * 
     * @param boardId 
     */
    private async getColums(boardId: number) {
        await supabase.from('columns')
            .select('*')
            .eq('board_id', boardId)
            .then((response) => {
                if (response.error)
                    return;
                
                this.columns = response.data as Column[];
                console.log(response);
            });
    }
}
