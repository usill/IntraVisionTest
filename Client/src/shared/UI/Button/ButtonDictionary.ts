export interface ButtonStyleItem {
    textColor: string
    bgColor: string
}

export enum ButtonStyle {
    Green = "Green",
    Yellow = "Yellow",
    Gray = "Gray",
}

export const buttonDictionary: Record<ButtonStyle, ButtonStyleItem> = {
    [ButtonStyle.Green]: {
        bgColor: "#6aa84f",
        textColor: "#fff",
    },
    [ButtonStyle.Yellow]: {
        bgColor: "#f1c233",
        textColor: "#000"
    },
    [ButtonStyle.Gray]: {
        bgColor: "#dddfdd",
        textColor: "#000"
    }
}