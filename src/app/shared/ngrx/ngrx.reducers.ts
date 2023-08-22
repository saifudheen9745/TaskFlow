import { createReducer, on } from '@ngrx/store';
import { addUserDetails, removeUserDetails } from './ngrx.actions';
import { userDetails } from './ngrx.state';
import { userAuthResponse } from 'src/app/config/config.types';
import { localStorageSync } from 'ngrx-store-localstorage';



const _userDetailsReducer = createReducer(
  userDetails,
  on(addUserDetails, (state, { newData }) => {
    // Update the state properties with values from the action's payload
    return {
      userId: newData.userId || state.userId,
      accessToken: newData.accessToken || state.accessToken,
      email: newData.email || state.email,
      name: newData.name || state.name,
    };
  }),

  // Handle resetUserDetails if needed
  on(removeUserDetails, (state) => {
    // Reset the userDetails properties to empty strings
    return {
      userId: '',
      name: '',
      email: '',
      accessToken: '',
    };
  })
);

// Create a meta-reducer that persists the state in local storage
export function localStorageSyncReducer(
  reducer: any
): (state: any, action: any) => any {
  return localStorageSync({
    keys: ['userDetails'], // Specify the state slice key to persist
    rehydrate: true,
  })(reducer);
}

// Wrap your reducer with the local storage meta-reducer
export function userDetailsReducer(
  state: userAuthResponse | undefined,
  action: any
): userAuthResponse {
  return localStorageSyncReducer(_userDetailsReducer)(state, action);
}


