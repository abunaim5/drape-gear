interface UserType {
    name: string;
    email: string;
    avatar: string;
    accessToken: string;
    refreshToken: string;
};

type userResponseType = {
    name: string;
    email: string;
    avatar: string;
    access_token: string;
    refresh_token: string;
};

export type {UserType, userResponseType};