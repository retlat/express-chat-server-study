import connect from 'connect-mongodb-session';
import session from 'express-session';

const uri = process.env.MONGO_URI;
if (uri === undefined) {
  throw new Error('MongoDB connection string not defined');
}

export const configure = () => {
  const MongoDBStore = connect(session);

  return new MongoDBStore({
    uri: uri,
    collection: 'sessions',
    connectionOptions: {
      useNewUrlParser: true
    }
  });
};
