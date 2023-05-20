import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DeliveryService } from '../services/employees.service';
import { MatSort, Sort } from '@angular/material/sort';
import { tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDeleteDialogComponent } from '../confirmation-delete-dialog/confirmation-delete-dialog.component'
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';

export interface Delivery {
  id: number;
  name: string;
  phone: string;
  mail: string;
}

@Component({
  selector: 'app-employees',
  styleUrls: ['./employees.component.css'],
  templateUrl: './employees.component.html',
})

export class EmployeesComponent {
  displayedColumns: string[] = ['id', 'name', 'phone', 'mail', 'actions'];
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

  openConfirmationDialog(userId: number) {
    const dialogRef = this.dialog.open( ConfirmationDeleteDialogComponent, {
      width: '400px',
      data: { userId }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deliveryService.deleteDelivery(result.userId).subscribe(() => {
          this.deliveryService.getDeliveries();
        });
      }
    });
  }

  openEditUserDialog(userId: number) {
    const dialogRef = this.dialog.open( EditUserDialogComponent, {
      width: '400px',
      data: { userId }
    });
  }

  searchValue: string = '';

  applyFilter() {
    this.dataSource.filter = this.searchValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: Delivery, filter: string) => {
      const searchData = `${data.id}${data.name}${data.phone}${data.mail}`.toLowerCase();
      return searchData.includes(filter);
    };
  }

}