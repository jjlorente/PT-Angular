import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../../services/employees.service';

@Component({
  selector: 'app-edit-user-dialog',
  styleUrls: ['./edit-user-dialog.component.css'],
  templateUrl: './edit-user-dialog.component.html',
})
export class EditUserDialogComponent {
  userId: number;
  user: any;

  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usersService: UsersService,
  ) {
    this.userId = data.userId; 
    this.getUserDetails();
  } 

  getUserDetails() {
    this.usersService.getUser(this.userId).subscribe((user) => {
      this.user = user;
    });
  }

  saveChanges() {
    this.usersService.updateUser(this.user).subscribe((user) => {
      this.usersService.getUsers();
    });
  }
  
}
