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
    game: IGame;
}

export interface ITeam {
    color: IColor;
    name: string;
}

export interface IGame {
    id: string;
    awayTeam: ITeam;
    homeTeam: ITeam;
    result?: IGameResult;
}

export interface IColorMatch {
    color: IColor;
    colorMatched?: IColor;
}

export interface IGameResult {
    awayGoals: number;
    homeGoals: number;
    colors: IColorMatch[];
}
