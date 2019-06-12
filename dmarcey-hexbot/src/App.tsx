import React from "react";
import ColorSwatch from "./components/ColorSwatch";

const App: React.FC = () => {
    const color = { red: 49, green: 55, blue: 200 };
    return <ColorSwatch color={color} />;
};

export default App;
