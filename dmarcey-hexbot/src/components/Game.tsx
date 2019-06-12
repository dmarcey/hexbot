import * as React from "react";
import { IGame, ITeam } from "../Contracts";
import ColorSwatch from "./ColorSwatch";

export interface IGameProps {
    game: IGame;
    simulateGame: () => void;
}

const Game = (props: IGameProps) => {
    const awayGoals = props.game.result ? props.game.result.awayGoals : undefined;
    const homeGoals = props.game.result ? props.game.result.homeGoals : undefined;
    return (
        <div className="flex-column">
            <GameTeamRow team={props.game.awayTeam} goals={awayGoals} />
            <GameTeamRow team={props.game.homeTeam} goals={homeGoals} />
            {props.game.result ? (
                props.game.result.colors.map((c, index) => {
                    if (c.colorMatched) {
                        return (
                            <div className="flex-row" key={index}>
                                <ColorSwatch color={c.color} />
                                <ColorSwatch color={c.colorMatched} />
                            </div>
                        );
                    }
                    return <></>;
                })
            ) : (
                <div className="flex-row">
                    <button onClick={props.simulateGame}>Simulate</button>
                </div>
            )}
        </div>
    );
};

export default Game;

export interface IGameTeamRowProps {
    team: ITeam;
    goals?: number;
}

const GameTeamRow = (props: IGameTeamRowProps) => {
    return (
        <div className="flex-row">
            <ColorSwatch color={props.team.color} />
            {props.team.name + " " + (props.goals !== undefined ? props.goals : "")}
        </div>
    );
};
