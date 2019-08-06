import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { User } from './user.model';

@Injectable()
export class UserService {
  usersChanged = new EventEmitter<User[]>();
  startedEditing = new Subject<number>();  
  private users: User[] = [];

  constructor(private http: HttpClient) { }

  setUsers(users: User[]) {
    this.users = users;
    this.usersChanged.next(this.users.slice());
  }

  getUsers() {
    return this.users.slice();
  }

  getUser(index: number) {
    return this.users[index];
  }  

  // Http Create
  addUser(user: User) {
    this.http.post('https://jsonplaceholder.typicode.com/users', user)
      .subscribe(res =>{
        console.log(res);
      })
      this.users.push(user) ;
      this.usersChanged.next(this.users.slice());    
  }
  
  // Http Update
  updateUser(index: number, newUser: User) {     
    this.users[index] = newUser;
    this.usersChanged.next(this.users.slice());
    this.http.put('https://jsonplaceholder.typicode.com/users/' +this.users[index].id ,newUser)
    .subscribe(res =>{
        console.log(res);
      });
  }

  // Http Delete
  deleteUser(index: number) {    
    this.http.delete('https://jsonplaceholder.typicode.com/users/'+this.users[index].id)
      .subscribe(res =>{
          console.log(res);
        });
        this.users.splice(index, 1);
        this.usersChanged.next(this.users.slice());
  }

}
