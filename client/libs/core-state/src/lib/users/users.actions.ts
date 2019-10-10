import { Action } from '@ngrx/store';
import { User } from '@venturplex/core-data';

export enum UsersActionTypes {
  UserSelected = '[USER] Selected User',
  LoadUsers = '[USER] Load Users',
  UsersLoaded = '[USER] Users Loaded',
  CreateUser = '[USER] Create User',
  UserCreated = '[USER] User Created',
  UpdateUser = '[USER] Update User',
  UserUpdated = '[USER] User Updated',
  DeleteUser = '[USER] Delete User',
  UserDeleted = '[USER] User Deleted'
}

export class UserSelected implements Action {
  readonly type = UsersActionTypes.UserSelected;
  constructor(public payload: number) {}
}

export class LoadUsers implements Action {
  readonly type = UsersActionTypes.LoadUsers;
  constructor() {}
}

export class UsersLoaded implements Action {
  readonly type = UsersActionTypes.UsersLoaded;
  constructor(public payload: User[]) {}
}

export class CreateUser implements Action {
  readonly type = UsersActionTypes.CreateUser;
  constructor(public payload: User) {}
}

export class UserCreated implements Action {
  readonly type = UsersActionTypes.UserCreated;
  constructor(public payload: User) {}
}

export class UpdateUser implements Action {
  readonly type = UsersActionTypes.UpdateUser;
  constructor(public payload: User) {}
}

export class UserUpdated implements Action {
  readonly type = UsersActionTypes.UserUpdated;
  constructor(public payload: User) {}
}

export class DeleteUser implements Action {
  readonly type = UsersActionTypes.DeleteUser;
  constructor(public payload: User) {}
}

export class UserDeleted implements Action {
  readonly type = UsersActionTypes.UserDeleted;
  constructor(public payload: User) {}
}

export type UsersActions =
  | UserSelected
  | LoadUsers
  | UsersLoaded
  | CreateUser
  | UserCreated
  | UpdateUser
  | UserUpdated
  | DeleteUser
  | UserDeleted;
