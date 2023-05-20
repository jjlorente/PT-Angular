import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../../services/employees.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'add-user-dialog',
  styleUrls: ['./add-user-dialog.component.css'],
  template: `
  <ng-container>
    <h2 mat-dialog-title class="dialog-title">User edit</h2>
    <div class="form-container">
      <mat-form-field class="form-field">
        <input matInput placeholder="Name" [formControl]="nameControl">
      </mat-form-field>
      <mat-form-field class="form-field">
        <input matInput placeholder="Phone" [formControl]="phoneControl">
        <mat-error *ngIf="phoneControl.hasError('pattern')">Only numbers are allowed</mat-error>
      </mat-form-field>
      <mat-form-field class="form-field">
        <input matInput placeholder="Mail" [formControl]="mailControl">
        <mat-error *ngIf="mailControl.hasError('pattern')">Invalid mail format</mat-error>
      </mat-form-field>
      <mat-form-field class="form-field">
        <input matInput placeholder="Job" [formControl]="jobControl">
      </mat-form-field>
    </div>
    <div mat-dialog-actions class="actions-div">
      <button mat-flat-button mat-dialog-close color="default" class="cancel-btn">Cancel</button>
      <button mat-flat-button mat-dialog-close color="primary" class="edit-btn" (click)="addNewUser()"
        [disabled]="!nameControl.valid || !phoneControl.valid || !mailControl.valid || !jobControl.valid">Save</button>
    </div>
  </ng-container>
  `,
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
