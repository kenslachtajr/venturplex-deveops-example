import { Component, OnInit } from '@angular/core';
import { UsersFacade } from '@venturplex/core-state';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '@venturplex/core-data';

@Component({
  selector: 'venturplex-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]> = this.usersFacade.allUsers$;
  user$: Observable<User> = this.usersFacade.currentUser$;
  loading$: Observable<boolean> = this.usersFacade.usersLoading$;
  form: FormGroup;

  constructor(
    private usersFacade: UsersFacade,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.usersFacade.loadUsers();
    this.usersFacade.mutations$.subscribe(_ => this.reset());
    this.initForm();
  }

  selectUser(user: User) {
    this.form.patchValue(user);
    this.usersFacade.selectUser(user.id);
  }

  saveUser(user: User) {
    if (this.form.valid) {
      user.id
        ? this.usersFacade.updateUser(user)
        : this.usersFacade.addUser(user);
    }
  }

  deleteUser(user: User) {
    this.usersFacade.deleteUser(user);
  }

  reset() {
    this.form.reset();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      id: [null],
      title: '',
      description: ''
    });
  }
}
