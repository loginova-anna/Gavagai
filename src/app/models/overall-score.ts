export class OverallScore {
    love: number;
    hate: number;
    positivity: number;
    negativity: number;
    fear: number;
    desire: number;
    skepticism: number;
    violence: number;
    constructor(
        input: {
            love: number,
            hate: number,
            positivity: number,
            negativity: number,
            fear: number,
            desire: number,
            skepticism: number,
            violence: number,
        }
    ) {
        this.desire = input.desire;
        this.fear = input.fear;
        this.hate = input.hate;
        this.love = input.love;
        this.negativity = input.negativity;
        this.positivity = input.positivity;
        this.skepticism = input.skepticism;
        this.violence = input.violence;
    }
}