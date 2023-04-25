import { Component, OnInit} from '@angular/core';
import { User } from '@supabase/supabase-js';
import { supabase } from 'src/env/supabase';
import {MatDialog} from '@angular/material/dialog';
import { EditDialogComponent } from '../../components/edit-dialog/edit-dialog.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  constructor(public dialog: MatDialog) {}
  currentUser: User | undefined;

  async ngOnInit() {
    await supabase.auth.getUser()
    .then((response) => {
      if (response.data.user?.aud === 'authenticated')
        this.currentUser = response.data.user;
    });
  }

  openDialog(type: string): void {
    this.dialog.open(EditDialogComponent, {
      data: {type: type},
    });
  }

}
