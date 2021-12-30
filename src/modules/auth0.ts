import { auth } from 'express-oauth2-jwt-bearer';
import axios from 'axios';
import { NextFunction, Request } from 'express';
import { Response } from '@sendgrid/helpers/classes';
import jwt from 'jsonwebtoken';
import config from '../config';

const authenticate = auth({
  issuerBaseURL: config.AUTH_DOMAIN,
  audience: config.AUTH_AUDIENCE,
});

const generateToken = () => {
  const options = {
    url: `${config.AUTH_DOMAIN}oauth/token`,
    headers: { 'content-type': 'application/json' },
    data: {
      grant_type: 'client_credentials',
      client_id: config.CLIENT_ID,
      client_secret: config.CLIENT_SECRET,
      audience: `${config.AUTH_DOMAIN}api/v2/`,
    },
  };

  axios.post(options.url, options.data, { headers: options.headers }).then((response) => {
    config.AUTH_TOKEN = response.data.access_token;
  }).catch((error) => {
    console.error(error);
  });
};

const checkRoles = async (roles : Array<string>, userId : string | (() => string)) : Promise<boolean> => {
  const resp = await axios.get(`${config.AUTH_DOMAIN}api/v2/users/${userId}/roles`, { headers: { Authorization: `Bearer ${config.AUTH_TOKEN}` } });
  const user_roles : Array<{id : string, name : string, description : string}> = resp.data;
  return roles.some((role) => user_roles.map((val) => val.name).includes(role));
};

const requireRole = (roles : Array<string>) => async (req : Request, res : Response, next : NextFunction) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const payload = await jwt.decode(token);
    const roleCheck = await checkRoles(roles, payload.sub);
    if (roleCheck) next();
    else {
      const err = { message : 'Unauthorized', statusCode : 401 }
      throw err;
    }
  } catch(err) {
    next(err);
  }
};

export default { authenticate, generateToken, requireRole };
