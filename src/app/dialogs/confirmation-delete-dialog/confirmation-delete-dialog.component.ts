import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-delete-dialog',
  styleUrls: ['./confirmation-delete-dialog.component.css'],
  templateUrl: './confirmation-delete-dialog.component.html',
})
export class ConfirmationDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
}
