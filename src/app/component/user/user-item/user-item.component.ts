import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { trigger, transition, style, animate } from '@angular/animations';

import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate(500, style({ opacity: 1, transform: 'translateY(0px)'}))
      ])
    ])
  ]
})
export class UserItemComponent implements OnInit, OnDestroy {
  @ViewChild('f') userForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedUserIndex: number;
  editedUser: User;
  idFoUser: number;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.subscription = this.userService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedUserIndex = index;
          this.editMode = true;
          this.editedUser = this.userService.getUser(index);
          this.userForm.setValue({
            id: this.editedUser.id,
            name: this.editedUser.name,
            email: this.editedUser.email,
            phone: this.editedUser.phone
          })
        }
      );
  }


  onAddUser(form: NgForm) {
    const value = form.value;
    const newUser = new User(value.id, value.name, value.email, value.phone);
    if (this.editMode) {
      this.userService.updateUser(this.editedUserIndex, newUser);
    } else {
      this.userService.addUser(newUser);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.userForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.userService.deleteUser(this.editedUserIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
