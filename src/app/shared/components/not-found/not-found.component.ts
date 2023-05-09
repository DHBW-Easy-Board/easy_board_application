import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
    // Customization
    public background: string = 'assets/img/background.png';
}
