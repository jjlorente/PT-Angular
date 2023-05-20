import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from '../services/employees.service';
import { MatSort, Sort } from '@angular/material/sort';
import { tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDeleteDialogComponent } from '../dialogs/confirmation-delete-dialog/confirmation-delete-dialog.component'
import { EditUserDialogComponent } from '../dialogs/edit-user-dialog/edit-user-dialog.component';
import { AddUserDialogComponent } from '../dialogs/add-user-dialog/add-user-dialog.component';

export interface User {
  id?: number;
  name: string;
  phone: string;
  mail: string;
  job: string;
}

@Component({
  selector: 'app-employees',
  styleUrls: ['./employees.component.css'],
  templateUrl: './employees.component.html',
})

export class EmployeesComponent {
  displayedColumns: string[] = ['id', 'name', 'phone', 'mail', 'actions'];
  dataSource = new MatTableDataSource<User>([]);
  userSelected: any; 

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public usersService: UsersService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.usersService.getUsers();
    this.usersService.$users.pipe(
      tap((data) => {
        this.dataSource.data = data;
      })
    ).subscribe(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.usersService.$user.subscribe(user => {
      this.userSelected = user;
    });
  }

  openConfirmationDialog(userId: number) {
    const dialogRef = this.dialog.open( ConfirmationDeleteDialogComponent, {
      width: '400px',
      data: { userId }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usersService.deleteUser(result.userId).subscribe(() => {
          this.usersService.getUsers();
        });
      }
    });
  }

  openEditUserDialog(userId: number) {
    this.dialog.open( EditUserDialogComponent, {
      width: '400px',
      data: { userId }
    });
  }

  openAddUserDialog() {
    this.dialog.open( AddUserDialogComponent, {
      width: '400px'
    });
  }

  searchValue: string = '';
  applyFilter() {
    this.dataSource.filter = this.searchValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: User, filter: string) => {
      const searchData = `${data.id}${data.name}${data.phone}${data.mail}`.toLowerCase();
      return searchData.includes(filter);
    };
  }

  selectUser(userId: number) {
    this.usersService.getUser(userId).subscribe();
  }
}