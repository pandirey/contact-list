import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../user/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: {id:number, name: string, email: string, phone: string};
  id: number;

  constructor(private route: ActivatedRoute,
              private userService: UserService) { }

 ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.user = this.userService.getUser(id);
    this.route.params
      .subscribe(
        (params: Params) => {
          this.user = this.userService.getUser(+params['id']);
        } 
      );
  }
}
