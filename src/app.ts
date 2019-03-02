import bodyParser from 'body-parser';
import express from 'express';
import session from 'express-session';
import {Server} from 'http';
import passport from 'passport';
import * as path from 'path';
import SocketIO from 'socket.io';

import * as SessionConfig from './session';
import * as MongoConnection from './mongodb';
import {loggedIn} from './passport';

export const run = async () => {
  const app = express();
  const server = new Server(app);
  const io = SocketIO(server);

  app.set('port', process.env.PORT || 3000);

  await MongoConnection.connect();

  const sessionStore = SessionConfig.configure();
  app.use(session({
    secret: 'secret',
    cookie: {
      maxAge: 1000 * 60 * 60 * 2
    },
    store: sessionStore,
    resave: true,
    saveUninitialized: true
  }));

  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/', loggedIn, (_req, res) => {
    res.sendFile(path.resolve('public', 'index.html'));
  });
  app.route('/login')
    .get((_req, res) => {
      res.sendFile(path.resolve('public', 'login.html'));
    })
    .post(passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login'
    }));

  io.on('connection', socket => {
    socket.on('message', (msg) => {
      socket.broadcast.emit('message', { content: msg.content });
    });
  });

  server.listen(app.get('port'), () => {
    console.log(`App listening on port ${app.get('port')}`);
  });
};
