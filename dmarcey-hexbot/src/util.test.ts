import { getColorString, hexToColor, colorDistance, closestColor, evaluateColors, simulateGame } from "./util";
import { ITeam, IGame } from "./Contracts";

describe("Utilities", () => {
    describe("getColorString", () => {
        it("creates string from IColor of red: 0, green: 0, blue: 0", () => {
            const color = { red: 0, green: 0, blue: 0 };
            const expected = "rgb(0, 0, 0)";
            const actual = getColorString(color);
            expect(actual).toEqual(expected);
        });

        it("creates string from IColor of red: 255, green: 100, blue: 55", () => {
            const color = { red: 255, green: 100, blue: 55 };
            const expected = "rgb(255, 100, 55)";
            const actual = getColorString(color);
            expect(actual).toEqual(expected);
        });
    });

    describe("hexToColor", () => {
        it("creates IColor from #000000", () => {
            const color = "#000000";
            const expected = { red: 0, green: 0, blue: 0 };
            const actual = hexToColor(color);
            expect(actual).toEqual(expected);
        });

        it("creates IColor from #FFFFFF", () => {
            const color = "#FFFFFF";
            const expected = { red: 255, green: 255, blue: 255 };
            const actual = hexToColor(color);
            expect(actual).toEqual(expected);
        });
    });

    describe("colorDistance", () => {
        it("distance between same colors is 0", () => {
            const color1 = { red: 0, green: 0, blue: 0 };
            const color2 = { red: 0, green: 0, blue: 0 };
            const expected = 0.0;
            const actual = colorDistance(color1, color2);
            expect(actual).toBeCloseTo(expected);
        });

        it("distance between black and white is sqrt(255^2+255^2+255^2)", () => {
            const color1 = { red: 0, green: 0, blue: 0 };
            const color2 = { red: 255, green: 255, blue: 255 };
            const expected = 441.67296;
            const actual = colorDistance(color1, color2);
            expect(actual).toBeCloseTo(expected, 5);
        });

        it("distance between white and black is sqrt(255^2+255^2+255^2)", () => {
            const color1 = { red: 0, green: 0, blue: 0 };
            const color2 = { red: 255, green: 255, blue: 255 };
            const expected = 441.67296;
            const actual = colorDistance(color2, color1);
            expect(actual).toBeCloseTo(expected, 5);
        });
    });

    describe("closestColor", () => {
        it("red is closer to black than white", () => {
            const targetColor = { red: 255, green: 0, blue: 0 };
            const color1 = { red: 0, green: 0, blue: 0 };
            const color2 = { red: 255, green: 255, blue: 255 };
            const expected = { color: color1, distance: 255 };
            const actual = closestColor(targetColor, color1, color2);
            expect(actual.color).toBe(expected.color);
            expect(actual.distance).toBeCloseTo(expected.distance);
        });

        it("purple is closer to white than black", () => {
            const targetColor = { red: 255, green: 0, blue: 255 };
            const color1 = { red: 0, green: 0, blue: 0 };
            const color2 = { red: 255, green: 255, blue: 255 };
            const expected = { color: color2, distance: 255 };
            const actual = closestColor(targetColor, color1, color2);
            expect(actual.color).toBe(expected.color);
            expect(actual.distance).toBeCloseTo(expected.distance);
        });
    });

    describe("evaluateColors", () => {
        it("black vs white is not in range of red", () => {
            const targetColor = { red: 255, green: 0, blue: 0 };
            const color1 = { red: 0, green: 0, blue: 0 };
            const color2 = { red: 255, green: 255, blue: 255 };
            const expected = undefined;
            const actual = evaluateColors(targetColor, color1, color2, 254);
            expect(actual).toBe(expected);
        });

        it("black vs white - black is in range of dark red", () => {
            const targetColor = { red: 150, green: 0, blue: 0 };
            const color1 = { red: 0, green: 0, blue: 0 };
            const color2 = { red: 255, green: 255, blue: 255 };
            const expected = color1;
            const actual = evaluateColors(targetColor, color1, color2, 254);
            expect(actual).toBe(expected);
        });
    });

    describe("simulateGame", () => {
        it("color in range of black is goal for team with color black", () => {
            const colors = [{ red: 10, green: 0, blue: 0 }];
            const team1: ITeam = { name: "Black", color: { red: 0, green: 0, blue: 0 } };
            const team2: ITeam = { name: "White", color: { red: 255, green: 255, blue: 255 } };
            const game: IGame = { awayTeam: team1, homeTeam: team2, id: "0" };
            const colorMatches = [{ color: { red: 10, green: 0, blue: 0 }, colorMatched: team1.color }];
            const expected: IGame = { ...game, result: { colors: colorMatches, awayGoals: 1, homeGoals: 0 } };
            const actual = simulateGame(game, colors);
            expect(actual).toEqual(expected);
            expect(actual).not.toBe(game);
        });

        it("goal for each team", () => {
            const colors = [{ red: 10, green: 0, blue: 0 }, { red: 255, green: 255, blue: 245 }];
            const team1: ITeam = { name: "Black", color: { red: 0, green: 0, blue: 0 } };
            const team2: ITeam = { name: "White", color: { red: 255, green: 255, blue: 255 } };
            const colorMatches = [
                { color: { red: 10, green: 0, blue: 0 }, colorMatched: team1.color },
                { color: { red: 255, green: 255, blue: 245 }, colorMatched: team2.color }
            ];
            const game: IGame = { awayTeam: team1, homeTeam: team2, id: "0" };
            const expected: IGame = { ...game, result: { colors: colorMatches, awayGoals: 1, homeGoals: 1 } };
            const actual = simulateGame(game, colors);
            expect(actual).toEqual(expected);
            expect(actual).not.toBe(game);
        });

        it("no goals", () => {
            const colors = [{ red: 150, green: 150, blue: 150 }, { red: 150, green: 150, blue: 150 }];
            const colorMatches = [{ color: { red: 150, green: 150, blue: 150 } }, { color: { red: 150, green: 150, blue: 150 } }];
            const team1: ITeam = { name: "Black", color: { red: 0, green: 0, blue: 0 } };
            const team2: ITeam = { name: "White", color: { red: 255, green: 255, blue: 255 } };
            const game: IGame = { awayTeam: team1, homeTeam: team2, id: "0" };
            const expected: IGame = { ...game, result: { colors: colorMatches, awayGoals: 0, homeGoals: 0 } };
            const actual = simulateGame(game, colors);
            expect(actual).toEqual(expected);
            expect(actual).not.toBe(game);
        });
    });
});
