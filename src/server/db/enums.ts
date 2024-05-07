export const account_type = {
    CREATOR: "CREATOR",
    EDITOR: "EDITOR"
} as const;
export type account_type = (typeof account_type)[keyof typeof account_type];
