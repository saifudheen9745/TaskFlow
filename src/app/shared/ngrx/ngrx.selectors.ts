import { createSelector, createFeatureSelector } from '@ngrx/store';
import { userAuthResponse } from 'src/app/config/config.types';

export const selectUserDetailsState =
  createFeatureSelector<userAuthResponse>('userDetails');

export const selectUserDetails = createSelector(
  selectUserDetailsState,
  (state) => state
);
