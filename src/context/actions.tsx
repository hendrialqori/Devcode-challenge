import type { ActionTypes } from './store';
import { CHOOSINGTYPESORT, TOGGLECHOOSINGSORT } from './reducers';

type DispatchTypes = (dispatch: ActionTypes) => void;

export const choosingTypeSortedFunc = (
  dispatch: DispatchTypes,
  value: string
): void => {
  dispatch({ type: CHOOSINGTYPESORT, payload: value });
};

export const toggleSorted = (dispatch: DispatchTypes): void =>
  dispatch({ type: TOGGLECHOOSINGSORT });
