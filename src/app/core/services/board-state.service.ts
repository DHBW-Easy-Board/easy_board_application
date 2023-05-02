import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class BoardStateService {
    // Subjects
    private boardSource = new Subject();
    private columnsSource = new Subject();
    private cardsSource = new Subject();

    // Observables
    public board$ = this.boardSource.asObservable();
    public columns$ = this.columnsSource.asObservable();
    public cards$ = this.cardsSource.asObservable();

    // Publish events
    public onBoardChange() {
        this.boardSource.next(undefined);
    }
    public onColumnsChange() {
        this.columnsSource.next(undefined);
    }
    public onCardsChange() {
        this.cardsSource.next(undefined);
    }
}
