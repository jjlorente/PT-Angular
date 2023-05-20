import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DeliveryService } from '../services/employees.service';
import { MatSort, Sort } from '@angular/material/sort';
import { tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDeleteDialogComponent } from '../confirmation-delete-dialog/confirmation-delete-dialog.component'

export interface Delivery {
  id: number;
  name: string;
  available: boolean;
}

@Component({
  selector: 'app-employees',
  styleUrls: ['./employees.component.css'],
  templateUrl: './employees.component.html',
})

export class EmployeesComponent {
  displayedColumns: string[] = ['id', 'name', 'available', 'actions'];
  dataSource = new MatTableDataSource<Delivery>([]);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private deliveryService: DeliveryService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.deliveryService.getDeliveries();
    this.deliveryService.$deliveries.pipe(
      tap((data) => {
        this.dataSource.data = data;
      })
    ).subscribe(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  openConfirmationDialog(deliveryId: number) {
    const dialogRef = this.dialog.open( ConfirmationDeleteDialogComponent, {
      width: '400px',
      data: { deliveryId }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deliveryService.deleteDelivery(result.deliveryId).subscribe(() => {
          this.deliveryService.getDeliveries();
        });
      }
    });
  }
}