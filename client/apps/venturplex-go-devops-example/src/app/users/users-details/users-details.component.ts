import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from '@venturplex/core-data';

@Component({
  selector: 'venturplex-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.scss']
})
export class UsersDetailsComponent {
  @Input() group: FormGroup;
  @Output() canceled = new EventEmitter();
  @Output() saved = new EventEmitter();

  saveUser(user: User) {
    this.saved.emit(user);
  }

  cancel() {
    this.canceled.emit();
  }
}
