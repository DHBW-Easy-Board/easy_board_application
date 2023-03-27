import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.css']
})
export class AuthDialogComponent {
    logoUrl: string = '../../assets/img/logo.png';

    @Input() title: string = 'AuthDialogTitle';
    @Input() subTitle: string = 'AuthDialogSubTitle';
}
