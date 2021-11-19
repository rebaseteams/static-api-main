/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable no-throw-literal */
import * as fs from 'fs';
import { AuthRepoInterface } from '../../../models/interfaces/auth';
import { SignUpDB } from '../../../models/types/auth';

export default class InMemoryAuthRepo implements AuthRepoInterface {
  // private artistList : Artist[] = dummyArtists;

  // username:string, password:string
  login(username: string, password: string): {token: string} {
    if (!fs.existsSync('./src/repositories/auth/in-memory/data/user/signupDetails.json')) {
      throw { message: 'No Users Please SignUp!' };
    }

    const fileData = fs.readFileSync('./src/repositories/auth/in-memory/data/user/signupDetails.json', 'utf-8');
    const fileDataObject: SignUpDB = JSON.parse(fileData);
    if (fileDataObject) {
      const validUser = fileDataObject.usersDetail.find((a) => (a.username === username && a.password === password));
      if (validUser) {
        return { token: 'qwertyuiop' };
      }
    }

    throw { message: 'Username or Password Incorrect', statusCode: 404 };
  }

  signUp(username: string, password: string): {status: boolean} {
    if (!fs.existsSync('./src/repositories/auth/in-memory/data/user') && !fs.existsSync('./src/repositories/auth/in-memory/data/user/signupDetails')) {
      fs.mkdirSync('./src/repositories/auth/in-memory/data/user');
      fs.writeFileSync(
        './src/repositories/auth/in-memory/data/user/signupDetails.json',
        JSON.stringify({ usersDetail: [{ username, password }] }),
      );
      return { status: true };
    }
    const fileData = fs.readFileSync('./src/repositories/auth/in-memory/data/user/signupDetails.json', 'utf-8');
    const fileDataObject: SignUpDB = JSON.parse(fileData);
    if (fileDataObject) {
      const duplicateUser = fileDataObject.usersDetail.find((a) => a.username === username);
      if (duplicateUser) {
        throw { message: `Duplicate Username: ${username}. Try with another username`, statusCode: 401 };
      }
    }
    fileDataObject.usersDetail.push({ username, password });
    const updatedUserList = fileDataObject.usersDetail;
    const updatedFileDataObject = {
      usersDetail: updatedUserList,
    };
    fs.writeFileSync('./src/repositories/auth/in-memory/data/user/signupDetails.json', JSON.stringify(updatedFileDataObject));

    return { status: true };
  }

  // token: string
  // validateUser(): boolean {
  //   return { error: 'Yet to implement' };
  // }
}
