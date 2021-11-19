export type Login = {
username: string;
password: string;
}

export type SignUp = {
    username: string;
    password: string;
}

export type SignUpDB = {
    usersDetail: Array<SignUp>;
}
