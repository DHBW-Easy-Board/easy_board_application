import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent {
    @Input() 
    public title: string = 'AuthDialogTitle';
    @Input() 
    public subTitle: string = 'AuthDialogSubTitle';

    // Customization
    public logoUrl: string = '../../assets/img/logo.png';
    public background: string = '../../assets/img/background.png';
}
