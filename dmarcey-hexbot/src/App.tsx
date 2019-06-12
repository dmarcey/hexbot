import React from "react";
import ColorSwatch from "./components/ColorSwatch";
import { Store } from "./Store";

const App: React.FC = () => {
    const { state, dispatch } = React.useContext(Store);

    const fetchDataAction = async () => {
        const data = await fetch("https://api.noopschallenge.com/hexbot");
        const dataJSON = await data.json();
        return dispatch({
            type: "COLOR_RECEIVED",
            payload: dataJSON.colors[0].value
        });
    };

    React.useEffect(() => {
        state.color === undefined && fetchDataAction();
    });

    return state.color ? <ColorSwatch color={state.color} /> : <>"Waiting on color..." </>;
};

export default App;
