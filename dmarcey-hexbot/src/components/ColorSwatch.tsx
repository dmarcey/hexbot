import * as React from "react";
import { IColor } from "../Contracts";
import { getColorString } from "../util";

import "./ColorSwatch.css";

export interface IColorSwatchProps {
    color: IColor;
}

const ColorSwatch = (props: IColorSwatchProps) => {
    return <div className="color-swatch" style={{ backgroundColor: getColorString(props.color) }} />;
};

export default ColorSwatch;
