import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../../services/employees.service';

@Component({
  selector: 'app-edit-user-dialog',
  styleUrls: ['./edit-user-dialog.component.css'],
  template: `
    <ng-container *ngIf="user">
      <h2 mat-dialog-title class="dialog-title">User edit</h2>
      <div class="form-container">
        <mat-form-field class="form-field">
          <input matInput placeholder="Name" [(ngModel)]="user.name">
        </mat-form-field>
        <mat-form-field class="form-field">
          <input matInput placeholder="Phone" [(ngModel)]="user.phone">
        </mat-form-field>
        <mat-form-field class="form-field">
          <input matInput placeholder="Email" [(ngModel)]="user.mail">
        </mat-form-field>
      </div>
      <div mat-dialog-actions class="actions-div">
        <button mat-flat-button mat-dialog-close color="default" class="cancel-btn">Cancel</button>
        <button mat-flat-button mat-dialog-close color="primary" class="edit-btn" (click)="saveChanges()">Save</button>
      </div>
    </ng-container>
  `,
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
