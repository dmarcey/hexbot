import React from "react";
import ColorSwatch from "./components/ColorSwatch";
import { Store } from "./Store";

const App: React.FC = () => {
    const store = React.useContext(Store);
    return <ColorSwatch color={store.color} />;
};

export default App;
