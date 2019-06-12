export interface IColor {
    red: number;
    green: number;
    blue: number;
}

export interface IStoreContext {
    state: IState;
    dispatch: any;
}

export interface IState {
    color?: IColor;
}
