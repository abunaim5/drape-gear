interface UserType {
    id: string;
    name: string;
    email: string;
    // avatar: string;
    // accessToken: string;
    // refreshToken: string;
    role?: string;
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