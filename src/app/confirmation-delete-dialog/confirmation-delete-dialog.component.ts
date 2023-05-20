import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-delete-dialog',
  styleUrls: ['./confirmation-delete-dialog.component.css'],
  template: `
    <h2 mat-dialog-title>Confirmación</h2>
    <div mat-dialog-content>
      ¿Estás seguro de que deseas eliminar este usuario?
    </div>
    <div mat-dialog-actions class="actions-div">
      <button mat-button mat-dialog-close color="primary" class="cancel-btn">Cancelar</button>
      <button mat-button [mat-dialog-close]="data" color="warn" class="delete-btn">Eliminar</button>
    </div>
  `,
})
export class ConfirmationDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
}
