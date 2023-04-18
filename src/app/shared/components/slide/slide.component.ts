import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideService } from '../../services/slide.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-slide',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent {
    @ViewChild('slide')
    slide?: ElementRef

    // Inject slide service and listen to open slide events
    constructor(private slideService: SlideService) {
        this.slideService.openSlide$.subscribe(() => {
            this.openSlide();
        });
    }

    /**
     * Opens the slide.
     */
    public openSlide() {
        this.slide?.nativeElement.classList.add('open');
        this.slide?.nativeElement.classList.remove('closed');
    }

    /**
     * Closes the slide.
     */
    public closeSlide() {
        this.slide?.nativeElement.classList.add('closed');
        this.slide?.nativeElement.classList.remove('open');
    }
}
