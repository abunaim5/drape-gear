interface UserType {
    id: string;
    name: string;
    email: string;
    avatar: string;
    accessToken: string;
    refreshToken: string;
    subId: string;
    role?: string;
};

type UserInfoType = {
    name: string;
    email: string;
    password: string;
    role: string;
}

type UserResponseType = {
    _id: string;
    name: string;
    email: string;
    avatar: string;
    access_token: string;
    refresh_token: string;
    sub_id: string;
};

export type { UserType, UserInfoType, UserResponseType };