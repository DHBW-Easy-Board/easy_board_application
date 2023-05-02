import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-icon.component.html',
  styleUrls: ['./user-icon.component.scss']
})
export class UserIconComponent implements OnChanges {
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
}
