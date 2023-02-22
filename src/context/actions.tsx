import type { ActionTypes } from './store';
import {
  CHOOSINGTYPESORT,
  TOGGLECHOOSINGSORT,
  TOGGLEMODAL,
  CHANGEFORMDATA,
  RESETFORMDATA,
  EDITTODOITEMID,
  RESETEDITTODO,
  TRIGGEREDUPDATETODO,
  OPENMODALDELETE,
  DELETETODOITEM,
  DELETEACTIVITYITEM,
} from './reducers';

type DispatchTypes = (dispatch: ActionTypes) => void;

interface FormDataTypes {
  title: string;
  priority: string;
}

interface FormDataTypesEdit {
  _id: number;
  priorityValue: string;
}

interface DeleteItem {
  _id: number;
  title: string;
}

export const choosingTypeSortedFunc = (
  dispatch: DispatchTypes,
  value: string
): void => {
  dispatch({ type: CHOOSINGTYPESORT, payload: value });
};

export const toggleSorted = (dispatch: DispatchTypes): void =>
  dispatch({ type: TOGGLECHOOSINGSORT });

export const toggleModal = (dispatch: DispatchTypes): void =>
  dispatch({ type: TOGGLEMODAL });

export const changeFormData = (
  dispatch: DispatchTypes,
  { title, priority }: FormDataTypes
): void => dispatch({ type: CHANGEFORMDATA, payload: { title, priority } });

export const resetFormData = (dispatch: DispatchTypes): void =>
  dispatch({ type: RESETFORMDATA });

export const editTodoItemId = (
  dispatch: DispatchTypes,
  { _id, priorityValue }: FormDataTypesEdit
): void => dispatch({ type: EDITTODOITEMID, payload: { _id, priorityValue } });

export const resetEdiTodo = (dispatch: DispatchTypes): void =>
  dispatch({ type: RESETEDITTODO });

export const triggeredUpdateTodo = (dispatch: DispatchTypes): void =>
  dispatch({ type: TRIGGEREDUPDATETODO });

export const openModalAlertDelete = (dispatch: DispatchTypes): void =>
  dispatch({ type: OPENMODALDELETE });

export const deleteTodoItem = (
  dispatch: DispatchTypes,
  { _id, title }: DeleteItem
): void => dispatch({ type: DELETETODOITEM, payload: { _id, title } });

export const deleteActivityItem = (
  dispatch: DispatchTypes,
  { _id, title }: DeleteItem
): void => dispatch({ type: DELETEACTIVITYITEM, payload: { _id, title } });
