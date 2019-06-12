import React from "react";
import { IStore } from "./Contracts";

const initialState: IStore = {
    color: { red: 49, green: 55, blue: 200 }
};

export const Store = React.createContext(initialState);

// function reducer() {}

interface IStoreProviderProps {}
export const StoreProvider: React.SFC<IStoreProviderProps> = props => {
    return <Store.Provider value={initialState}>{props.children}</Store.Provider>;
};
