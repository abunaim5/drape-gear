interface UserType {
    name: string;
    email: string;
    avatar: string;
    accessToken: string;
    refreshToken: string;
};

type userInfoType = {
    name: string;
    email: string;
    password: string;
    role: string;
}

type userResponseType = {
    name: string;
    email: string;
    avatar: string;
    access_token: string;
    refresh_token: string;
}[];

export type { UserType, userInfoType, userResponseType };