interface UserType {
    id: string;
    name: string;
    email: string;
    accessToken: string;
    refreshToken: string;
    subId: string;
    role: string;
    createdAt: string
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
    access_token: string;
    refresh_token: string;
    role: string;
    sub_id: string;
    createdAt: string
};

export type { UserType, UserInfoType, UserResponseType };