import React, { createContext, useContext, useReducer } from 'react'
import {
  CHOOSINGTYPESORT,
  TOGGLECHOOSINGSORT,
  TOGGLEMODAL,
  CHANGEFORMDATA,
  RESETFORMDATA,
  EDITTODOITEMID,
  RESETEDITTODO,
  TRIGGEREDUPDATETODO,
  DELETETODOITEM,
  OPENMODALDELETE,
  DELETEACTIVITYITEM
} from './reducers'

export type ActionTypes =
 { type: typeof CHOOSINGTYPESORT, payload: string } |
 { type: typeof TOGGLECHOOSINGSORT } |
 { type: typeof TOGGLEMODAL } |
 { type: typeof CHANGEFORMDATA, payload: { title: string, priority: string } } |
 { type: typeof RESETFORMDATA } |
 { type: typeof EDITTODOITEMID, payload: { _id: number, priorityValue: string } } |
 { type: typeof RESETEDITTODO | typeof TRIGGEREDUPDATETODO | typeof OPENMODALDELETE } |
 { type: typeof DELETETODOITEM, payload: { _id: number, title: string } } |
 { type: typeof DELETEACTIVITYITEM, payload: { _id: number, title: string } }

interface InitilaStateProps {
  chooseTypeSorted: string
  toggleSorted: boolean
  toggleModal: boolean
  formData: { title: string, priority: string }
  editTodoItem: { _id: number | null, priorityValue: string }
  triggeredUpdateTodo: boolean
  openModalAlertDelete: boolean
  deleteTodoItem: { _id: number, title: string }
  deleteActivityItem: { _id: number, title: string }
}
const InitilaState: InitilaStateProps = {
  chooseTypeSorted: 'Terbaru',
  toggleSorted: false,
  toggleModal: false,
  formData: { title: '', priority: 'high' },
  editTodoItem: { _id: null, priorityValue: '' },
  triggeredUpdateTodo: false,
  openModalAlertDelete: false,
  deleteTodoItem: { _id: 0, title: '' },
  deleteActivityItem: { _id: 0, title: '' }

}

interface StoreProps {
  state: InitilaStateProps
  dispatch: React.Dispatch<ActionTypes>
}
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const Store = createContext<StoreProps>({} as StoreProps)

const reducers: React.Reducer<InitilaStateProps, ActionTypes> = (state, action) => {
  switch (action.type) {
    case CHOOSINGTYPESORT:
      return {
        ...state,
        chooseTypeSorted: action.payload
      }
    case TOGGLECHOOSINGSORT:
      return {
        ...state,
        toggleSorted: !state.toggleSorted
      }
    case TOGGLEMODAL:
      return {
        ...state,
        toggleModal: !state.toggleModal
      }
    case CHANGEFORMDATA:
      return {
        ...state,
        formData: {
          title: action.payload.title,
          priority: action.payload.priority
        }
      }
    case RESETFORMDATA:
      return {
        ...state,
        formData: {
          title: '',
          priority: 'very-high'
        }
      }
    case EDITTODOITEMID:
      return {
        ...state,
        editTodoItem: {
          _id: action.payload._id,
          priorityValue: action.payload.priorityValue
        }
      }
    case RESETEDITTODO:
      return {
        ...state,
        editTodoItem: {
          _id: null,
          priorityValue: 'very-high'
        }
      }
    case TRIGGEREDUPDATETODO:
      return {
        ...state,
        triggeredUpdateTodo: !state.triggeredUpdateTodo
      }
    case OPENMODALDELETE:
      return {
        ...state,
        openModalAlertDelete: !state.openModalAlertDelete
      }
    case DELETETODOITEM: {
      return {
        ...state,
        deleteTodoItem: {
          ...state.deleteTodoItem,
          _id: action.payload._id,
          title: action.payload.title
        }
      }
    }
    case DELETEACTIVITYITEM: {
      return {
        ...state,
        deleteActivityItem: {
          _id: action.payload._id,
          title: action.payload.title
        }
      }
    }
    default:
      return state
  }
}
export const ContextProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [state, dispatch] = useReducer(reducers, InitilaState)
  return (
    <Store.Provider value={{ state, dispatch }}>
        {children}
    </Store.Provider>
  )
}

export const useStoreContext = (): StoreProps => useContext(Store)

// : [InitilaStateProps, React.Dispatch<ActionTypes>] => {
//   const { state, dispatch } = useContext(Store)

//   return [state, dispatch]
// }
