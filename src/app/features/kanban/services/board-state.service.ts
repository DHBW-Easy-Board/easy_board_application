import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class BoardStateService {
    // Subjects
    private columnsSource = new Subject();
    private cardsSource = new Subject();

    // Observables
    public columns$ = this.columnsSource.asObservable();
    public cards$ = this.cardsSource.asObservable();

    // Publish events
    public onColumnsChange() {
        this.columnsSource.next(undefined);
    }
    public onCardsChange() {
        this.cardsSource.next(undefined);
    }
}
