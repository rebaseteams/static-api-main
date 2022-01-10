export type Login = {
username: string;
password: string;
}

export type SignUp = {
    email : string,
    password : string,
    userName : string,
    role? : string,
}

export type SignUpDB = {
    usersDetail: Array<SignUp>;
}
