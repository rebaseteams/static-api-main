import { auth } from 'express-oauth2-jwt-bearer';
import config from '../config';

const authenticate = auth({
  issuerBaseURL: config.AUTH_DOMAIN,
  audience: config.AUTH_AUDIENCE,
});

export default authenticate;
