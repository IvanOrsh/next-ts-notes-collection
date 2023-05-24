import { Dispatch, PropsWithChildren, useReducer } from "react";

import { createContext } from "./createContext";

import { AdjustColorActions, colorReducer, initialState } from "./colorReducer";

type ColorContextState = {
  hexColor: string;
  dispatch: Dispatch<AdjustColorActions>;
};

const [useColorContext, ContextProvider] = createContext<ColorContextState>();

export const useContext = useColorContext;

export const ColorProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(colorReducer, initialState);
  const hexColor = state.hexColor;

  return (
    <ContextProvider value={{ hexColor, dispatch }}>{children}</ContextProvider>
  );
};
