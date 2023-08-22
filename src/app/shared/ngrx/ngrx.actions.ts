import { createAction, props } from '@ngrx/store';
import { userAuthResponse } from 'src/app/config/config.types';

export const addUserDetails = createAction(
  '[userDetails] AddUserDetails',
  props<{ newData: userAuthResponse }>()
);

export const removeUserDetails = createAction(
  '[userDetails] RemoveUserDetails'
);
