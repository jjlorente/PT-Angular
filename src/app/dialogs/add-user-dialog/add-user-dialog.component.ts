import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../../services/employees.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'add-user-dialog',
  styleUrls: ['./add-user-dialog.component.css'],
  templateUrl: './add-user-dialog.component.html',
})
export class AddUserDialogComponent {
  nameControl = new FormControl('', Validators.required);
  jobControl = new FormControl('', Validators.required);
  phoneControl = new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]);
  mailControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    public dialogRef: MatDialogRef<AddUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usersService: UsersService
  ) { } 

  addNewUser() {
    const newUser = {
      name: this.nameControl.value,
      phone: this.phoneControl.value,
      mail: this.mailControl.value,
      job: this.jobControl.value
    };
  
    this.usersService.addUser(newUser).subscribe(
      response => {
        this.usersService.getUsers();
      },
      error => {
        console.error('Error al añadir usuario:', error);
      }
    );
  
    this.dialogRef.close();
  }
}
