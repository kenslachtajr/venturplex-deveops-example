import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { DataPersistence } from '@nrwl/angular';

import { User, UsersService } from '@venturplex/core-data';
import {
  UsersActionTypes,
  UsersLoaded,
  CreateUser,
  UpdateUser,
  DeleteUser,
  LoadUsers,
  UserUpdated,
  UserCreated,
  UserDeleted
} from './users.actions';
import { UsersState } from './users.reducer';

@Injectable({ providedIn: 'root' })
export class UsersEffects {
  @Effect()
  loadUsers$ = this.dataPersistence.fetch(UsersActionTypes.LoadUsers, {
    run: (action: LoadUsers, state: UsersState) => {
      return this.usersService
        .get()
        .pipe(map((res: User[]) => new UsersLoaded(res)));
    }
  });

  @Effect()
  createUser$ = this.dataPersistence.pessimisticUpdate(
    UsersActionTypes.CreateUser,
    {
      run: (action: CreateUser, state: UsersState) => {
        return this.usersService
          .create(action.payload)
          .pipe(map((res: User) => new UserCreated(res)));
      },

      // onError: (action: CreateUser, error) => {
      //   console.error('error', error);
      // }
    }
  );

  @Effect()
  updateUser$ = this.dataPersistence.pessimisticUpdate(
    UsersActionTypes.UpdateUser,
    {
      run: (action: UpdateUser, state: UsersState) => {
        return this.usersService
          .update(action.payload)
          .pipe(map((res: User) => new UserUpdated(res)));
      },

      // onError: (action: UpdateUser, error) => {
      //   console.error('error', error);
      // }
    }
  );

  @Effect()
  deleteUser$ = this.dataPersistence.pessimisticUpdate(
    UsersActionTypes.DeleteUser,
    {
      run: (action: DeleteUser, state: UsersState) => {
        return this.usersService
          .delete(action.payload.id)
          .pipe(map(_ => new UserDeleted(action.payload)));
      },

      // onError: (action: DeleteUser, error) => {
      //   console.error('error', error);
      // }
    }
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<UsersState>,
    private usersService: UsersService
  ) {}
}
