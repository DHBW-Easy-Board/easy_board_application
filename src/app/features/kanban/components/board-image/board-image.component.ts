import { Component, Input } from '@angular/core';
import { supabase } from 'src/env/supabase';
import { BoardStateService } from 'src/app/core/services/board-state.service';

@Component({
  selector: 'app-board-image',
  templateUrl: './board-image.component.html',
  styleUrls: ['./board-image.component.scss']
})
export class BoardImageComponent {

  @Input()
  public boardId?: number;

  public imageSrc?: string | null;

  constructor(private boardState: BoardStateService) {
    this.boardState.board$.subscribe(() => {
        this.getCurrentImage();
    });
  }

  ngOnInit() {
    this.getCurrentImage();
  }

  /**
   * get the current image stored in the database
   */
  async getCurrentImage() {
    if (!this.boardId)
      return;

    const entries = await supabase.from('board_image').select('*').eq('board_id', this.boardId);
            
    if (entries && entries.data && entries.data.length > 0) {
      this.imageSrc = entries.data[0]["img_storage"];
    } else {
      this.imageSrc = null;
    }       
  }
}
