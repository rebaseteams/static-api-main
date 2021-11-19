/* eslint-disable no-unused-vars */

export interface AuthRepoInterface {
    login(username:string, password:string): {token: string};
    signUp(username: string, password: string): {status: boolean};
    // validateUser(token: string): boolean;
  }
