import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserService } from '../component/user/user.service';
import { User } from '../component/user/user.model';

@Injectable()
export class ServerService {

  constructor(private httpClient: HttpClient, 
              private userService: UserService) { }

  fetchUsers() {
    return this.httpClient.get<User[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe(users => {
          this.userService.setUsers(users);
      });
  }

} 

  
