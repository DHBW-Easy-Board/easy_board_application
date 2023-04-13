import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class SlideService {
    // Subject
    private slideSource = new Subject();

    // Observable
    public openSlide$ = this.slideSource.asObservable();

    // Publish event
    public openSlide() {
        this.slideSource.next(undefined);
    }
}
