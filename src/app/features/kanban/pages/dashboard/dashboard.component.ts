import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { supabase } from 'src/env/supabase';
import {CreateCardComponent} from "../../components/create-card/create-card.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public email: string | undefined;

    constructor (private router: Router, public dialog: MatDialog) { }

    // Test if sign in was successful
    async ngOnInit() {
        await supabase.auth.getUser()
            .then((response) => {
                this.email = response.data.user?.email;
            });
    }

    // Test sign out
    public async signOut() {
        await supabase.auth.signOut()
            .then((response) => {
                if (response.error === null) {
                    this.router.navigate(['']);
                } else {
                    console.log(response);
                }
            });
    }

  openCardDialog() {
    const dialogRef = this.dialog.open(CreateCardComponent,
      {
        width: '75%',
        height: '70%'
      });
    dialogRef.componentInstance.boardId = 1
    dialogRef.componentInstance.columnId = 1
    dialogRef.componentInstance.cardId = 0
    dialogRef.componentInstance.isEdit = false
  }
}
