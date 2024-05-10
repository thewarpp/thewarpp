import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

import type { account_type } from "./enums";

export type account = {
    id: Generated<string>;
    created_at: Generated<Timestamp>;
    updated_at: Timestamp;
    type: account_type;
    user_id: string;
    workspace_id: string;
};
export type oauth_state = {
    id: Generated<string>;
    created_at: Generated<Timestamp>;
    state: string;
    workspace_id: string;
};
export type user = {
    id: Generated<string>;
    first_name: string;
    last_name: string | null;
    email: string;
    created_at: Generated<Timestamp>;
    updated_at: Timestamp;
};
export type workspace = {
    id: Generated<string>;
    name: string;
    created_at: Generated<Timestamp>;
    updated_at: Timestamp;
};
export type youtube = {
    created_at: Generated<Timestamp>;
    updated_at: Timestamp;
    id: Generated<string>;
    refresh_token: string;
    access_token: string;
    workspace_id: string;
};
export type DB = {
    account: account;
    oauth_state: oauth_state;
    user: user;
    workspace: workspace;
    youtube: youtube;
};
