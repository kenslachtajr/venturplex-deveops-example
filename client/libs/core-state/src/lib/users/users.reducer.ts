import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { User } from '@venturplex/core-data';

import { UsersActions, UsersActionTypes } from './users.actions';

export interface UsersState extends EntityState<User> {
  selectedUserId: number | null;
  loading: boolean;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();
export const initialState: UsersState = adapter.getInitialState({
  selectedUserId: null,
  loading: false
});

export function usersReducer(
  state = initialState,
  action: UsersActions
): UsersState {
  switch (action.type) {
    case UsersActionTypes.UserSelected: {
      return Object.assign({}, state, { selectedUserId: action.payload });
    }

    case UsersActionTypes.LoadUsers: {
      return {
        ...state,
        loading: true
      };
    }

    case UsersActionTypes.UsersLoaded: {
      return adapter.addAll(action.payload, { ...state, loading: false });
    }

    case UsersActionTypes.CreateUser: {
      return {
        ...state,
        loading: true
      };
    }

    case UsersActionTypes.UpdateUser: {
      return {
        ...state,
        loading: true
      };
    }

    case UsersActionTypes.UserUpdated: {
      return adapter.upsertOne(action.payload, { ...state, loading: false });
    }

    case UsersActionTypes.DeleteUser: {
      return {
        ...state,
        loading: true
      };
    }

    case UsersActionTypes.UserDeleted: {
      return adapter.removeOne(action.payload.id, { ...state, loading: false });
    }

    default:
      return state;
  }
}

export const getSelectedUserId = (state: UsersState) => state.selectedUserId;

export const {
  selectIds: selectedUserIds,
  selectEntities: selectUserEntities,
  selectAll: selectAllUsers,
  selectTotal: selectUserTotal
} = adapter.getSelectors();
