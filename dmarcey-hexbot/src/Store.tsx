import React from "react";
import { IState, IStoreContext } from "./Contracts";
import { hexToColor } from "./util";

const initialState: IState = {
    color: undefined
};

export const Store = React.createContext<IStoreContext>({ state: initialState, dispatch: () => {} });

function reducer(state: IState, action: { type: string; payload: string }): IState {
    switch (action.type) {
        case "COLOR_RECEIVED":
            const colorString = action.payload;
            return { ...state, color: hexToColor(colorString) };
        default:
            return state;
    }
}

interface IStoreProviderProps {}
export const StoreProvider: React.SFC<IStoreProviderProps> = props => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const value = { state, dispatch };
    return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
