import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '@venturplex/core-data';

@Component({
  selector: 'venturplex-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  @Input() users: User[];
  @Input() isLoading: boolean;
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();

  selectUser(user: User) {
    this.selected.emit(user);
  }

  deleteUser(user: User) {
    this.deleted.emit(user);
  }
}
