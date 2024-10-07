import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-username-dialog',
  templateUrl: './username-dialog.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
})
export class UsernameDialogComponent {
  username: string = '';

  constructor(private dialogRef: MatDialogRef<UsernameDialogComponent>) { }

  submit() {
    if (this.username.trim()) {
      this.dialogRef.close(this.username.trim());
    }
  }
}
