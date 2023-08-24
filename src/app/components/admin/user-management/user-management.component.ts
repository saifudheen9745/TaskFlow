import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, take } from 'rxjs';
import { userData } from 'src/app/config/config.types';
import { environment } from 'src/app/environment/environment';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  users: userData[];
  constructor(private http: HttpClient, private router: Router) {}
  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers = () => {
    this.http
      .get<userData[]>(`${environment.baseUrl}/user`)
      .pipe(
        take(1),
        catchError((err: any) => {
          throw err;
        })
      )
      .subscribe((data: userData[]) => {
        this.users = data;
      });
  };

  toggleUserStatus(event: any, userId: string) {
    const isChecked: boolean = event.target.checked;
    this.http
      .post<{ updated: boolean }>(`${environment.baseUrl}/user/updateStatus`, {
        userId: userId,
        value: isChecked,
      })
      .pipe(
        take(1),
        catchError((err: any) => {
          throw err;
        })
      )
      .subscribe((data) => {
        if (data.updated) {
          const userToUpdate = this.users.find((user) => user._id === userId);
          if (userToUpdate) {
            userToUpdate.isActive = isChecked;
          }
        }
      });
  }

  handleLogout() {
    localStorage.removeItem('isAdminLogged');
    this.router.navigate(['/admin']);
  }
}
