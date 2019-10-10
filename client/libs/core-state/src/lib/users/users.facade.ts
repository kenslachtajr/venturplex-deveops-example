import { Injectable } from '@angular/core';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { UsersState } from './users.reducer';
import * as UsersAction from './users.actions';
import { selectAllUsers, selectUserLoadingState, selectCurrentUser } from '..';
import { User } from '@venturplex/core-data';
import { UsersActionTypes } from './users.actions';

@Injectable({
  providedIn: 'root'
})
export class UsersFacade {
  allUsers$ = this.store.pipe(select(selectAllUsers));
  currentUser$ = this.store.pipe(select(selectCurrentUser));
  usersLoading$ = this.store.pipe(select(selectUserLoadingState));

  mutations$ = this.actions$.pipe(
    filter(
      action =>
        action.type === UsersActionTypes.CreateUser ||
        action.type === UsersActionTypes.UpdateUser ||
        action.type === UsersActionTypes.DeleteUser
    )
  );

  constructor(
    private store: Store<UsersState>,
    private actions$: ActionsSubject
  ) {}

  selectUser(id) {
    this.store.dispatch(new UsersAction.UserSelected(id));
  }

  loadUsers() {
    this.store.dispatch(new UsersAction.LoadUsers());
  }

  addUser(user: User) {
    this.store.dispatch(new UsersAction.CreateUser(user));
  }

  updateUser(user: User) {
    this.store.dispatch(new UsersAction.UpdateUser(user));
  }

  deleteUser(user: User) {
    this.store.dispatch(new UsersAction.DeleteUser(user));
  }
}
