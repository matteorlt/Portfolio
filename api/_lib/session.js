import { ironSession } from 'iron-session/edge';

const sessionOptions = {
  cookieName: 'portfolio_admin_session',
  password: process.env.SESSION_PASSWORD,
  cookieOptions: {
    secure: true,
    httpOnly: true,
    sameSite: 'lax'
  }
};

export function getSession(req) {
  return ironSession(req, sessionOptions);
}


