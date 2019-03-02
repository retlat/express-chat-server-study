import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import * as bcrypt from 'bcrypt';
import {Request, Response, NextFunction} from 'express';

import * as User from './user';

passport.use(new LocalStrategy(async (username, password, done) => {
  const {user, err} = await User.findOne(username);

  if (err) {
    return done(err);
  }
  if (user === null) {
    return done(null, false);
  }

  const match = await bcrypt.compare(password, user.password);

  return (match) ? done(null, user) : done(null, false);
}));

passport.serializeUser((user: User.User, done) => {
  done(null, user._id)
});

passport.deserializeUser(async (id: string, done) => {
  const {user, err} = await User.findById(id);

  done(err, user);
});

export const loggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
};
