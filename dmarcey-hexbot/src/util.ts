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

export function colorDistance(color1: IColor, color2: IColor) {
    return Math.sqrt(Math.pow(color1.red - color2.red, 2) + Math.pow(color1.green - color2.green, 2) + Math.pow(color1.blue - color2.blue, 2));
}

export function closestColor(targetColor: IColor, color1: IColor, color2: IColor): { color: IColor; distance: number } {
    const color1Distance = colorDistance(targetColor, color1);
    const color2Distance = colorDistance(targetColor, color2);

    if (color1Distance < color2Distance) {
        return { color: color1, distance: color1Distance };
    }

    return { color: color2, distance: color2Distance };
}

export function evaluateColors(targetColor: IColor, color1: IColor, color2: IColor, range: number): IColor | undefined {
    const closest = closestColor(targetColor, color1, color2);
    return closest.distance <= range ? closest.color : undefined;
}
