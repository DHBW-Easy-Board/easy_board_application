import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewCardComponent } from '../view-card/view-card.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
    @Input()
    public id?: number;

    @Input()
    public title?: string;

    @Input()
    public username?: string;

    constructor(private dialog: MatDialog, private snackbar: MatSnackBar) {}

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
