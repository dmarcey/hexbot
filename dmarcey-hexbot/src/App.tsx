import React from "react";
import Game from "./components/Game";
import { Store } from "./Store";

const App: React.FC = () => {
    const { state, dispatch } = React.useContext(Store);

    const fetchDataAction = async () => {
        const data = await fetch("https://api.noopschallenge.com/hexbot?count=1000");
        const dataJSON = await data.json();
        return dispatch({
            type: "COLOR_RECEIVED",
            payload: dataJSON.colors
        });
    };

    return <Game game={state.game} simulateGame={fetchDataAction} />;
};

export default App;
