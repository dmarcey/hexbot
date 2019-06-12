import React from "react";
import { IColor, IState, IStoreContext } from "./Contracts";

const initialState: IState = {
    color: undefined
};

export const Store = React.createContext<IStoreContext>({ state: initialState, dispatch: () => {} });

function reducer(state: IState, action: { type: string; payload: string }): IState {
    switch (action.type) {
        case "COLOR_RECEIVED":
            const colorString = action.payload;
            return { ...state, color: hexToRgb(colorString) };
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

function hexToRgb(hex: string): IColor {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)!;
    return {
        red: parseInt(result[1], 16),
        green: parseInt(result[2], 16),
        blue: parseInt(result[3], 16)
    };
}
