import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewCardComponent } from '../view-card/view-card.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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

    constructor(private dialog: MatDialog, private snackbar: MatSnackBar) {}

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
        if (!this.id) {
            this.snackbar.open('An error occurred. Please try again later.', 'Close');
            return;
        }

        const dialogRef = this.dialog.open(ViewCardComponent, {
            width: '50vw',
        });
        dialogRef.componentInstance.cardId = this.id;
    }
}
