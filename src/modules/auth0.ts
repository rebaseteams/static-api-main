import { auth } from 'express-oauth2-jwt-bearer';
import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { SignUp } from '../models/types/auth';

// eslint-disable-next-line no-unused-vars
let tokenGenerated;

const auth0 = auth({
  issuerBaseURL: config.AUTH_DOMAIN,
  audience: config.AUTH_AUDIENCE,
});

const setAuth = async (req : Request, res: Response, next : NextFunction) => {
  try {
    if (req.headers.userid === process.env.DEFAULT_USERID) {
      req.body.auth = { userId: req.headers.userid };
      return next();
    }
    const token = req.headers.authorization.split(' ')[1];
    if (token) {
      const payload = await jwt.decode(token);
      if (payload) {
        req.body.auth = { userId: payload.sub };
      }
      return next();
    }
    const err = { message: 'Authentication Failed', statusCode: 401 };
    throw err;
  } catch (err) {
    return next(err);
  }
};

const authenticate = async (req : Request, res : Response, next : NextFunction) => {
  if (req.headers.userid === process.env.DEFAULT_USERID) return next();
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
    tokenGenerated = true;
  } catch (error) {
    tokenGenerated = false;
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
    if (req.headers.userid === process.env.DEFAULT_USERID) return next();
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

const signupUser = async (data : SignUp) => new Promise((resolve, reject) => {
  axios.post(`${config.AUTH_DOMAIN}dbconnections/signup`, {
    client_id: config.AUTH_CLIENT_ID,
    email: data.email,
    password: data.password,
    connection: config.AUTH_CONNECTION,
    username: data.userName,
    name: data.userName,
    nickname: data.userName,
  }).then((value) => {
    resolve(value.data);
  }).catch((err) => {
    const error = { statusCode: err.response.data.statusCode, message: err.response.data.message || err.response.data.description };
    reject(error);
  });
});

export default {
  generateToken, requireRole, authenticate, setAuth, signupUser,
};
