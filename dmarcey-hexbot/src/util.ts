import { IColor } from "./Contracts";

export function getColorString(color: IColor): string {
    return `rgb(${color.red}, ${color.green}, ${color.blue})`;
}

export function hexToColor(hex: string): IColor {
    return {
        red: parseInt(hex.substr(1, 2), 16),
        green: parseInt(hex.substr(3, 2), 16),
        blue: parseInt(hex.substr(5, 2), 16)
    };
}
