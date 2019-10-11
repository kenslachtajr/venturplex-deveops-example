import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import * as fromUsers from './users/users.reducer';

import { User } from '@venturplex/core-data';

export interface AppState {
  users: fromUsers.UsersState;
}

export const reducers: ActionReducerMap<AppState> = {
  users: fromUsers.usersReducer,
};

// users selectors

export const selectUsersState = createFeatureSelector<fromUsers.UsersState>(
  'users'
);

export const selectUserIds = createSelector(
  selectUsersState,
  fromUsers.selectedUserIds
);

export const selectUserEntities = createSelector(
  selectUsersState,
  fromUsers.selectUserEntities
);

export const selectAllUsers = createSelector(
  selectUsersState,
  fromUsers.selectAllUsers
);

export const selectCurrentUserId = createSelector(
  selectUsersState,
  fromUsers.getSelectedUserId
);

export const emptyUser: User = {
  id: null,
  firstname: '',
  lastname: '',
};

export const selectCurrentUser = createSelector(
  selectUserEntities,
  selectCurrentUserId,
  (userEntities, userId) => {
    return userId ? userEntities[userId] : emptyUser;
  }
);

export const selectUserLoadingState = createSelector(
  selectUsersState,
  state => state.loading
);
