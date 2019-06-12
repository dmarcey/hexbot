import * as React from "react";
import { IColor } from "../Contracts";

import "./ColorSwatch.css";

export interface IColorSwatchProps {
    color: IColor;
}

const ColorSwatch = (props: IColorSwatchProps) => {
    return <div className="color-swatch" style={{ backgroundColor: getColorString(props.color) }} />;
};

function getColorString(color: IColor): string {
    return `rgb(${color.red}, ${color.green}, ${color.blue})`;
}

export default ColorSwatch;
