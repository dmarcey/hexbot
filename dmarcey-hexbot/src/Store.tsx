import React from "react";
import { IState, IStoreContext } from "./Contracts";
import { hexToColor, simulateGame } from "./util";

const initialState: IState = {
    game: {
        id: "0",
        awayTeam: { name: "USA", color: { red: 244, green: 2, blue: 8 } },
        homeTeam: { name: "Thailand", color: { red: 18, green: 37, blue: 80 } }
    }
};

export const Store = React.createContext<IStoreContext>({ state: initialState, dispatch: () => {} });

function reducer(state: IState, action: { type: string; payload: { value: string }[] }): IState {
    switch (action.type) {
        case "COLOR_RECEIVED":
            const colorStrings = action.payload;
            return { ...state, game: simulateGame(state.game, colorStrings.map(c => hexToColor(c.value))) };
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
