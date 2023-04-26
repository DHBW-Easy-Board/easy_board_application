import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnChanges {
    @Input()
    public id?: number;

    @Input()
    public title?: string;

    @Input()
    public username?: string;

    public usernameInitial?: string;

    ngOnChanges(changes: SimpleChanges) {
        this.setInitial(changes?.['username'].currentValue);
    }

    /**
     * Use the first character of an email/username to display on a card.
     * 
     * @param username 
     */
    private setInitial(username: string) {
        this.usernameInitial = username.charAt(0).toUpperCase();
    }

    /**
     * Open card details.
     */
    public openDetails() {
        alert('ID: ' + this.id);
    }
}
