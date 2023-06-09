import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { SlideComponent } from '../slide/slide.component';
import { SaveBoardComponent } from '../save-board/save-board.component';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [
    CommonModule,
    NavBarComponent,
    SaveBoardComponent,
    SlideComponent,
  ],
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent {

}
