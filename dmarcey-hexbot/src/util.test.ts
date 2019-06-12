import { getColorString, hexToColor } from "./util";

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
});
