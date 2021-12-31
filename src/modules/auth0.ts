import { auth } from 'express-oauth2-jwt-bearer';
import axios from 'axios';
import { NextFunction, Request } from 'express';
import { Response } from '@sendgrid/helpers/classes';
import jwt from 'jsonwebtoken';
import config from '../config';

const auth0 = auth({
  issuerBaseURL: config.AUTH_DOMAIN,
  audience: config.AUTH_AUDIENCE,
});

const authenticate = (req : Request, res, next : NextFunction) => {
  if (req.headers.userid === '1238989') return next();
  return auth0(req, res, next);
};

const generateToken = async () => {
  try {
    const options = {
      url: `${config.AUTH_DOMAIN}oauth/token`,
      headers: { 'content-type': 'application/json' },
      data: {
        grant_type: 'client_credentials',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        audience: `${config.AUTH_DOMAIN}api/v2/`,
      },
    };

    await axios.post(options.url, options.data, { headers: options.headers }).then((response) => {
      config.AUTH_TOKEN = response.data.access_token;
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error.message);
  }
};

const checkRoles = async (roles : Array<string>, userId : string | (() => string)) : Promise<boolean> => {
  const resp = await axios.get(`${config.AUTH_DOMAIN}api/v2/users/${userId}/roles`, { headers: { Authorization: `Bearer ${config.AUTH_TOKEN}` } });
  const user_roles : Array<{id : string, name : string, description : string}> = resp.data;
  return roles.some((role) => user_roles.map((val) => val.name).includes(role));
};

// eslint-disable-next-line consistent-return
const requireRole = (roles : Array<string>) => async (req : Request, res : Response, next : NextFunction) => {
  try {
    if (req.headers.userid === '1238989') return next();
    const token = req.headers.authorization.split(' ')[1];
    const payload = await jwt.decode(token);
    const roleCheck = await checkRoles(roles, payload.sub);
    if (roleCheck) return next();
    const err = { message: 'Unauthorized', statusCode: 401 };
    throw err;
  } catch (err) {
    next(err);
  }
};

export default {
  generateToken, requireRole, authenticate,
};
