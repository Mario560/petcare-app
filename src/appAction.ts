import {ActionType} from 'typesafe-actions';

import {foodActions} from "./actions/foodActions";

export type AppAction =
  | ActionType<typeof foodActions>
  // | ActionType<typeof waterActions>
  // | ActionType<typeof temperatureActions>;
