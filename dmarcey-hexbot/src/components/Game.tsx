import * as React from "react";
import { IGame, ITeam } from "../Contracts";
import ColorSwatch from "./ColorSwatch";

export interface IGameProps {
    game: IGame;
    simulateGame: () => void;
}

const Game = (props: IGameProps) => {
    if (props.game.result) {
        return (
            <div className="flex-column">
                <GameTeamRow team={props.game.awayTeam} goals={props.game.result.awayGoals} />
                <GameTeamRow team={props.game.homeTeam} goals={props.game.result.homeGoals} />
                {props.game.result.colors.map((c, index) => {
                    if (c.colorMatched) {
                        return (
                            <div className="flex-row" key={index}>
                                <ColorSwatch color={c.color} />
                                <ColorSwatch color={c.colorMatched} />
                            </div>
                        );
                    }
                    return <></>;
                })}
            </div>
        );
    } else {
        return <button onClick={props.simulateGame}>Simulate</button>;
    }
};

export default Game;

export interface IGameTeamRowProps {
    team: ITeam;
    goals: number;
}

const GameTeamRow = (props: IGameTeamRowProps) => {
    return (
        <div className="flex-row">
            <ColorSwatch color={props.team.color} />
            {props.team.name + " " + props.goals}
        </div>
    );
};
