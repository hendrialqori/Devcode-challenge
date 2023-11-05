import React, { createContext, useContext, useReducer } from 'react';
import { CHOOSINGTYPESORT, TOGGLECHOOSINGSORT } from './reducers';
import type { Priority } from '@/types';

export type ActionTypes =
  | { type: typeof CHOOSINGTYPESORT; payload: string }
  | { type: typeof TOGGLECHOOSINGSORT };

interface InitilaStateProps {
  chooseTypeSorted: string;
  toggleSorted: boolean;
}
const InitilaState: InitilaStateProps = {
  chooseTypeSorted: 'Terbaru',
  toggleSorted: false,
};

interface StoreProps {
  state: InitilaStateProps;
  dispatch: React.Dispatch<ActionTypes>;
}

const Store = createContext<StoreProps>({} as StoreProps);

const reducers: React.Reducer<InitilaStateProps, ActionTypes> = (
  state,
  action
) => {
  switch (action.type) {
    case CHOOSINGTYPESORT:
      return {
        ...state,
        chooseTypeSorted: action.payload,
      };
    case TOGGLECHOOSINGSORT:
      return {
        ...state,
        toggleSorted: !state.toggleSorted,
      };

    default:
      return state;
  }
};
export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [state, dispatch] = useReducer(reducers, InitilaState);
  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
};

export const useStoreContext = (): StoreProps => useContext(Store);
