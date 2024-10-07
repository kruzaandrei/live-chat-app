import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsernameDialogComponent } from './components/username-dialog/username-dialog.component';
import { Store } from '@ngrx/store';
import { setUsername } from './store/user/user.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, MatDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(private dialog: MatDialog, private store: Store) { }

  ngOnInit() {
    const dialogRef = this.dialog.open(UsernameDialogComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((username: string) => {
      this.store.dispatch(setUsername({ username }));
    });
  }
}
