import jwt from 'jsonwebtoken';

const tokenValidator = async (token : string) => {
  if (token && jwt.decode(token)) {
    const payload : any = await jwt.decode(token);
    const { exp } = payload;
    const now = new Date();
    return now.getTime() > exp * 1000;
  }
  return false;
};

export default tokenValidator;
