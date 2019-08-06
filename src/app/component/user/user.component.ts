import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { trigger, transition, style, animate } from '@angular/animations';

import { User } from './user.model';
import { UserService } from './user.service';
import { ServerService } from 'src/app/shared/server.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  animations: [
    trigger('animation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-30px)' }),
        animate(500, style({ opacity: 1, transform: 'translateX(0px)'}))
      ]),

      transition(':leave', [
        animate(500, style({ opacity: 0, transform: 'translateX(30px)' }))
      ]),
    ])
  ]
})
export class UserComponent implements OnInit {
  users: User[];
  // id: number;
  private subscription: Subscription;


  constructor(private userService: UserService, 
              private serverService: ServerService,) { }

  ngOnInit() {
    this.serverService.fetchUsers();
    this.users = this.userService.getUsers();
    this.userService.usersChanged
      .subscribe(
        (users: User[]) => {
          this.users = users;
        }
      );
  }

  onEditUser(index: number) {
    this.userService.startedEditing.next(index);
  }
  
}
