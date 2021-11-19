import { encode, TAlgorithm } from 'jwt-simple';

// TODO: USE jsonwebtoken npm package
function encodeSession(secretKey: string) {
  // Always use HS512 to sign the token
  const algorithm: TAlgorithm = 'HS512';
  // Determine when the token should expire
  const issued = Date.now();
  const fifteenMinutesInMs = 15 * 60 * 1000;
  const expires = issued + fifteenMinutesInMs;
  const session = {
    issued,
    expires,
  };

  return {
    token: encode(session, secretKey, algorithm),
  };
}

export default encodeSession;
